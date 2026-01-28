import React from 'react';
import ContactForm from '../components/ContactForm';

export default function ContactoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Contáctanos
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            ¿Necesitas asesoría legal en inmigración? Completa el formulario y nos pondremos en contacto contigo.
          </p>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}