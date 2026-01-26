import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, Shield, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HeroSection({ onScrollToForm }) {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Golden Accent Line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500" />

      {/* Top Bar */}
      <div className="relative z-10 bg-slate-900/80 backdrop-blur-sm border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-sm">
            <div className="flex items-center gap-2 text-amber-400 font-medium">
              <Shield className="w-4 h-4" />
              <span>Abogados de Inmigración en Tijuana</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 text-slate-300">
              <a href="tel:+526643207699" className="flex items-center gap-2 hover:text-amber-400 transition-colors">
                <Phone className="w-4 h-4" />
                <span>+52 664 320 7699</span>
              </a>
              <div className="hidden sm:flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Edificio Centura, Tijuana B.C.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
              <span className="text-amber-400 text-sm font-medium">Más de 1,000 casos de éxito</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Soluciones
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-300">
                Migratorias
              </span>
              <span className="block text-3xl sm:text-4xl lg:text-5xl mt-2 text-slate-300 font-light">
                a su alcance
              </span>
            </h1>

            <p className="text-lg text-slate-400 mb-8 max-w-xl leading-relaxed">
              Expertos en Green Card, Ajuste de Estatus y Defensa Criminal. 
              Agenda tu consulta con el <strong className="text-white">Lic. Marcelo Zúñiga</strong> y 
              da el primer paso hacia tu futuro en Estados Unidos.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button 
                onClick={onScrollToForm}
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 font-semibold px-8 py-6 text-lg rounded-xl shadow-lg shadow-amber-500/25 transition-all hover:shadow-amber-500/40"
              >
                Agendar Consulta
              </Button>
              <a 
                href="https://wa.me/526643207699?text=Hola,%20me%20gustaría%20agendar%20una%20consulta%20migratoria"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button 
                  variant="outline"
                  className="border-2 border-slate-600 text-white hover:bg-slate-800 px-8 py-6 text-lg rounded-xl w-full"
                >
                  WhatsApp
                </Button>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center">
                  <span className="text-amber-400 font-bold text-xs">20+</span>
                </div>
                <span>Años de experiencia</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center">
                  <span className="text-amber-400 font-bold text-xs">US</span>
                </div>
                <span>México y EE.UU.</span>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-amber-500/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-4 -left-4 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl" />
              
              {/* Main Image Container */}
              <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-2 shadow-2xl">
                <img 
                  src="https://corpzuniga.com/wp-content/uploads/2025/10/Lic.-Marcelo-Zuniga-CorpZuniga_Tijuana.png"
                  alt="Lic. Marcelo Zúñiga - Abogado de Inmigración"
                  className="w-full h-auto rounded-2xl"
                />
                
                {/* Floating Card */}
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-slate-900 font-bold">Miembro AILA</p>
                      <p className="text-slate-500 text-sm">Asociación Americana</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <button onClick={onScrollToForm} className="text-slate-500 hover:text-amber-400 transition-colors">
            <ArrowDown className="w-6 h-6" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}