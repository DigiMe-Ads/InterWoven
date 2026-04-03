import { motion } from "framer-motion";

const features = [
  {
    id: 1,
    title: "Personalized\nWellness Plans",
    description:
      "Tailored guidance crafted to meet your unique needs and goals effectively.",
    bg: "#6B8A62",        // green
    iconSrc: "/images/home/wellness.png",
  },
  {
    id: 2,
    title: "Expert-Led\nCounseling Sessions",
    description:
      "Professional support designed to guide emotional well-being every single day.",
    bg: "#9E4D6B",        // dark pink/maroon
    iconSrc: "/images/home/councelling.png",
  },
  {
    id: 3,
    title: "24/7 Support\nCommunity",
    description:
      "Always-connected space offering care, encouragement, and shared growth.",
    bg: "#6B7DC2",        // medium blue
    iconSrc: "/images/home/support.png",
  },
  {
    id: 4,
    title: "Interactive\nSelf-Care Tools",
    description:
      "Empowering digital resources to build healthy habits independently.",
    bg: "#66b2b2",        // deeper blue
    iconSrc: "/images/home/tools.png",
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-white py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, i) => (
            <FeatureCard key={feature.id} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className="rounded-2xl p-5 flex flex-col gap-4 min-h-[170px]"
      style={{ backgroundColor: feature.bg,}}
    >
      {/* Top row: icon + title */}
      <div className="flex items-start gap-3">
        {/* Icon circle */}
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
          <img
            src={feature.iconSrc}
            alt={feature.title}
            className="w-5 h-5 object-contain"
            onError={(e) => {
              // Fallback SVG placeholder if icon not found
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "block";
            }}
          />
          {/* Fallback icon */}
          <svg
            style={{ display: "none" }}
            className="w-5 h-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
            />
          </svg>
        </div>

        {/* Title */}
        <p className="text-white text-sm font-bold leading-snug whitespace-pre-line">
          {feature.title}
        </p>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-white/20" />

      {/* Description */}
      <p className="text-white/85 text-xs leading-relaxed">
        {feature.description}
      </p>
    </motion.div>
  );
}