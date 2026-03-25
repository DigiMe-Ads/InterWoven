import { motion } from "framer-motion";

const bulletPoints = [
  "Prioritizing well-being helps you thrive emotionally, socially, and personally every day.",
  "Strong minds build strong lives; support and care create lasting peace.",
  "Inner peace starts with awareness, acceptance, and support when it's needed most.",
  "Emotional strength shapes how we live, connect, and move forward confidently.",
];

const services = [
  "Free Consultation",
  "Mental Satisfaction",
  "Emergency Service",
];

export default function MentalHealthMattersSection() {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-12 items-center">

        {/* LEFT: Image */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex-shrink-0"
        >
          <div className="rounded-3xl overflow-hidden shadow-md" style={{ width: 340 }}>
            <img
              src="/images/about/mental-health.jpg"
              alt="Therapy session"
              className="w-full object-cover"
              style={{ height: 380 }}
            />
          </div>
        </motion.div>

        {/* RIGHT: Text + blue card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-end"
        >
          {/* Text column */}
          <div className="space-y-5">
            {/* Eyebrow */}
            <p className="text-xs font-bold tracking-[0.18em] uppercase text-[#6B7FD4]">
              About Us
            </p>

            {/* Heading */}
            <h2 className="text-4xl font-extrabold text-[#1E2A4A] leading-tight">
              Because Your Mental<br />Health Matters
            </h2>

            {/* Bullet points */}
            <ul className="space-y-3 pt-1">
              {bulletPoints.map((point, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                  className="flex items-start gap-3"
                >
                  {/* Chevron icon */}
                  <svg
                    className="w-4 h-4 text-[#6B7FD4] flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  <span className="text-sm text-gray-500 leading-relaxed">{point}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Blue card */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.35 }}
            className="rounded-2xl p-6 flex flex-col gap-4 w-52 flex-shrink-0"
            style={{
              background: "linear-gradient(145deg, #5B6FD4 0%, #3D52B0 100%)",
            }}
          >
            <h3 className="text-base font-extrabold text-white leading-snug">
              Together, We overcome
            </h3>

            <div className="space-y-3 pt-1">
              {services.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-3 h-3 text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-sm text-white font-medium">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}