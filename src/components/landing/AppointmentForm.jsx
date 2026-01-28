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
{ value: 'defensa_criminal', label: 'Defensa Criminal y Deportaciones' }];


export default function AppointmentForm({ formRef }) {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
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
            className="bg-white rounded-3xl p-8 sm:p-12 text-center shadow-2xl">

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
                className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700">

                <Phone className="w-5 h-5" />
                Escríbenos por WhatsApp
              </a>
            </div>
            <Button
              onClick={() => setIsSuccess(false)}
              variant="outline"
              className="border-2">

              Enviar otra solicitud
            </Button>
          </motion.div>
        </div>
      </section>);

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
            transition={{ duration: 0.6 }}>

            <span className="inline-block text-amber-400 font-semibold text-sm tracking-wider uppercase mb-4">
              Contáctanos
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Consulta Migratoria
              <span className="block text-amber-400">Personalizada</span>
            </h2>
            <p className="text-lg text-slate-400 mb-4 leading-relaxed">También atendemos asuntos del ámbito Criminal, como transporte o posesión de drogas, conspiración, cruce de Drogas a Estados Unidos, casos de “Mula Ciega”, Investigaciones de la DEA y FBI, recabamos su estatus legal, sus récords federales y estatales.

            </p>
            <p className="text-lg text-slate-400 mb-8 leading-relaxed">
              Toda la información irrelevante enviada se eliminará automáticamente.
            </p>

            {/* Price Card */}
            <div className="bg-slate-400 mb-8 px-6 py-6 rounded-2xl border border-amber-500/30">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-lg mb-1">Costo de Consulta</h4>
                  <div className="flex flex-wrap items-baseline gap-3">
                    <span className="text-slate-50 text-3xl font-bold">$1,200 MXN</span>
                    <span className="text-slate-100">o</span>
                    <span className="bg-transparent text-slate-50 text-2xl font-bold">$70 USD</span>
                  </div>
                  <p className="text-slate-950 mt-2 text-sm">Incluye análisis de tu caso y recomendaciones legales

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
              'Atención en español e inglés'].
              map((item, idx) =>
              <div key={idx} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-amber-400 flex-shrink-0" />
                  <span className="text-slate-300">{item}</span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}>

            <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Contáctanos</h3>
                <p className="text-slate-600 text-sm">
                  Utilice este formulario solo para enviar solicitudes de servicios legales o consultas legales.
                </p>
              </div>
              <div className="space-y-5">
                {/* Name */}
                <div>
                  <Label htmlFor="name" className="text-slate-700 font-medium mb-2 block">
                    Nombre Completo *
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      id="name"
                      placeholder="Tu nombre"
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      className="pl-10 h-12 border-slate-200 focus:border-amber-500 focus:ring-amber-500" />

                  </div>
                </div>

                {/* Phone */}
                <div>
                  <Label htmlFor="phone" className="text-slate-700 font-medium mb-2 block">
                    Teléfono *
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+52 664 123 4567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="pl-10 h-12 border-slate-200 focus:border-amber-500 focus:ring-amber-500" />

                  </div>
                </div>

                {/* Email */}
                <div>
                  <Label htmlFor="email" className="text-slate-700 font-medium mb-2 block">
                    Correo Electrónico
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="pl-10 h-12 border-slate-200 focus:border-amber-500 focus:ring-amber-500" />

                  </div>
                </div>

                {/* Service */}
                <div>
                  <Label htmlFor="service" className="text-slate-700 font-medium mb-2 block">
                    Servicio de Interés *
                  </Label>
                  <Select
                    value={formData.service}
                    onValueChange={(value) => setFormData({ ...formData, service: value })}>

                    <SelectTrigger className="h-12 border-slate-200 focus:border-amber-500 focus:ring-amber-500">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-slate-400" />
                        <SelectValue placeholder="Selecciona un servicio" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) =>
                      <SelectItem key={service.value} value={service.value}>
                          {service.label}
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>

                {/* Message */}
                <div>
                  <Label htmlFor="message" className="text-slate-700 font-medium mb-2 block">
                    Cuéntanos sobre tu caso
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Describe brevemente tu situación..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="min-h-[100px] border-slate-200 focus:border-amber-500 focus:ring-amber-500" />

                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-14 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 font-semibold text-lg rounded-xl shadow-lg shadow-amber-500/25 transition-all">

                  {isSubmitting ?
                  <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Enviando...
                    </> :

                  'Enviar Solicitud'
                  }
                </Button>

                <p className="text-center text-sm text-slate-500">
                  Al enviar aceptas que te contactemos para agendar tu cita
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>);

}