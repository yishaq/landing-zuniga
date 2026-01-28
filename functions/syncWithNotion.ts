import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (user.role !== 'admin') {
      return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    const { database_id, direction = 'to_notion' } = await req.json();

    if (!database_id) {
      return Response.json({ error: 'database_id is required' }, { status: 400 });
    }

    const accessToken = await base44.asServiceRole.connectors.getAccessToken('notion');

    if (!accessToken) {
      return Response.json({ error: 'Notion not connected' }, { status: 400 });
    }

    if (direction === 'to_notion') {
      return await syncToNotion(base44, accessToken, database_id);
    } else if (direction === 'from_notion') {
      return await syncFromNotion(base44, accessToken, database_id);
    } else {
      return Response.json({ error: 'Invalid direction. Use "to_notion" or "from_notion"' }, { status: 400 });
    }

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});

async function syncToNotion(base44, accessToken, database_id) {
  const appointments = await base44.asServiceRole.entities.Appointment.list();
  
  // Get existing pages from Notion to check for duplicates
  const queryResponse = await fetch(`https://api.notion.com/v1/databases/${database_id}/query`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'Notion-Version': '2022-06-28'
    },
    body: JSON.stringify({})
  });

  const queryData = await queryResponse.json();
  const existingPages = queryData.results || [];

  const serviceMap = {
    'green_card': 'Residencia Permanente (Green Card)',
    'ajuste_estatus': 'Ajuste de Estatus',
    'defensa_criminal': 'Defensa Criminal'
  };

  const statusMap = {
    'pending': 'Pendiente',
    'contacted': 'Contactado',
    'scheduled': 'Agendada',
    'completed': 'Completada'
  };

  const results = [];

  for (const appointment of appointments) {
    // Check if page already exists by matching email or phone
    const existingPage = existingPages.find(page => {
      const pageEmail = page.properties?.Email?.email;
      const pagePhone = page.properties?.Teléfono?.rich_text?.[0]?.text?.content;
      return (appointment.email && pageEmail === appointment.email) ||
             (appointment.phone && pagePhone === appointment.phone);
    });

    const properties = {
      'Nombre': {
        title: [{ text: { content: appointment.full_name || 'Sin nombre' } }]
      },
      'Teléfono': {
        rich_text: [{ text: { content: appointment.phone || '' } }]
      },
      'Email': {
        email: appointment.email || null
      },
      'Servicio': {
        select: { name: serviceMap[appointment.service] || appointment.service }
      },
      'Estado': {
        select: { name: statusMap[appointment.status] || appointment.status }
      },
      'Fecha de Creación': {
        date: { start: appointment.created_date }
      }
    };

    try {
      if (existingPage) {
        // Update existing page
        const updateResponse = await fetch(`https://api.notion.com/v1/pages/${existingPage.id}`, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'Notion-Version': '2022-06-28'
          },
          body: JSON.stringify({ properties })
        });

        const updateData = await updateResponse.json();

        if (updateResponse.ok) {
          results.push({
            appointment_id: appointment.id,
            action: 'updated',
            success: true,
            notion_page_id: existingPage.id
          });
        } else {
          results.push({
            appointment_id: appointment.id,
            action: 'update_failed',
            success: false,
            error: updateData.message
          });
        }
      } else {
        // Create new page
        const createResponse = await fetch('https://api.notion.com/v1/pages', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'Notion-Version': '2022-06-28'
          },
          body: JSON.stringify({
            parent: { database_id: database_id },
            properties,
            children: [
              {
                object: 'block',
                type: 'heading_2',
                heading_2: {
                  rich_text: [{ text: { content: 'Detalles de la Consulta' } }]
                }
              },
              {
                object: 'block',
                type: 'paragraph',
                paragraph: {
                  rich_text: [{ text: { content: appointment.message || 'Sin mensaje' } }]
                }
              }
            ]
          })
        });

        const createData = await createResponse.json();

        if (createResponse.ok) {
          results.push({
            appointment_id: appointment.id,
            action: 'created',
            success: true,
            notion_page_id: createData.id,
            notion_url: createData.url
          });
        } else {
          results.push({
            appointment_id: appointment.id,
            action: 'create_failed',
            success: false,
            error: createData.message
          });
        }
      }
    } catch (error) {
      results.push({
        appointment_id: appointment.id,
        success: false,
        error: error.message
      });
    }
  }

  return Response.json({
    direction: 'to_notion',
    total: results.length,
    created: results.filter(r => r.action === 'created').length,
    updated: results.filter(r => r.action === 'updated').length,
    failed: results.filter(r => !r.success).length,
    results
  });
}

async function syncFromNotion(base44, accessToken, database_id) {
  const queryResponse = await fetch(`https://api.notion.com/v1/databases/${database_id}/query`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'Notion-Version': '2022-06-28'
    },
    body: JSON.stringify({})
  });

  if (!queryResponse.ok) {
    const errorData = await queryResponse.json();
    return Response.json({ error: errorData.message || 'Failed to query Notion' }, { status: 400 });
  }

  const queryData = await queryResponse.json();
  const notionPages = queryData.results || [];

  const existingAppointments = await base44.asServiceRole.entities.Appointment.list();

  const reverseServiceMap = {
    'Residencia Permanente (Green Card)': 'green_card',
    'Ajuste de Estatus': 'ajuste_estatus',
    'Defensa Criminal': 'defensa_criminal'
  };

  const reverseStatusMap = {
    'Pendiente': 'pending',
    'Contactado': 'contacted',
    'Agendada': 'scheduled',
    'Completada': 'completed'
  };

  const results = [];

  for (const page of notionPages) {
    try {
      const nombre = page.properties?.Nombre?.title?.[0]?.text?.content;
      const telefono = page.properties?.Teléfono?.rich_text?.[0]?.text?.content;
      const email = page.properties?.Email?.email;
      const servicio = page.properties?.Servicio?.select?.name;
      const estado = page.properties?.Estado?.select?.name;

      if (!nombre || !telefono) {
        results.push({
          notion_page_id: page.id,
          success: false,
          error: 'Missing required fields (Nombre or Teléfono)'
        });
        continue;
      }

      // Check if appointment exists by email or phone
      const existingAppointment = existingAppointments.find(apt =>
        (email && apt.email === email) || apt.phone === telefono
      );

      const appointmentData = {
        full_name: nombre,
        phone: telefono,
        email: email || undefined,
        service: reverseServiceMap[servicio] || 'green_card',
        status: reverseStatusMap[estado] || 'pending'
      };

      if (existingAppointment) {
        // Update existing appointment
        await base44.asServiceRole.entities.Appointment.update(
          existingAppointment.id,
          appointmentData
        );

        results.push({
          notion_page_id: page.id,
          appointment_id: existingAppointment.id,
          action: 'updated',
          success: true
        });
      } else {
        // Create new appointment
        const newAppointment = await base44.asServiceRole.entities.Appointment.create(
          appointmentData
        );

        results.push({
          notion_page_id: page.id,
          appointment_id: newAppointment.id,
          action: 'created',
          success: true
        });
      }
    } catch (error) {
      results.push({
        notion_page_id: page.id,
        success: false,
        error: error.message
      });
    }
  }

  return Response.json({
    direction: 'from_notion',
    total: results.length,
    created: results.filter(r => r.action === 'created').length,
    updated: results.filter(r => r.action === 'updated').length,
    failed: results.filter(r => !r.success).length,
    results
  });
}