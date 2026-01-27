import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Star, Quote, Award } from 'lucide-react';

const serviceLabels = {
  green_card: 'Residencia Permanente',
  ajuste_estatus: 'Ajuste de Estatus',
  defensa_criminal: 'Defensa Criminal',
  perdon_migratorio: 'Perdón Migratorio',
  ciudadania: 'Ciudadanía',
  visa: 'Visa',
  otro: 'Otro',
};

const StarRating = ({ rating }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-5 h-5 ${
            star <= rating
              ? 'fill-amber-400 text-amber-400'
              : 'fill-slate-200 text-slate-200'
          }`}
        />
      ))}
    </div>
  );
};

const TestimonialCard = ({ testimonial, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow relative"
    >
      {/* Quote Icon */}
      <div className="absolute top-6 right-6 opacity-10">
        <Quote className="w-16 h-16 text-amber-500" />
      </div>

      {/* Content */}
      <div className="relative">
        <StarRating rating={testimonial.rating} />
        
        <p className="text-slate-700 leading-relaxed mt-4 mb-6 text-lg">
          "{testimonial.testimonial_text}"
        </p>

        <div className="flex items-center justify-between pt-6 border-t border-slate-100">
          <div>
            <h4 className="font-semibold text-slate-900">{testimonial.client_name}</h4>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              {testimonial.service && (
                <span className="text-sm text-amber-600 font-medium">
                  {serviceLabels[testimonial.service] || testimonial.service}
                </span>
              )}
              {testimonial.location && (
                <>
                  <span className="text-slate-400">•</span>
                  <span className="text-sm text-slate-500">{testimonial.location}</span>
                </>
              )}
            </div>
          </div>
          {testimonial.is_featured && (
            <div className="flex-shrink-0">
              <Award className="w-5 h-5 text-amber-500" />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default function TestimonialsSection() {
  const { data: testimonials = [], isLoading } = useQuery({
    queryKey: ['testimonials'],
    queryFn: () => base44.entities.Testimonial.list('-rating', 50),
    initialData: [],
  });

  // Show featured testimonials first, then others
  const sortedTestimonials = [...testimonials].sort((a, b) => {
    if (a.is_featured && !b.is_featured) return -1;
    if (!a.is_featured && b.is_featured) return 1;
    return b.rating - a.rating;
  });

  const displayTestimonials = sortedTestimonials.slice(0, 6);

  if (!isLoading && displayTestimonials.length === 0) {
    return null;
  }

  // Calculate average rating
  const averageRating = testimonials.length > 0
    ? (testimonials.reduce((sum, t) => sum + (t.rating || 0), 0) / testimonials.length).toFixed(1)
    : 0;

  return (
    <section className="py-20 sm:py-28 bg-gradient-to-br from-slate-50 to-white">
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
            Testimonios
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-6">
            Miles de familias han confiado en nosotros para resolver sus casos migratorios
          </p>

          {/* Stats Bar */}
          {testimonials.length > 0 && (
            <div className="inline-flex items-center gap-6 bg-white rounded-2xl px-8 py-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-5 h-5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <span className="text-2xl font-bold text-slate-900">{averageRating}</span>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div className="text-left">
                <p className="text-2xl font-bold text-slate-900">{testimonials.length}+</p>
                <p className="text-sm text-slate-600">Clientes satisfechos</p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Testimonials Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-lg animate-pulse">
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <div key={s} className="w-5 h-5 bg-slate-200 rounded" />
                  ))}
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-slate-200 rounded w-full" />
                  <div className="h-4 bg-slate-200 rounded w-5/6" />
                  <div className="h-4 bg-slate-200 rounded w-4/6" />
                </div>
                <div className="mt-6 pt-6 border-t border-slate-100">
                  <div className="h-4 bg-slate-200 rounded w-1/2" />
                  <div className="h-3 bg-slate-200 rounded w-1/3 mt-2" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {displayTestimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                index={index}
              />
            ))}
          </div>
        )}

        {/* Google Reviews Link */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <a
            href="https://www.google.com/maps/place/Corporativo+Zu%C3%B1iga/@32.5136052,-117.0125967,17z/data=!4m8!3m7!1s0x80d9484764f04767:0xbe082fb14cf9386f!8m2!3d32.5136052!4d-117.0100218!9m1!1b1!16s%2Fg%2F11j5gb4ql_"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-amber-600 transition-colors font-medium"
          >
            <img 
              src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
              alt="Google"
              className="h-6"
            />
            <span>Ver más opiniones en Google Maps</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}