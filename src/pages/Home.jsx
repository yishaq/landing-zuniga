import React, { useRef } from 'react';
import HeroSection from '@/components/landing/HeroSection';
import ServicesSection from '@/components/landing/ServicesSection';
import AttorneySection from '@/components/landing/AttorneySection';
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
      <AttorneySection />
      <AppointmentForm formRef={formRef} />
      <FooterSection />
    </main>
  );
}