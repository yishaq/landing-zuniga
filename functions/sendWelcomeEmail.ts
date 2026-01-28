import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';
import { Resend } from 'npm:resend@4.0.2';

const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { event, data } = await req.json();

    // Verify this is a user creation event
    if (event?.type !== 'create' || event?.entity_name !== 'User') {
      return Response.json({ error: 'Invalid event type' }, { status: 400 });
    }

    const user = data;
    
    if (!user?.email) {
      return Response.json({ error: 'User email not found' }, { status: 400 });
    }

    // Send welcome email
    const { data: emailData, error } = await resend.emails.send({
      from: 'Servicios Legales <onboarding@resend.dev>', // Change to your verified domain
      to: user.email,
      subject: '¡Bienvenido a nuestros Servicios Legales!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #f59e0b;">¡Bienvenido, ${user.full_name || 'Cliente'}!</h1>
          <p style="font-size: 16px; color: #334155;">
            Gracias por registrarte en nuestros servicios legales. Estamos aquí para ayudarte 
            con todos tus asuntos migratorios y legales.
          </p>
          <div style="background-color: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #0f172a; margin-top: 0;">¿Qué sigue?</h2>
            <ul style="color: #475569;">
              <li>Explora nuestros servicios de inmigración</li>
              <li>Agenda una consulta personalizada</li>
              <li>Contáctanos por WhatsApp para consultas rápidas</li>
            </ul>
          </div>
          <p style="color: #64748b; font-size: 14px;">
            Si tienes alguna pregunta, no dudes en contactarnos.
          </p>
          <a href="https://wa.me/526643207699" style="display: inline-block; background-color: #f59e0b; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 10px;">
            Contactar por WhatsApp
          </a>
        </div>
      `
    });

    if (error) {
      console.error('Resend error:', error);
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ 
      success: true, 
      messageId: emailData?.id,
      sentTo: user.email 
    });

  } catch (error) {
    console.error('Error sending welcome email:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});