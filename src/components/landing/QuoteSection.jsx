import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

export default function QuoteSection() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <section className="bg-slate-950 py-20 sm:py-28 from-slate-900 to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}>

          <div className="inline-flex items-center gap-2 text-amber-400 mb-4">
            <Calendar className="w-6 h-6" />
            <span className="font-semibold text-sm tracking-wider uppercase">
              Agenda tu Cita
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Agendar una Cita
          </h2>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Programe fácilmente una consulta profesional a través de este sitio, diseñada para brindar asistencia legal y migratoria de manera personalizada.
          </p>

          {/* Pricing Card */}
          <div className="inline-block bg-white/10 backdrop-blur-sm border border-amber-500/30 rounded-2xl px-8 py-6">
            <h3 className="text-amber-400 font-bold text-lg mb-3">Costo de Consulta</h3>
            <div className="flex items-center justify-center gap-3 mb-2">
              <span className="text-white text-3xl font-bold">$1,200 MXN</span>
              <span className="text-slate-300">o</span>
              <span className="text-white text-3xl font-bold">$70 USD</span>
            </div>
            <p className="text-slate-300 text-sm">Incluye análisis de tu caso y recomendaciones legales</p>
          </div>
        </motion.div>

        {/* Iframe Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden">

          <div className="w-full">
            <div 
              className="calendly-inline-widget" 
              data-url="https://calendly.com/citascorpzuniga/citas?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=004e7e" 
              style={{minWidth: '320px', height: '700px'}}
            />
          </div>
        </motion.div>
      </div>
    </section>);

}