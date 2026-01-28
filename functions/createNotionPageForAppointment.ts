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

    // Extract UUID from Notion URL or format properly
    // Notion database URLs look like: https://notion.site/2f608c918b388013ac0... (32 hex chars)
    // or https://notion.so/database-id?v=view-id
    const originalId = database_id;
    
    // If it's a URL, extract the ID from it
    if (database_id.includes('http')) {
      // Try to find 32 consecutive hex characters (Notion's compact format)
      const hexMatch = database_id.match(/([a-f0-9]{32})/i);
      if (hexMatch) {
        database_id = hexMatch[1];
      } else {
        // Try to find UUID format with dashes
        const uuidMatch = database_id.match(/([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})/i);
        if (uuidMatch) {
          database_id = uuidMatch[1];
        }
      }
    }
    
    // Normalize to UUID format with dashes
    database_id = database_id.replace(/-/g, ''); // Remove existing dashes
    
    if (database_id.length === 32 && /^[a-f0-9]{32}$/i.test(database_id)) {
      // Format as proper UUID: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
      database_id = `${database_id.slice(0, 8)}-${database_id.slice(8, 12)}-${database_id.slice(12, 16)}-${database_id.slice(16, 20)}-${database_id.slice(20, 32)}`;
    } else {
      return Response.json({ 
        error: 'Invalid NOTION_DATABASE_ID format. Must be a 32-character hex string or valid UUID.',
        received: originalId,
        processed: database_id
      }, { status: 400 });
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