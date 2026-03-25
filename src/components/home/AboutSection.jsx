import { motion } from "framer-motion";

const checkItems = [
  "Free Consultation",
  "Mental Satisfaction",
  "Emergency Service",
  "Psychologists Services",
];

export default function AboutSection() {
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
          {/* Main large image */}
          <div className="rounded-3xl overflow-hidden w-full" style={{ maxWidth: 420 }}>
            <img
              src="/images/home/about-main.jpg"
              alt="Therapy session"
              className="w-full h-full object-cover"
              style={{ minHeight: 600 }}
            />
          </div>

          {/* Small circular image — top left overlapping */}
          <div
            className="absolute -top-6 -left-6 w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-xl"
          >
            <img
              src="/images/home/about-circle.jpg"
              alt="Therapist"
              className="w-full h-full object-cover"
            />
          </div>

          {/* 10+ Years badge — bottom right overlapping */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="absolute bottom-0 right-0 bg-[#4A6741] text-white px-6 py-4 rounded-2xl shadow-lg text-center"
          >
            <p className="text-3xl font-extrabold leading-none">10+ Years</p>
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
          {/* Eyebrow */}
          <p className="text-xs font-extrabold uppercase text-[#6B7FD4]">
            About Us
          </p>

          {/* Heading */}
          <h2 className="text-4xl font-extrabold text-[#1E2A4A] leading-tight">
            Your Journey To Mental <br /> Wellness Starts Here
          </h2>

          {/* Body paragraph */}
          <p className="text-sm text-gray-500 leading-relaxed max-w-lg">
            Every small step toward better mental health is a significant achievement in our
            lives. With the right support, each individual can find the strength to face challenges,
            manage stress, and build positive habits. We believe that everyone deserves the
            opportunity to grow, thrive, and experience inner peace. Through an empathetic and
            professional approach, we are here to help you discover the best solutions for
            lasting mental and emotional well-being.
          </p>

          {/* Check items — 2 column grid */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 pt-1">
            {checkItems.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                className="flex items-center gap-2"
              >
                {/* Checkmark circle */}
                <div className="w-5 h-5 rounded-full bg-[#4A5DAA] flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm font-extrabold text-[#1E2A4A]">{item}</span>
              </motion.div>
            ))}
          </div>

          {/* Quote */}
          <p className="text-sm font-bold italic text-[#1E2A4A] leading-snug max-w-md pt-1">
            Healing doesn't mean the damage never existed; it means the
            strength to rise is greater than the pain
          </p>

          {/* Signature + Read More */}
          <div className="flex items-center gap-6 pt-2">
            {/* Handwritten signature image */}
            <img
              src="/images/home/about-signature.png"
              alt="Signature"
              className="h-20 w-auto object-contain opacity-80"
              onError={(e) => {
                e.target.style.display = "none";
              }}
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