import HeroSection from "../components/home/HeroSection";

// Future sections will be imported here as you build them:
import PageHero from "../components/common/Hero";
import ExtendedServicesSection from "../components/services/ExtendedServicesSection";
import ContactSection from "../components/home/ContactSection";


export default function ServicesPage() {
  return (
    <main>
      <PageHero
        title="Services"
        breadcrumbs={[
          { label: "Homepage", href: "/" },
          { label: "Services" },
        ]}
      />
      <ExtendedServicesSection />
      <ContactSection/>
    </main>
  );
}