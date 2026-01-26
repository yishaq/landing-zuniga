import React from 'react';
import { motion } from 'framer-motion';
import { Award, BookOpen, Globe, Users, CheckCircle } from 'lucide-react';

const credentials = [
  { icon: Award, label: 'Miembro AILA', desc: 'Asociación Americana de Abogados de Inmigración' },
  { icon: Globe, label: 'Bilingüe', desc: 'Servicio en Español e Inglés' },
  { icon: BookOpen, label: '20+ Años', desc: 'De experiencia legal' },
  { icon: Users, label: '1,000+', desc: 'Casos exitosos' },
];

const achievements = [
  'Nativo de San Diego, California',
  'Especialista en zona fronteriza San Diego-Tijuana',
  'Precedentes legales en cortes migratorias y criminales',
  'Tradición familiar de abogados y jueces',
  'Atención personalizada en México y Estados Unidos',
];

export default function AttorneySection() {
  return (
    <section className="py-20 sm:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative">
              {/* Background Decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#003E65]/30 to-[#003E65]/10 rounded-3xl transform rotate-3" />
              
              {/* Image Container */}
              <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://corpzuniga.com/wp-content/uploads/2025/10/Lic.-Marcelo-Zuniga-CorpZuniga_Tijuana.png"
                  alt="Lic. Marcelo Zúñiga"
                  className="w-full h-auto"
                />
              </div>

              {/* Stats Card */}
              <div className="absolute -bottom-6 -right-6 bg-[#000000] text-white rounded-2xl p-6 shadow-xl">
                <div className="text-center">
                  <p className="text-4xl font-bold text-[#003E65]">20+</p>
                  <p className="text-sm text-[#9C9C9C]">Años de<br />Experiencia</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block text-[#003E65] font-semibold text-sm tracking-wider uppercase mb-4">
              Tu Abogado
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#000000] mb-2">
              Lic. Marcelo Zúñiga
            </h2>
            <p className="text-xl text-[#003E65] font-medium mb-6">
              Corporativo Zúñiga
            </p>

            <p className="text-lg text-[#9C9C9C] mb-6 leading-relaxed">
              Nací en San Diego, California y siempre me he radicado en el área fronteriza San Diego-Tijuana. 
              Entiendo perfectamente la problemática del ámbito migratorio y me apasiona luchar por los ideales 
              y las necesidades de las personas que más lo necesitan.
            </p>

            <p className="text-[#9C9C9C] mb-8 leading-relaxed">
              Mi linaje me ha permitido tener una óptica legal más enfocada durante toda mi vida: 
              mi abuelo fue Juez y mi padre abogado internacional. Confiar un caso legal a un abogado 
              es poner la vida de una familia en una sola persona, y esa responsabilidad la llevo 
              arraigada hasta lo más profundo de mi ser.
            </p>

            {/* Achievements */}
            <div className="space-y-3 mb-8">
              {achievements.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#003E65] flex-shrink-0 mt-0.5" />
                  <span className="text-[#000000]">{item}</span>
                </div>
              ))}
            </div>

            {/* Credentials Grid */}
            <div className="grid grid-cols-2 gap-4">
              {credentials.map((cred, idx) => (
                <div key={idx} className="bg-white rounded-xl p-4 border border-[#003E65]/20">
                  <cred.icon className="w-6 h-6 text-[#003E65] mb-2" />
                  <p className="font-semibold text-[#000000]">{cred.label}</p>
                  <p className="text-sm text-[#9C9C9C]">{cred.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}