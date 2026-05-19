import { motion } from "framer-motion";
import { useContent } from "../../hooks/useContent";

export default function HowWeHelpAboutSection() {
  const { content } = useContent("howWeHelpAbout");

  const steps = [
    { number: "01", title: content.step1Title, description: content.step1Desc },
    { number: "02", title: content.step2Title, description: content.step2Desc },
    { number: "03", title: content.step3Title, description: content.step3Desc },
  ];

  return (
    <section
      className="relative overflow-hidden py-16 px-6"
      style={{
        background: "linear-gradient(135deg, #b8c6ef 0%, #c5cff5 40%, #d4d8f8 70%, #e8eaf8 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="text-xs font-bold tracking-[0.18em] uppercase text-[#3D4F6B] mb-2">
              {content.eyebrow}
            </p>
            <h2 className="text-4xl font-extrabold text-[#1E2A4A] leading-tight">
              {content.heading}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            className="flex flex-col gap-4 lg:pt-6"
          >
            <p className="text-sm text-[#3D4F6B]/80 leading-relaxed max-w-sm">
              {content.body}
            </p>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="self-start bg-[#1E2A4A] text-white text-sm font-semibold px-7 py-3 rounded-full shadow-md hover:bg-[#3D4F8F] transition-colors"
            >
              {content.btnLabel}
            </motion.a>
          </motion.div>
        </div>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="w-full h-px bg-white/50 my-12 origin-left"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.12, ease: "easeOut" }}
              className="flex flex-col gap-2"
            >
              <span className="text-5xl font-extrabold leading-none" style={{ color: "rgba(107,127,212,0.45)" }}>
                {step.number}
              </span>
              <h3 className="text-xl font-bold text-[#1E2A4A] mt-1">{step.title}</h3>
              <p className="text-sm text-[#3D4F6B]/75 leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}