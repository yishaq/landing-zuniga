import React, { useRef } from 'react';
import HeroSection from '@/components/landing/HeroSection';
import ServicesSection from '@/components/landing/ServicesSection';
import QuoteSection from '@/components/landing/QuoteSection';
import AttorneySection from '@/components/landing/AttorneySection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import AppointmentForm from '@/components/landing/AppointmentForm';
import FooterSection from '@/components/landing/FooterSection';

export default function Home() {
  const formRef = useRef(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen">
      <HeroSection onScrollToForm={scrollToForm} />
      <ServicesSection />
      <QuoteSection />
      <AttorneySection />
      <TestimonialsSection />
      <AppointmentForm formRef={formRef} />
      <FooterSection />
    </main>
  );
}