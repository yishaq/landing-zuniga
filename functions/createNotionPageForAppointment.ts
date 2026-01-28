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
    const database_id = Deno.env.get('NOTION_DATABASE_ID');

    if (!database_id) {
      return Response.json({ error: 'NOTION_DATABASE_ID not configured' }, { status: 400 });
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