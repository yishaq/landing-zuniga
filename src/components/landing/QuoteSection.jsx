import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

export default function QuoteSection() {
  return (
    <section className="py-20 sm:py-28 bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 text-amber-400 mb-4">
            <Calendar className="w-6 h-6" />
            <span className="font-semibold text-sm tracking-wider uppercase">
              Agenda tu Cita
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Agendar una Cita
          </h2>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            A través de este sitio podrá agendar una asesoría profesional personalizada, para aquellas personas que requieren asistencia legal y de inmigración.
          </p>
        </motion.div>

        {/* Iframe Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="aspect-video w-full">
<div class="calendly-inline-widget" data-url="https://calendly.com/citascorpzuniga/citas?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=004e7e" style="min-width:320px;height:700px;"></div>
<script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async></script>
          </div>
        </motion.div>
      </div>
    </section>
  );
}