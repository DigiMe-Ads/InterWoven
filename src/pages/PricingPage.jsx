import PageHero from "../components/common/Hero";
import PricingSection from "../components/pricing/PricingSection";
import HowWeHelpSection from "../components/home/HowWeHelpSection";


export default function PricingPage() {
  return (
    <main>
      <PageHero
        title="Pricing"
        breadcrumbs={[
          { label: "Homepage", href: "/" },
          { label: "Pricing" },
        ]}
      />
      <PricingSection />
      <HowWeHelpSection/>

    </main>
  );
}