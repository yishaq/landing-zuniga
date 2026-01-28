import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, content } = await req.json();

    if (!title || !content) {
      return Response.json({ error: 'title and content are required' }, { status: 400 });
    }

    const accessToken = await base44.asServiceRole.connectors.getAccessToken('notion');

    if (!accessToken) {
      return Response.json({ error: 'Notion not connected' }, { status: 400 });
    }

    const page_id = Deno.env.get('NOTION_UPDATES_PAGE_ID');

    if (!page_id) {
      return Response.json({ error: 'NOTION_UPDATES_PAGE_ID not configured' }, { status: 400 });
    }

    // Get current date for the update
    const now = new Date();
    const dateString = now.toLocaleDateString('es-MX', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    // Append blocks to the Notion page
    const appendResponse = await fetch(`https://api.notion.com/v1/blocks/${page_id}/children`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28'
      },
      body: JSON.stringify({
        children: [
          {
            object: 'block',
            type: 'heading_2',
            heading_2: {
              rich_text: [{ text: { content: title } }]
            }
          },
          {
            object: 'block',
            type: 'paragraph',
            paragraph: {
              rich_text: [
                { 
                  text: { content: `📅 ${dateString} • ` },
                  annotations: { italic: true, color: 'gray' }
                },
                { 
                  text: { content: `Por ${user.full_name || user.email}` },
                  annotations: { italic: true, color: 'gray' }
                }
              ]
            }
          },
          {
            object: 'block',
            type: 'paragraph',
            paragraph: {
              rich_text: [{ text: { content: content } }]
            }
          },
          {
            object: 'block',
            type: 'divider',
            divider: {}
          }
        ]
      })
    });

    const appendData = await appendResponse.json();

    if (!appendResponse.ok) {
      return Response.json({ 
        error: appendData.message || 'Error posting to Notion',
        details: appendData
      }, { status: 400 });
    }

    return Response.json({
      success: true,
      message: 'Update posted to Notion',
      page_url: `https://notion.so/${page_id.replace(/-/g, '')}`
    });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});