import { motion } from "framer-motion";

const checkItems = [
  "Compassionate & Experienced Professionals",
  "Holistic Approach To Well-Being",
  "Safe & Supportive Environment",
];

const stats = [
  {
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    value: "100%",
    label: "Satisfaction",
    bg: "linear-gradient(160deg, #7B8FE4 0%, #5468C0 100%)",
  },
  {
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905a3.61 3.61 0 01-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
      </svg>
    ),
    value: "257+",
    label: "Happy Patient",
    bg: "linear-gradient(160deg, #6275D0 0%, #4055B0 100%)",
  },
  {
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
      </svg>
    ),
    value: "10+",
    label: "Expert Therapist",
    bg: "linear-gradient(160deg, #4A5BBF 0%, #2D3D96 100%)",
  },
];

export default function WhyChooseUsSection() {
  return (
    <section
      className="relative overflow-hidden py-20 px-6"
      style={{
        background: "linear-gradient(135deg, #3B67BFE5 0%, #FFFFFF 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-10">

        {/* LEFT: Text content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex-1 space-y-5"
        >
          <p className="text-xs font-extrabold tracking-[0.18em] uppercase text-[#3D4F6B]">
            Why Choose Us ?
          </p>

          <h2 className="text-4xl font-extrabold leading-tight text-[#fff]">
            Restoring{" "}
            <span className="text-[#425CA9]">Hope</span>, One
            <br />
            Day{" "}
            <span className="text-[#425CA9]">At A Time</span>
          </h2>

          <p className="text-sm text-[#fff]/80 leading-relaxed max-w-xs">
            Through consistent care and compassionate guidance, we help
            individuals rediscover strength, build resilience, and move forward
            toward a brighter, healthier future at their own pace.
          </p>

          <div className="space-y-3 pt-1">
            {checkItems.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="w-5 h-5 rounded-full bg-[#4A5DAA] flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm font-bold text-[#fff]">{item}</span>
              </motion.div>
            ))}
          </div>

          <motion.a
            href="#contact"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-block mt-2 bg-[#425CA9] text-white text-sm font-semibold px-7 py-3 rounded-full shadow-md hover:bg-[#1E2A4A] transition-colors"
          >
            Make An Appointment
          </motion.a>
        </motion.div>

        {/* MIDDLE: Photo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          className="flex-shrink-0"
        >
          <div className="rounded-3xl overflow-hidden shadow-xl" style={{ width: 450 }}>
            <img
              src="/images/home/why-chose-us.jpg"
              alt="Therapist at work"
              className="w-full object-cover"
              style={{ height: 450 }}
            />
          </div>
        </motion.div>

        {/* RIGHT: Stat cards — 3 stacked square cards */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.25 }}
          className="flex flex-row lg:flex-col gap-3 flex-shrink-0"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.35 + i * 0.12 }}
              className="flex flex-col items-center justify-center gap-2 rounded-2xl shadow-lg"
              style={{
                background: stat.bg,
                width: 120,
                height: 108,
              }}
            >
              {stat.icon}
              <p className="text-xl font-extrabold text-white leading-none">
                {stat.value}
              </p>
              <p className="text-xs text-white/80 text-center leading-tight">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}