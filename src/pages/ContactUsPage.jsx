import PageHero from "../components/common/Hero";
import ContactPageSection from "../components/contact/ContactPageSection";


export default function ContactPage() {
  return (
    <main>
      <PageHero
        title="Contact Us"
        breadcrumbs={[
          { label: "Homepage", href: "/" },
          { label: "Contact Us" },
        ]}
      />
      <ContactPageSection />
      
      {/* Add future sections below as you build them */}
    </main>
  );
}