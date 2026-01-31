import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { appointmentData } = await req.json();

    const serviceLabels = {
      'peticion_familiar': 'Petición Familiar (I-130)',
      'visas_no_inmigrante': 'Visas de No Inmigrante',
      'perdones': 'Perdones (601 / 601A / 212)',
      'cambio_estatus': 'Cambio de Estatus Migratorio',
      'renovacion_visa': 'Renovación o Reemplazo de Visa',
      'naturalizacion': 'Naturalización y Ciudadanía',
      'green_card': 'Residencia Permanente: "Green Card"',
      'asilo': 'Obtener Asilo en los Estados Unidos',
      'records': 'Récords Migratorios y Federales',
      'defensa_criminal': 'Defensa Legal de Casos Criminales',
      'cancelacion_deportacion': 'Cancelación de Deportación',
      'otros': 'Otros Servicios'
    };

    const emailBody = `
      <h2>Nueva Solicitud de Consulta</h2>
      <p><strong>Nombre:</strong> ${appointmentData.full_name}</p>
      <p><strong>Teléfono:</strong> ${appointmentData.phone}</p>
      <p><strong>Email:</strong> ${appointmentData.email || 'No proporcionado'}</p>
      <p><strong>Servicio:</strong> ${serviceLabels[appointmentData.service] || appointmentData.service}</p>
      <p><strong>Mensaje:</strong></p>
      <p>${appointmentData.message || 'No proporcionado'}</p>
      <hr>
      <p><em>Enviado desde el formulario de consulta</em></p>
    `;

    await base44.integrations.Core.SendEmail({
      to: 'yishaqmr@gmail.com',
      subject: `Nueva Consulta - ${appointmentData.full_name}`,
      body: emailBody
    });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});