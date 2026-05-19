import { motion } from "framer-motion";
import { useContent } from "../../hooks/useContent";

// Image and icon paths stay hardcoded — not text content
const SERVICE_IMAGES = [
  { image: "/images/home/service-individual.jpg", icon: "/images/home/icon-indivdual.png" },
  { image: "/images/home/service-group.jpg",      icon: "/images/home/icon-group.png" },
  { image: "/images/home/service-stress.jpg",     icon: "/images/home/icon-stress.png" },
];

export default function ServicesSection() {
  const { content } = useContent("services");

  const services = [
    { id: 1, title: content.svc1Title, description: content.svc1Desc, ...SERVICE_IMAGES[0] },
    { id: 2, title: content.svc2Title, description: content.svc2Desc, ...SERVICE_IMAGES[1] },
    { id: 3, title: content.svc3Title, description: content.svc3Desc, ...SERVICE_IMAGES[2] },
  ];

  return (
    <section id="services" className="bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <p className="text-xs font-extrabold tracking-[0.18em] uppercase text-[#425CA9] mb-2">
            {content.eyebrow}
          </p>
          <h2 className="text-4xl font-extrabold text-[#191919]">
            {content.heading}
          </h2>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}

function ServiceCard({ service, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: index * 0.12, ease: "easeOut" }}
      className="rounded-3xl overflow-hidden flex flex-col"
      style={{ backgroundColor: "#F3EEF8" }}
    >
      {/* Image area */}
      <div className="relative">
        <img
          src={service.image}
          alt={service.title}
          className="w-full object-cover"
          style={{ height: 220 }}
        />

        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
          <div className="flex items-center justify-center shadow-lg">
            <img
              src={service.icon}
              alt=""
              className="w-12 h-12 object-contain"
              onError={(e) => { e.target.style.display = "none"; }}
            />
          </div>

          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="bg-[#212529] text-white text-xs font-semibold px-5 py-2 rounded-full shadow-lg"
          >
            Read More
          </motion.a>
        </div>
      </div>

      {/* Text area */}
      <div className="px-5 pt-5 pb-6 flex flex-col gap-3">
        <h3 className="text-xl font-extrabold text-[#212529]">
          {service.title}
        </h3>
        <div className="w-full h-px bg-[#212529]/30" />
        <p className="text-sm text-gray-500 leading-relaxed">
          {service.description}
        </p>
      </div>
    </motion.div>
  );
}