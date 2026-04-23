import { useState, useEffect } from "react";
import { getAllBookedSlots } from "../lib/bookingService";

import HeroSection from "../components/home/HeroSection";

// Future sections will be imported here as you build them:
import FeaturesSection from "../components/home/FeatureSection";
import AboutSection from "../components/home/AboutSection";
import HowWeHelpSection from "../components/home/HowWeHelpSection";
import ServicesSection from "../components/home/ServiceSection";
import WhyChooseUsSection from "../components/home/WhyChoseUsSection";
import TestimonialsSection from "../components/home/TestimonialsSection";
import ContactSection from "../components/home/ContactSection";


export default function HomePage() {

  const [bookedSlotsMap, setBookedSlotsMap] = useState({});
  const [loadingSlots,   setLoadingSlots]   = useState(true);
 
  useEffect(() => {
    getAllBookedSlots().then(map => {
      setBookedSlotsMap(map);
      setLoadingSlots(false);
    });
  }, []);
 
  // Called by either section after a successful booking
  const handleBookingConfirm = (date, time) => {
    setBookedSlotsMap(prev => ({
      ...prev,
      [date]: [...(prev[date] || []), time],
    }));
  };

  return (
    <main>
      <HeroSection
        bookedSlotsMap={bookedSlotsMap}
        loadingSlots={loadingSlots}
        onBookingConfirm={handleBookingConfirm}
      />
        <FeaturesSection />
        <AboutSection />
        <HowWeHelpSection />
        <ServicesSection />
        <WhyChooseUsSection />
        <TestimonialsSection />
        <ContactSection
        bookedSlotsMap={bookedSlotsMap}
        loading={loadingSlots}
        onBookingConfirm={handleBookingConfirm}
      />
      
      {/* Add future sections below as you build them */}
    </main>
  );
}