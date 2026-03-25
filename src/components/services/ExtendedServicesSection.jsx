import { motion } from "framer-motion";

const services = [
  {
    id: 1,
    title: "Individual Therapy",
    description:
      "Tailored guidance crafted to meet your unique needs and goals effectively.",
    image: "/images/home/service-individual.jpg",
    icon: "/images/home/icon-indivdual.png",
  },
  {
    id: 2,
    title: "Group Counseling",
    description:
      "Professional support designed to guide emotional well-being every single day.",
    image: "/images/home/service-group.jpg",
    icon: "/images/home/icon-group.png",
  },
  {
    id: 3,
    title: "Stress Management",
    description:
      "Empowering digital resources to build healthy habits independently.",
    image: "/images/home/service-stress.jpg",
    icon: "/images/home/icon-stress.png",
  },
   {
    id: 4,
    title: "Mindfullness & Meditation Classes",
    description:
      "Empowering digital resources to build healthy habits indepedently",
    image: "/images/home/mindfullness.jpg",
    icon: "/images/home/icon-indivdual.png",
  },
  {
    id: 5,
    title: "Career & Life Coaching",
    description:
      "Professional support designed to guide emotional well-being every single day.",
    image: "/images/home/career-coaching.jpg",
    icon: "/images/home/icon-group.png",
  },
  {
    id: 6,
    title: "Crisis Support Services",
    description:
      "Tailored guidance crafted to meet your unique needs and goals effectively.",
    image: "/images/home/service-stress.jpg",
    icon: "/images/home/icon-group.png",
  },
];

export default function ExtendedServicesSection() {
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
          <p className="text-xs font-bold tracking-[0.18em] uppercase text-[#6B7FD4] mb-2">
            Our Services
          </p>
          <h2 className="text-4xl font-extrabold text-[#1E2A4A]">
            Breaking Stigmas, Building Strength
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

        {/* Bottom row over image: icon left, Read More right */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
          {/* Icon circle */}
          <div className="flex items-center justify-center shadow-lg">
            <img
              src={service.icon}
              alt=""
              className="w-12 h-12 object-contain"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "block";
              }}
            />
            {/* Fallback icon */}
            {/* <svg
              style={{ display: "none" }}
              className="w-6 h-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg> */}
          </div>

          {/* Read More pill */}
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="bg-[#1E2A4A] text-white text-xs font-semibold px-5 py-2 rounded-full shadow-lg"
          >
            Read More
          </motion.a>
        </div>
      </div>

      {/* Text area */}
      <div className="px-5 pt-5 pb-6 flex flex-col gap-3">
        {/* Title */}
        <h3 className="text-xl font-extrabold text-[#1E2A4A]">
          {service.title}
        </h3>

        {/* Thin divider */}
        <div className="w-full h-px bg-[#6B7FD4]/30" />

        {/* Description */}
        <p className="text-sm text-gray-500 leading-relaxed">
          {service.description}
        </p>
      </div>
    </motion.div>
  );
}