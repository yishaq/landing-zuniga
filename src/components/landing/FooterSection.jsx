import React from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';

export default function FooterSection() {
  return (
    <footer className="bg-slate-900 text-white">
      {/* CTA Bar */}
      <div className="bg-gradient-to-r from-amber-500 to-amber-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-slate-900">¿Tienes dudas? Escríbenos ahora</h3>
              <p className="text-slate-800">Atención inmediata en horario hábil</p>
            </div>
            <a 
              href="https://wa.me/526643207699?text=Hola,%20me%20gustaría%20información%20sobre%20servicios%20migratorios"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-slate-800 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {/* Brand */}
          <div>
            <h4 className="text-2xl font-bold mb-4">Corporativo Zúñiga</h4>
            <p className="text-slate-400 mb-6 leading-relaxed">
              Abogados especializados en asuntos migratorios y criminales en Estados Unidos. 
              Más de 20 años de experiencia resolviendo casos complejos.
            </p>
            <div className="flex items-center gap-4">
              <img 
                src="https://corpzuniga.com/Zunig%20abogados_corto_blanco.svg"
                alt="AILA"
                className="h-10 object-contain brightness-0 invert opacity-60"
              />
            </div>
          </div>

          {/* Contact */}
          <div>
            <h5 className="font-semibold text-lg mb-4">Contacto</h5>
            <ul className="space-y-4">
              <li>
                <a href="tel:+526643207699" className="flex items-center gap-3 text-slate-400 hover:text-amber-400 transition-colors">
                  <Phone className="w-5 h-5 text-amber-500" />
                  +52 664 320 7699
                </a>
              </li>
              <li>
                <a href="mailto:contacto@corpzuniga.com" className="flex items-center gap-3 text-slate-400 hover:text-amber-400 transition-colors">
                  <Mail className="w-5 h-5 text-amber-500" />
                  contacto@corpzuniga.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-slate-400">
                <MapPin className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <span>Edificio Centura, Blvd. Agua Caliente 10611, Tijuana B.C.</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h5 className="font-semibold text-lg mb-4">Horario de Atención</h5>
            <div className="flex items-start gap-3 text-slate-400 mb-4">
              <Clock className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <p>Lunes a Viernes</p>
                <p className="text-white font-medium">9:00 AM - 6:00 PM</p>
              </div>
            </div>
            <div className="flex items-start gap-3 text-slate-400">
              <Clock className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <p>Sábados</p>
                <p className="text-white font-medium">10:00 AM - 2:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
            <p>© {new Date().getFullYear()} Corporativo Zúñiga. Todos los derechos reservados.</p>
            <div className="flex items-center gap-6">
              <a href="https://corpzuniga.com/" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">
                Sitio Web Principal
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}