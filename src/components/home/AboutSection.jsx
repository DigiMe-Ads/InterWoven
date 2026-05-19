import { motion } from "framer-motion";
import { useContent } from "../../hooks/useContent";

export default function AboutSection() {
  const { content } = useContent("about");

  const checkItems = [
    content.check1,
    content.check2,
    content.check3,
    content.check4,
  ].filter(Boolean);

  return (
    <section id="about" className="bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* LEFT: Images */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative"
        >
          <div className="rounded-3xl overflow-hidden w-full" style={{ maxWidth: 420 }}>
            <img
              src="/images/home/about-main.jpg"
              alt="Therapy session"
              className="w-full h-full object-cover"
              style={{ minHeight: 600 }}
            />
          </div>

          <div className="absolute -top-6 -left-6 w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-xl">
            <img
              src="/images/home/about-circle.jpg"
              alt="Therapist"
              className="w-full h-full object-cover"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="absolute bottom-0 right-0 bg-[#4A6741] text-white px-6 py-4 rounded-2xl shadow-lg text-center"
          >
            <p className="text-3xl font-extrabold leading-none">{content.experience}</p>
            <p className="text-sm font-medium opacity-90 mt-1">Of Experience</p>
          </motion.div>
        </motion.div>

        {/* RIGHT: Text content */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          className="space-y-5"
        >
          <p className="text-xs font-extrabold uppercase text-[#6B7FD4]">
            {content.eyebrow}
          </p>

          <h2 className="text-4xl font-extrabold text-[#1E2A4A] leading-tight">
            {content.heading}
          </h2>

          <p className="text-sm text-gray-500 leading-relaxed max-w-lg">
            {content.body}
          </p>

          <div className="grid grid-cols-2 gap-x-6 gap-y-3 pt-1">
            {checkItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                className="flex items-center gap-2"
              >
                <div className="w-5 h-5 rounded-full bg-[#4A5DAA] flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm font-extrabold text-[#1E2A4A]">{item}</span>
              </motion.div>
            ))}
          </div>

          <p className="text-sm font-bold italic text-[#1E2A4A] leading-snug max-w-md pt-1">
            {content.quote}
          </p>

          <div className="flex items-center gap-6 pt-2">
            <img
              src="/images/home/about-signature.png"
              alt="Signature"
              className="h-20 w-auto object-contain opacity-80"
              onError={(e) => { e.target.style.display = "none"; }}
            />
            <motion.a
              href="#services"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="bg-[#425CA9] text-white text-sm font-semibold px-7 py-3 rounded-full shadow-md hover:bg-[#425CA9] transition-colors"
            >
              Read More
            </motion.a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}