import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { event, data: appointment } = await req.json();

    // Get Notion access token
    const accessToken = await base44.asServiceRole.connectors.getAccessToken('notion');

    if (!accessToken) {
      return Response.json({ error: 'Notion not connected' }, { status: 400 });
    }

    // Get database ID from secrets
    let database_id = Deno.env.get('NOTION_DATABASE_ID');

    if (!database_id) {
      return Response.json({ error: 'NOTION_DATABASE_ID not configured' }, { status: 400 });
    }

    // Extract UUID from URL if a full Notion URL was provided
    if (database_id.includes('notion.site') || database_id.includes('notion.so')) {
      // Extract the 32-character hex string from the URL
      const hexMatch = database_id.match(/([a-f0-9]{32})/i);
      if (hexMatch) {
        const hex = hexMatch[1];
        // Format as UUID with hyphens: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
        database_id = `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20, 32)}`;
      } else {
        // Try to extract already formatted UUID
        const uuidMatch = database_id.match(/([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})/i);
        if (uuidMatch) {
          database_id = uuidMatch[1];
        }
      }
    }
    
    // Remove any hyphens and reformat to ensure proper UUID format
    const cleanId = database_id.replace(/-/g, '');
    if (cleanId.length === 32 && /^[a-f0-9]{32}$/i.test(cleanId)) {
      database_id = `${cleanId.slice(0, 8)}-${cleanId.slice(8, 12)}-${cleanId.slice(12, 16)}-${cleanId.slice(16, 20)}-${cleanId.slice(20, 32)}`;
    }

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
              rich_text: [{ text: { content: appointment.message || 'Sin mensaje proporcionado' } }]
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
              rich_text: [{ text: { content: 'Notas de Seguimiento' } }]
            }
          },
          {
            object: 'block',
            type: 'paragraph',
            paragraph: {
              rich_text: [{ text: { content: '' } }]
            }
          }
        ]
      })
    });

    const notionData = await notionResponse.json();

    if (!notionResponse.ok) {
      return Response.json({ 
        error: notionData.message || 'Error creating Notion page',
        details: notionData
      }, { status: 400 });
    }

    return Response.json({
      success: true,
      appointment_id: appointment.id,
      notion_page_id: notionData.id,
      notion_url: notionData.url
    });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});