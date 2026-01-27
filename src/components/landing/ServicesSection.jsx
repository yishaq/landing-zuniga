import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Users, Scale, ArrowRight } from 'lucide-react';

const services = [
  {
    id: 'green_card',
    icon: CreditCard,
    title: 'Residencia Permanente',
    subtitle: 'Green Card',
    description: 'Obtén tu tarjeta de residencia permanente en Estados Unidos. Te guiamos en cada paso del proceso para que tú y tu familia puedan vivir y trabajar legalmente.',
    features: ['Peticiones familiares', 'Visa de trabajo', 'Inversión EB-5'],
    color: 'from-emerald-500 to-emerald-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
  },
  {
    id: 'ajuste_estatus',
    icon: Users,
    title: 'Ajuste de Estatus',
    subtitle: 'Por Peticiones Familiares',
    description: 'Si tienes familiares ciudadanos o residentes en EE.UU., podemos ayudarte a ajustar tu estatus migratorio sin salir del país.',
    features: ['Cónyuge ciudadano', 'Padres ciudadanos', 'Hijos mayores de 21'],
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
  },
  {
    id: 'defensa_criminal',
    icon: Scale,
    title: 'Defensa Criminal',
    subtitle: 'y Deportaciones',
    description: 'Defensa profesional en casos criminales que puedan afectar tu estatus migratorio. Luchamos para evitar deportaciones y proteger tu permanencia.',
    features: ['Cancelación de deportación', 'Asilo', 'Apelaciones'],
    color: 'from-amber-500 to-amber-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
  },
];

export default function ServicesSection() {
  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-amber-600 font-semibold text-sm tracking-wider uppercase mb-4">
            Nuestros Servicios
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Servicios Especializados
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Ofrecemos soluciones legales integrales para resolver tu situación migratoria
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`group relative ${service.bgColor} ${service.borderColor} border rounded-3xl p-8 hover:shadow-xl transition-all duration-500`}
            >
              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} shadow-lg mb-6`}>
                <service.icon className="w-7 h-7 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-slate-900 mb-1">
                {service.title}
              </h3>
              <p className={`text-sm font-medium bg-gradient-to-r ${service.color} bg-clip-text text-transparent mb-4`}>
                {service.subtitle}
              </p>
              <p className="text-slate-600 mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-slate-700">
                    <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.color}`} />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Arrow */}
              <div className="flex items-center gap-2 text-slate-900 font-medium group-hover:gap-3 transition-all">
                <span>Saber más</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}