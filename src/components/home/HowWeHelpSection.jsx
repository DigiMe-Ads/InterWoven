import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Tell us about you",
    description:
      "Your wellness journey matters. We're dedicated to supporting both your mental clarity and emotional strength every step forward.",
  },
  {
    number: "02",
    title: "Get matched with the right expert",
    description:
      "From everyday stress to life's hardest moments, our team stands ready to support your healing and overall well-being.",
  },
  {
    number: "03",
    title: "Start your journey ",
    description:
      "Empowering you to live well with care that nurtures your body, mind, and emotional peace every single day.",
  },
];

export default function HowWeHelpSection() {
  return (
    <section
      className="relative overflow-hidden py-16 px-6"
      style={{
        background: "linear-gradient(135deg, rgba(122, 171, 138, 1) 0%, #FFFFFF 100%)",
      }}
    >
      {/* TOP PART: heading left, text+button right */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* Left: eyebrow + heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="text-xs font-extrabold tracking-[0.18em] uppercase text-[#2E2D2B] mb-2">
              How We Work ?
            </p>
            <h2 className="text-4xl font-extrabold text-[#ffffff] leading-tight">
              Here For Your <span className="font-extrabold text-[#2E2D2B]">Health</span>,
              <br />
              <span className="font-extrabold text-[#2E2D2B]">Here</span> For Your Heart
            </h2>
          </motion.div>

          {/* Right: description + button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            className="flex flex-col gap-4 lg:pt-6"
          >
            <p className="text-sm text-[#3D4F6B]/80 leading-relaxed max-w-sm">
              We offer compassionate care, combining physical and emotional
              support to help you thrive in every aspect.
            </p>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="self-start bg-[#2E2D2B] text-white text-sm font-semibold px-7 py-3 rounded-full shadow-md hover:bg-[#3D4F8F] transition-colors"
            >
              Get Consult Now
            </motion.a>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="w-full h-px bg-white/50 my-12 origin-left"
        />

        {/* BOTTOM: 3 step cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.12, ease: "easeOut" }}
              className="relative flex flex-col gap-3"
            >
              {/* Large faded number behind */}
              <span
                className="absolute -top-4 -left-1 text-7xl font-extrabold select-none pointer-events-none"
                style={{ color: "rgba(0, 76, 76,0.25)", lineHeight: 1 }}
              >
                {step.number}
              </span>

              {/* Title */}
              <h3 className="relative text-xl font-bold text-[#FFFFFF] pt-6">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-[#3D4F6B]/75 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}