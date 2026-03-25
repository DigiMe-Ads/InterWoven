import HeroSection from "../components/home/HeroSection";

// Future sections will be imported here as you build them:
import PageHero from "../components/common/Hero";
import MentalHealthMattersSection from "../components/about/MentalHealthMattersSection";
import HowWeHelpAboutSection from "../components/about/HowWeHelpAboutSection";
import TherapistsSection from "../components/about/TherapistSection";
import TestimonialsSection from  "../components/home/TestimonialsSection";



export default function AboutPage() {
  return (
    <main>
      <PageHero
        title="About Us"
        breadcrumbs={[
          { label: "Homepage", href: "/" },
          { label: "About Us" },
        ]}
      />
        <MentalHealthMattersSection />
        <HowWeHelpAboutSection />
        <TherapistsSection />
        <TestimonialsSection />
        
    </main>
  );
}