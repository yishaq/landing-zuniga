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

    const { appointment_id, database_id } = await req.json();

    if (!database_id) {
      return Response.json({ error: 'database_id is required. Please provide a Notion database ID.' }, { status: 400 });
    }

    // Get Notion access token
    const accessToken = await base44.asServiceRole.connectors.getAccessToken('notion');

    if (!accessToken) {
      return Response.json({ error: 'Notion not connected' }, { status: 400 });
    }

    // Fetch appointments
    let appointments = [];
    if (appointment_id) {
      const appointment = await base44.asServiceRole.entities.Appointment.get(appointment_id);
      appointments = [appointment];
    } else {
      appointments = await base44.asServiceRole.entities.Appointment.list();
    }

    const results = [];

    for (const appointment of appointments) {
      // Map service enum to readable text
      const serviceMap = {
        'green_card': 'Residencia Permanente (Green Card)',
        'ajuste_estatus': 'Ajuste de Estatus por Petición Familiar',
        'defensa_criminal': 'Defensa Criminal y Deportaciones'
      };

      const statusMap = {
        'pending': 'Pendiente',
        'contacted': 'Contactado',
        'scheduled': 'Agendada',
        'completed': 'Completada'
      };

      // Create Notion page
      const notionResponse = await fetch('https://api.notion.com/v1/pages', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'Notion-Version': '2022-06-28'
        },
        body: JSON.stringify({
          parent: { database_id: database_id },
          properties: {
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
          },
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
                rich_text: [{ 
                  text: { 
                    content: appointment.message || 'Sin mensaje proporcionado' 
                  } 
                }]
              }
            },
            {
              object: 'block',
              type: 'divider',
              divider: {}
            },
            {
              object: 'block',
              type: 'heading_3',
              heading_3: {
                rich_text: [{ text: { content: 'Información de Contacto' } }]
              }
            },
            {
              object: 'block',
              type: 'bulleted_list_item',
              bulleted_list_item: {
                rich_text: [{ text: { content: `Nombre: ${appointment.full_name}` } }]
              }
            },
            {
              object: 'block',
              type: 'bulleted_list_item',
              bulleted_list_item: {
                rich_text: [{ text: { content: `Teléfono: ${appointment.phone}` } }]
              }
            },
            {
              object: 'block',
              type: 'bulleted_list_item',
              bulleted_list_item: {
                rich_text: [{ text: { content: `Email: ${appointment.email || 'No proporcionado'}` } }]
              }
            }
          ]
        })
      });

      const notionData = await notionResponse.json();

      if (!notionResponse.ok) {
        results.push({
          appointment_id: appointment.id,
          success: false,
          error: notionData.message || 'Error creating Notion page'
        });
      } else {
        results.push({
          appointment_id: appointment.id,
          success: true,
          notion_page_id: notionData.id,
          notion_url: notionData.url
        });
      }
    }

    return Response.json({
      message: 'Export completed',
      exported: results.filter(r => r.success).length,
      failed: results.filter(r => !r.success).length,
      results
    });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});