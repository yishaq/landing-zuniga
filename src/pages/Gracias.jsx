import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Phone, Globe, Calendar, MapPin, Clock, FileText, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function GraciasPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16">
        
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 border border-slate-200 rounded-2xl bg-white shadow-lg mb-6">
          
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 min-w-0">
            <img
              src="https://corpzuniga.com/Zunig%20abogados_corto_negro.svg"
              alt="Corporativo Zúñiga"
              className="h-12 w-auto" />

            <div className="min-w-0">
              <h1 className="text-lg font-bold text-slate-900 tracking-wide">Corporativo Zúñiga</h1>
              <p className="text-sm text-slate-600 mt-0.5">Asuntos migratorios y defensa legal en Estados Unidos</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <a
              href="https://wa.me/5216643540535"
              target="_blank"
              rel="noopener noreferrer" className="bg-emerald-700 text-white px-4 py-2.5 text-sm font-semibold rounded-xl inline-flex items-center gap-2 hover:bg-[#002f4d] transition-all">WhatsApp directo


            </a>
            <a
              href="https://corpzuniga.com"
              target="_blank"
              rel="noopener noreferrer" className="bg-slate-950 text-slate-50 px-4 py-2.5 text-sm font-semibold rounded-xl inline-flex items-center gap-2 border border-slate-200 hover:border-[#003E65] hover:text-[#003E65] transition-all">Sitio web


            </a>
            <a
              href="https://calendly.com/citascorpzuniga/citas/"
              target="_blank"
              rel="noopener noreferrer" className="bg-slate-950 text-slate-50 px-4 py-2.5 text-sm font-semibold rounded-xl inline-flex items-center gap-2 border border-slate-200 hover:border-[#003E65] hover:text-[#003E65] transition-all">Ver/gestionar cita


            </a>
          </div>
        </motion.header>

        {/* Hero Section */}
        <div className="grid lg:grid-cols-5 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-3 border border-slate-200 bg-white rounded-2xl shadow-lg p-6">
            
            <div className="bg-emerald-700 text-slate-50 mb-3 px-3 py-1.5 text-xs font-bold tracking-wide rounded-full inline-flex items-center gap-2 border border-[#003E65]">
              <CheckCircle className="w-4 h-4" />
              Pago confirmado
            </div>

            <h2 className="text-3xl font-bold text-slate-900 mb-2 leading-tight">
              ¡Gracias por agendar tu asesoría migratoria!
            </h2>
            <p className="text-slate-600 mb-6">
              Hemos recibido tu pago y tu solicitud de cita. Nuestro equipo revisará los detalles y te apoyará para que llegues preparado(a) a tu consulta.
            </p>

            {/* Info Grid */}
            <div className="grid sm:grid-cols-2 gap-3.5 mb-5">
              <div className="bg-zinc-100 p-4 rounded-2xl border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-1.5 text-sm">¿Qué sigue?</h3>
                <p className="text-slate-600 text-sm">Si necesitas confirmar datos o enviar documentos, escríbenos por WhatsApp. Te respondemos en horario laboral.</p>
              </div>

              <div className="bg-gray-100 p-4 rounded-2xl border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-1.5 text-sm">Recomendación</h3>
                <p className="text-slate-600 text-sm">Ten a la mano tu identificación y cualquier documento migratorio o legal relevante para tu caso.</p>
              </div>

              <div className="bg-gray-100 p-4 rounded-2xl border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-1.5 text-sm">Ubicación</h3>
                <p className="text-slate-600 text-sm">Blvd. Agua Caliente 10611, Piso 3, Oficina 301, Aviación, 22020 Tijuana, B.C.</p>
              </div>

              <div className="bg-gray-100 p-4 rounded-2xl border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-1.5 text-sm">Horario</h3>
                <p className="text-slate-600 text-sm">Lunes a viernes, 9:00 AM a 5:00 PM</p>
              </div>
            </div>

            {/* Important Note */}
            <div className="bg-red-500 text-[#ffffff] mb-5 p-4 rounded-xl border-l-3 border-l-4 border-[#003E65]">
              <p className="text-slate-50 text-sm">Importante: Esta página es informativa. La asesoría no garantiza resultados específicos; cada caso se evalúa de forma individual según tus circunstancias y la legislación vigente.

              </p>
            </div>

            {/* FAQ */}
            <div className="space-y-4">
              <h3 className="font-bold text-slate-900">Preguntas frecuentes</h3>
              
              <div>
                <h4 className="font-semibold text-slate-900 text-sm mb-1">¿Dónde está mi confirmación?</h4>
                <p className="text-slate-600 text-sm">
                  Revisa tu correo (incluida la carpeta de spam) o accede a tu cuenta de Calendly para ver los detalles de tu cita. También puedes llamarnos al +52 664 320 7699.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 text-sm mb-1">¿Puedo cambiar la fecha de mi cita?</h4>
                <p className="text-slate-600 text-sm">
                  Sí. Contacta a nuestro equipo por WhatsApp o teléfono con al menos 24 horas de anticipación para reprogramar sin inconvenientes.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 text-sm mb-1">¿La asesoría incluye trámites?</h4>
                <p className="text-slate-600 text-sm">
                  La consulta es evaluativa y orientativa. Si requieres representación legal o trámites, se discutirán las opciones durante la cita y se cotizará el servicio integral por separado.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 text-sm mb-1">¿Necesito llevar algo a mi cita?</h4>
                <p className="text-slate-600 text-sm">
                  Es recomendable llevar: identificación oficial, documentos migratorios existentes (visas, permisos, cartas de inmigración) y cualquier otro papel relevante a tu situación.
                </p>
              </div>
            </div>

            <div className="h-px bg-slate-200 my-5" />

            <p className="text-xs text-slate-500">
              ¿Más dudas? Llámanos al <a href="tel:+526643207699" className="text-[#003E65] hover:underline">+52 664 320 7699</a> o escríbenos por <a href="https://wa.me/5216643540535" target="_blank" rel="noopener" className="text-[#003E65] hover:underline">WhatsApp</a>.
            </p>
          </motion.div>

          {/* Right Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-4">
            
            {/* Contact Card */}
            <div className="border border-slate-200 bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-bold text-slate-900 mb-4">Contacto directo</h3>
              
              <div className="space-y-3">
                <a
                  href="https://wa.me/5216643540535"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="w-10 h-10 bg-[#003E65] rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">WhatsApp</p>
                    <p className="text-xs text-slate-600">Respuesta inmediata</p>
                  </div>
                </a>

                <a
                  href="tel:+526643207699"
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="bg-stone-100 text-slate-50 rounded-lg w-10 h-10 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-slate-700" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">Teléfono</p>
                    <p className="text-xs text-slate-600">+52 664 320 7699</p>
                  </div>
                </a>

                <a
                  href="https://corpzuniga.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="bg-stone-100 text-gray-100 rounded-lg w-10 h-10 flex items-center justify-center">
                    <Globe className="w-5 h-5 text-slate-700" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">Sitio web</p>
                    <p className="text-xs text-slate-600">corpzuniga.com</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Location Card */}
            <div className="border border-slate-200 bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-bold text-slate-900 mb-4">Nuestra oficina</h3>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-slate-700" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm mb-1">Edificio Centura</p>
                    <p className="text-xs text-slate-600">Blvd. Agua Caliente 10611, Piso 3, Oficina 301</p>
                    <p className="text-xs text-slate-600">Aviación, 22020 Tijuana, B.C.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-slate-700" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm mb-1">Horario</p>
                    <p className="text-xs text-slate-600">Lunes a viernes</p>
                    <p className="text-xs text-slate-600">9:00 AM - 5:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-slate-200 bg-white text-xs text-slate-600">
              <FileText className="w-4 h-4" />
              Servicios legales profesionales
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 pt-6 border-t border-slate-200 text-center text-xs text-slate-500">
          <p>© 2026 Corporativo Zúñiga · Abogados de Inmigración y Defensa Criminal · Tijuana, B.C., México</p>
          <p className="mt-2">
            La información en esta página no constituye asesoría legal formal. Para consultas específicas, agenda tu cita o contáctanos.
          </p>
        </motion.footer>

      </div>
    </div>);

}