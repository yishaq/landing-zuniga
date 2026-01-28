import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const accessToken = await base44.asServiceRole.connectors.getAccessToken('notion');

    if (!accessToken) {
      return Response.json({ error: 'Notion not connected' }, { status: 400 });
    }

    const database_id = Deno.env.get('NOTION_ONBOARDING_DB_ID');

    if (!database_id) {
      return Response.json({ error: 'NOTION_ONBOARDING_DB_ID not configured' }, { status: 400 });
    }

    // Query Notion database
    const queryResponse = await fetch(`https://api.notion.com/v1/databases/${database_id}/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28'
      },
      body: JSON.stringify({
        sorts: [
          {
            property: 'Status',
            direction: 'ascending'
          }
        ]
      })
    });

    if (!queryResponse.ok) {
      const errorData = await queryResponse.json();
      return Response.json({ error: errorData.message || 'Failed to query Notion' }, { status: 400 });
    }

    const queryData = await queryResponse.json();
    const pages = queryData.results || [];

    // Parse the tasks
    const tasks = pages.map(page => {
      const properties = page.properties;
      
      return {
        id: page.id,
        name: properties.Name?.title?.[0]?.text?.content || properties.Nombre?.title?.[0]?.text?.content || 'Sin nombre',
        status: properties.Status?.status?.name || properties.Estado?.status?.name || 'Not started',
        assignee: properties.Assignee?.people?.[0]?.name || properties.Asignado?.people?.[0]?.name || null,
        dueDate: properties['Due Date']?.date?.start || properties['Fecha Límite']?.date?.start || null,
        url: page.url,
        completed: (properties.Status?.status?.name || properties.Estado?.status?.name) === 'Done' || 
                   (properties.Status?.status?.name || properties.Estado?.status?.name) === 'Completado'
      };
    });

    // Calculate progress
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.completed).length;
    const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    return Response.json({
      tasks,
      stats: {
        total: totalTasks,
        completed: completedTasks,
        in_progress: tasks.filter(t => !t.completed && t.status !== 'Not started' && t.status !== 'No iniciado').length,
        not_started: tasks.filter(t => t.status === 'Not started' || t.status === 'No iniciado').length,
        progress_percent: progressPercent
      }
    });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});