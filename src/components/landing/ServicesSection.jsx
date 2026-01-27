import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Users, Scale, ArrowRight, FileText, ShieldAlert, Ban, Globe, Clock, Heart, UserPlus, Handshake, LifeBuoy, Briefcase, GitMerge, Hammer, Flag, RefreshCw, TrendingUp, DollarSign } from 'lucide-react';

const services = [
  {
    id: 'cambio_estatus_migratorio',
    icon: FileText,
    title: 'Cambio de Estatus Migratorio',
    subtitle: 'Protegemos tus Derechos',
    description: 'Descubre un camino claro hacia un nuevo estatus migratorio con nuestro servicio de Cambio de Estatus Migratorio. Nuestro experimentado equipo de abogados de Inmigración en Tijuana te guiará paso a paso, asegurando una transición sin complicaciones y brindándote la confianza necesaria para alcanzar tus metas migratorias.',
    features: ['Evaluación de elegibilidad', 'Preparación de documentos', 'Representación legal'],
    color: 'from-slate-700 to-slate-900',
  },
  {
    id: 'defensa_legal_deportacion',
    icon: ShieldAlert,
    title: 'Defensa Legal en Casos de Deportación',
    subtitle: 'Protección Experta',
    description: 'Cuando enfrentas la posibilidad de deportación, confía en nuestro servicio de Defensa Legal en Casos de Deportación en Tijuana. Nuestros abogados de inmigración están listos para proteger tus derechos con firmeza y experiencia legal. Aseguramos una representación efectiva para abordar los desafíos migratorios y trabajar incansablemente en tu defensa.',
    features: ['Casos de deportación', 'Apelaciones', 'Recursos legales'],
    color: 'from-red-500 to-red-700',
  },
  {
    id: 'cancelacion_deportacion',
    icon: Ban,
    title: 'Cancelación de Deportación',
    subtitle: 'Tu Permanencia Asegurada',
    description: 'Explora las opciones de Cancelación de Deportación con nuestras especialistas en Inmigración & Visas en Tijuana. Ofrecemos asesoramiento y representación legal para aquellos que buscan evitar la deportación. Con un enfoque estratégico y conocimiento legal sólido, trabajamos para proteger tu permanencia en el país.',
    features: ['Estrategias legales', 'Representación en corte', 'Defensa sólida'],
    color: 'from-yellow-500 to-yellow-700',
  },
  {
    id: 'residencia_temporal_mexico',
    icon: Globe,
    title: 'Residencia Temporal y Permanente en México',
    subtitle: 'Tu Hogar en México',
    description: 'Facilitamos tu proceso de Residencia Temporal y Permanente en México. Si planeas vivir o trabajar en el país por un tiempo determinado, nuestro equipo te guiará paso a paso para que encuentres tu hogar en México de manera efectiva y segura.',
    features: ['Visas de Residencia', 'Trámites de naturalización', 'Asesoría legal'],
    color: 'from-green-500 to-green-700',
  },
  {
    id: 'extension_estadia_eeuu',
    icon: Clock,
    title: 'Extensión de Estadia en EE.UU',
    subtitle: 'Prolonga tu Estancia',
    description: 'Si necesitas más tiempo en México o Estados Unidos, te asistimos en la extensión de estadía. Nuestro equipo de expertos en inmigración te ayuda a prolongar tu permanencia de manera legal y sencilla. Confía en nosotros para asegurar una extensión sin inconvenientes.',
    features: ['Extensión de visa', 'Cambio de estatus', 'Evita penalidades'],
    color: 'from-purple-500 to-purple-700',
  },
  {
    id: 'proceso_adopcion_internacional',
    icon: Heart,
    title: 'Proceso de Adopción Internacional',
    subtitle: 'Uniendo Familias',
    description: 'Facilitamos el Proceso de Adopción Internacional para familias que buscan consolidar sus familias a nivel global. Nuestro equipo de abogados de inmigración se compromete a guiarte a través de los requisitos legales y burocráticos, trabajando para hacer realidad tu sueño de paternidad a través de la adopción internacional.',
    features: ['Adopción de menores', 'Asesoría legal', 'Cumplimiento de leyes'],
    color: 'from-pink-500 to-pink-700',
  },
  {
    id: 'reunificacion_familiar',
    icon: UserPlus,
    title: 'Reunificación Familiar',
    subtitle: 'Juntos de Nuevo',
    description: 'Entendemos la importancia de la unidad familiar. Nuestros servicios de Reunificación Familiar te ofrecen una consultoría experta para superar los obstáculos. También nos ocupamos de los trámites, permitiéndote construir y fortalecer los lazos familiares que son fundamentales para tu bienestar y felicidad.',
    features: ['Peticiones familiares', 'Visas para cónyuges', 'Hijos y padres'],
    color: 'from-orange-500 to-orange-700',
  },
  {
    id: 'proteccion_humanitaria_asilo',
    icon: Handshake,
    title: 'Protección Humanitaria y Asilo',
    subtitle: 'Santuario Seguro',
    description: 'Brindamos apoyo en Asuntos de Protección Humanitaria y Asilo para aquellos que buscan santuario seguro en Estados Unidos. Nuestro equipo de expertos legal está comprometido a proporcionar orientación experta, ayudándote a atravesar los procesos y salvaguardar tus derechos en busca de un refugio seguro.',
    features: ['Casos de asilo', 'Solicitudes de refugio', 'Protección humanitaria'],
    color: 'from-indigo-500 to-indigo-700',
  },
  {
    id: 'visas_u_victimas_crimenes',
    icon: LifeBuoy,
    title: 'Visas U para Víctimas de Crímenes',
    subtitle: 'Apoyo Integral',
    description: 'Ofrecemos un apoyo integral para obtener las Visas U para víctimas de Crímenes, diseñadas para aquellos que han sufrido perjuicios substanciales y han colaborado con las autoridades. Guiamos a las víctimas a lo largo de este proceso esencial, proporcionando asesoramiento especializado.',
    features: ['Elegibilidad de visa U', 'Asesoría legal', 'Apoyo a víctimas'],
    color: 'from-teal-500 to-teal-700',
  },
  {
    id: 'visas_tn',
    icon: Briefcase,
    title: 'Visas TN',
    subtitle: 'Oportunidades Laborales',
    description: 'La Visa TN es tu acceso directo a oportunidades laborales temporales en Estados Unidos. Diseñada para profesionales mexicanos y canadienses, facilitamos la integración en el mercado estadounidense, garantizando que tu talento encuentre el reconocimiento que merece.',
    features: ['Profesionales calificados', 'Proceso simplificado', 'Acceso al mercado laboral'],
    color: 'from-blue-500 to-blue-700',
  },
  {
    id: 'visas_l_transferencia_personal',
    icon: GitMerge,
    title: 'Visas L Transferencia de Personal',
    subtitle: 'Crecimiento Internacional',
    description: 'Las Visas L son la herramienta estratégica para transferir personal clave entre sucursales. Simplificamos el proceso de transferencia ejecutiva o gerencial, asegurando una transición fluida para tu personal y facilitando el crecimiento internacional de tu empresa.',
    features: ['Ejecutivos y gerentes', 'Empleados especializados', 'Empresas multinacionales'],
    color: 'from-cyan-500 to-cyan-700',
  },
  {
    id: 'visas_de_trabajo',
    icon: Hammer,
    title: 'Visas de Trabajo',
    subtitle: 'Futuro Profesional',
    description: 'Nuestros Visas de Trabajo están diseñadas para profesionales y empresas que buscan oportunidades laborales en Estados Unidos. Personalizamos soluciones que se adaptan a tus metas específicas, proporcionando una vía directa hacia nuevas perspectivas laborales y éxitos profesionales.',
    features: ['Visas H-1B', 'Visas O-1', 'Green Card basada en empleo'],
    color: 'from-gray-500 to-gray-700',
  },
  {
    id: 'residencia_permanente_green_card',
    icon: CreditCard,
    title: 'Residencia Permanente (Green Card)',
    subtitle: 'Tu Legado en EE.UU.',
    description: 'Asegura tu legado en Estados Unidos con el trámite de Residencia Permanente, también conocida como Green Card. En Tijuana, nuestros abogados de inmigración están aquí para simplificar el proceso y allanar el camino hacia la estabilidad migratoria.',
    features: ['Peticiones familiares', 'Inversión EB-5', 'Lotería de Visas'],
    color: 'from-emerald-500 to-emerald-700',
  },
  {
    id: 'naturalizacion_ciudadania',
    icon: Flag,
    title: 'Naturalización y Ciudadanía',
    subtitle: 'Sueño Americano',
    description: 'El proceso de Naturalización y Ciudadanía es lo más accesible con nuestros abogados de inmigración en Tijuana. Te acompañamos en cada etapa, allanando el camino para que consigas convertirte en ciudadano estadounidense. ¡Descubre cómo hacer realidad tu sueño de ciudadanía con nuestra orientación especializada!',
    features: ['Requisitos de elegibilidad', 'Examen de ciudadanía', 'Ceremonia de naturalización'],
    color: 'from-red-500 to-red-700',
  },
  {
    id: 'renovacion_visas_residencias',
    icon: RefreshCw,
    title: 'Renovación de Visas y Residencias',
    subtitle: 'Estancia Continua',
    description: 'En Tijuana, facilitamos la modificación familiar a través del trámite de Residencia Permanente para Familiares de Ciudadanos Americanos. Nuestro equipo de Abogados de Inmigración te guiará durante esta fase, brindándote una ruta clara para que puedas afianzar a tus seres queridos en Estados Unidos.',
    features: ['Renovación de Green Card', 'Extensión de visas', 'Actualización de datos'],
    color: 'from-yellow-500 to-yellow-700',
  },
  {
    id: 'residencia_permanente_familiares_ciudadanos',
    icon: UserPlus,
    title: 'Residencia Permanente para Familiares de Ciudadanos Americanos',
    subtitle: 'Reunificación Familiar',
    description: 'En Tijuana, facilitamos la modificación familiar a través del trámite de Residencia Permanente para Familiares de Ciudadanos Americanos. Nuestro equipo de Abogados de Inmigración te guiará durante esta fase, brindándote una ruta clara para que puedas afianzar a tus seres queridos en Estados Unidos.',
    features: ['Peticiones para cónyuges', 'Hijos y padres', 'Proceso consular'],
    color: 'from-orange-500 to-orange-700',
  },
  {
    id: 'residencia_permanente_familiares_residentes',
    icon: Users,
    title: 'Residencia Permanente para Familiares de Residentes Legales',
    subtitle: 'Conecta con tus Seres Queridos',
    description: 'Con nuestro servicio de Residencia Permanente para Familiares de Residentes Legales, te conectamos con tus seres queridos sin obstáculos ni retrasos. Desde el inicio facilitamos este proceso, permitiéndote construir un futuro sólido junto a tus seres queridos en Estados Unidos.',
    features: ['Peticiones I-130', 'Ajuste de estatus', 'Visas de inmigrante'],
    color: 'from-purple-500 to-purple-700',
  },
  {
    id: 'peticion_familiares_extranjeros',
    icon: Users,
    title: 'Petición de Familiares Extranjeros',
    subtitle: 'Trae a tu Familia',
    description: 'Facilitamos la reunificación familiar a través de nuestro asesoría, en la Petición de Familiares Extranjeros. Nuestro equipo de expertos en la práctica está dedicado a la guía en el proceso de peticiones familiares para permitir que tus seres queridos se unan a ti en las fronteras de Estados Unidos.',
    features: ['Peticiones de visa', 'Acompañamiento legal', 'Reunificación familiar'],
    color: 'from-teal-500 to-teal-700',
  },
  {
    id: 'visas_e_inversionista_comerciante',
    icon: DollarSign,
    title: 'Visas E de Inversionista y Comerciante',
    subtitle: 'Éxito Empresarial',
    description: 'Las Visas E de Inversionista y Comerciante son ideales para empresas con visión estratégica. Si estás listo para contribuir al crecimiento económico de Estados Unidos mediante inversiones y actividades comerciales, estas visas son tu pasaporte. Facilitamos tu entrada al mercado estadounidense, ofreciéndote una ruta clara hacia el establecimiento y la prosperidad empresarial.',
    features: ['Negocios internacionales', 'Inversión extranjera', 'Expansión de mercado'],
    color: 'from-green-500 to-green-700',
  },
  {
    id: 'visas_inversionista',
    icon: TrendingUp,
    title: 'Visas de Inversionista',
    subtitle: 'Crecimiento Económico',
    description: 'Si buscas establecer tu presencia en Estados Unidos a través de inversiones estratégicas, nuestras Visas de Inversionista son tu mejor opción. Simplificamos el proceso, brindándote soluciones personalizadas para que puedas contratar o hacer crecer tu negocio y generar impactos económicos.',
    features: ['Visas EB-5', 'Inversión en negocios', 'Creación de empleo'],
    color: 'from-blue-500 to-blue-700',
  },
  {
    id: 'renovacion_visas_inversionista',
    icon: RefreshCw,
    title: 'Renovación de Visas de Inversionista',
    subtitle: 'Mantén tu Estatus',
    description: 'La Renovación de Visas de Inversionista es un servicio integral que brinda asistencia a aquellos que ya han obtenido el estatus de inversionista y buscan mantenerlo durante periodos adicionales. Nos comprometemos a guiar a nuestros clientes a través de este proceso crucial, evaluando la elegibilidad, preparando la documentación necesaria y proporcionando asesoramiento personalizado.',
    features: ['Extensión de visas', 'Cumplimiento de requisitos', 'Asesoría continua'],
    color: 'from-indigo-500 to-indigo-700',
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
          transition={{ duration: 0.6 }}>

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
          {services.map((service, index) =>
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.15 }} className="bg-zinc-100 p-8 rounded-3xl group relative border-emerald-200 border hover:shadow-xl transition-all duration-500">


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
                {service.features.map((feature, idx) =>
              <li key={idx} className="flex items-center gap-2 text-sm text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    {feature}
                  </li>
              )}
              </ul>

              {/* Arrow */}
              <div className="flex items-center gap-2 text-slate-900 font-medium group-hover:gap-3 transition-all">
                <span>Saber más</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>);

}