import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Calendar, Phone, Mail, User, CheckCircle, DollarSign, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const services = [
  { value: 'green_card', label: 'Residencia Permanente (Green Card)' },
  { value: 'ajuste_estatus', label: 'Ajuste de Estatus por Petición Familiar' },
  { value: 'defensa_criminal', label: 'Defensa Criminal y Deportaciones' },
];

export default function AppointmentForm({ formRef }) {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.full_name || !formData.phone || !formData.service) {
      toast.error('Por favor completa los campos requeridos');
      return;
    }

    setIsSubmitting(true);

    await base44.entities.Appointment.create(formData);
    
    setIsSuccess(true);
    toast.success('¡Solicitud enviada! Te contactaremos pronto.');
    setIsSubmitting(false);
  };

  if (isSuccess) {
    return (
      <section ref={formRef} className="py-20 sm:py-28 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-8 sm:p-12 text-center shadow-2xl"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
              ¡Solicitud Recibida!
            </h3>
            <p className="text-lg text-slate-600 mb-6">
              Gracias por contactarnos. Un miembro de nuestro equipo se comunicará contigo 
              en las próximas 24 horas para confirmar tu cita.
            </p>
            <div className="bg-slate-50 rounded-2xl p-6 mb-8">
              <p className="text-slate-600 mb-2">¿Necesitas atención inmediata?</p>
              <a 
                href="https://wa.me/526643207699"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700"
              >
                <Phone className="w-5 h-5" />
                Escríbenos por WhatsApp
              </a>
            </div>
            <Button 
              onClick={() => setIsSuccess(false)}
              variant="outline"
              className="border-2"
            >
              Enviar otra solicitud
            </Button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section ref={formRef} className="py-20 sm:py-28 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-amber-400 font-semibold text-sm tracking-wider uppercase mb-4">
              Agenda Tu Cita
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Consulta Migratoria
              <span className="block text-amber-400">Personalizada</span>
            </h2>
            <p className="text-lg text-slate-400 mb-8 leading-relaxed">
              Da el primer paso hacia tu futuro. Agenda una consulta con el Lic. Marcelo Zúñiga 
              y recibe asesoría profesional para tu caso migratorio.
            </p>

            {/* Price Card */}
            <div className="bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/30 rounded-2xl p-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-lg mb-1">Costo de Consulta</h4>
                  <div className="flex flex-wrap items-baseline gap-3">
                    <span className="text-3xl font-bold text-amber-400">$1,200 MXN</span>
                    <span className="text-slate-400">o</span>
                    <span className="text-2xl font-bold text-amber-400">$70 USD</span>
                  </div>
                  <p className="text-slate-400 text-sm mt-2">
                    Incluye análisis de tu caso y recomendaciones legales
                  </p>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="space-y-4">
              {[
                'Atención personalizada con el Lic. Zúñiga',
                'Análisis completo de tu situación migratoria',
                'Opciones y estrategias legales para tu caso',
                'Atención en español e inglés',
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-amber-400 flex-shrink-0" />
                  <span className="text-slate-300">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-2xl">
              {/* Calendly iframe */}
              <iframe 
                src="https://calendly.com/citascorpzuniga/citas" 
                width="100%" 
                height="700" 
                frameBorder="0"
                className="rounded-2xl"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}