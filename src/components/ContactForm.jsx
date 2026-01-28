import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, CheckCircle2, Phone, Mail } from 'lucide-react';
import { toast } from 'sonner';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    email: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const services = [
    { value: 'green_card', label: 'Residencia Permanente (Green Card)' },
    { value: 'ajuste_estatus', label: 'Ajuste de Estatus' },
    { value: 'defensa_criminal', label: 'Defensa Criminal' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.full_name || !formData.phone || !formData.service) {
      toast.error('Por favor completa todos los campos requeridos');
      return;
    }

    setIsSubmitting(true);

    try {
      await base44.entities.Appointment.create({
        ...formData,
        status: 'pending'
      });
      
      setIsSuccess(true);
      toast.success('¡Solicitud enviada exitosamente!');
      
      // Reset form
      setFormData({
        full_name: '',
        phone: '',
        email: '',
        service: '',
        message: ''
      });
    } catch (error) {
      toast.error('Error al enviar la solicitud. Intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="pt-12 pb-12 text-center">
          <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-slate-900 mb-2">¡Solicitud Enviada!</h3>
          <p className="text-slate-600 mb-6">
            Nos pondremos en contacto contigo pronto para atender tu caso.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="outline"
              onClick={() => setIsSuccess(false)}
              className="gap-2"
            >
              Enviar otra solicitud
            </Button>
            <a
              href="https://wa.me/526642955660"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              <Phone className="w-4 h-4" />
              Contactar por WhatsApp
            </a>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Contáctanos</CardTitle>
        <CardDescription className="space-y-2">
          <p>Utilice este formulario solo para enviar solicitudes de servicios legales o consultas legales.</p>
          <p>Toda la información irrelevante enviada se eliminará automáticamente.</p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nombre Completo */}
          <div className="space-y-2">
            <Label htmlFor="full_name">
              Nombre Completo <span className="text-red-500">*</span>
            </Label>
            <Input
              id="full_name"
              type="text"
              placeholder="Ingresa tu nombre completo"
              value={formData.full_name}
              onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              required
            />
          </div>

          {/* Teléfono */}
          <div className="space-y-2">
            <Label htmlFor="phone">
              Teléfono <span className="text-red-500">*</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Ej: +52 664 123 4567"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>

          {/* Correo Electrónico */}
          <div className="space-y-2">
            <Label htmlFor="email">Correo Electrónico</Label>
            <Input
              id="email"
              type="email"
              placeholder="tu@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          {/* Servicio de Interés */}
          <div className="space-y-2">
            <Label htmlFor="service">
              Servicio de Interés <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.service}
              onValueChange={(value) => setFormData({ ...formData, service: value })}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un servicio" />
              </SelectTrigger>
              <SelectContent>
                {services.map((service) => (
                  <SelectItem key={service.value} value={service.value}>
                    {service.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Descripción del Asunto */}
          <div className="space-y-2">
            <Label htmlFor="message">Descripción del Asunto</Label>
            <Textarea
              id="message"
              placeholder="Describe brevemente tu situación o consulta..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="min-h-[120px]"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-amber-600 hover:bg-amber-700"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Enviando...
              </>
            ) : (
              'Enviar Solicitud'
            )}
          </Button>

          <div className="text-center text-sm text-slate-500">
            <p>O contáctanos directamente:</p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center mt-2">
              <a
                href="tel:+526642955660"
                className="text-amber-600 hover:text-amber-700 flex items-center justify-center gap-1"
              >
                <Phone className="w-4 h-4" />
                664-295-5660
              </a>
              <span className="hidden sm:inline">•</span>
              <a
                href="mailto:info@corporativozuniga.com"
                className="text-amber-600 hover:text-amber-700 flex items-center justify-center gap-1"
              >
                <Mail className="w-4 h-4" />
                info@corporativozuniga.com
              </a>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}