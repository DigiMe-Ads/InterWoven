import { motion } from "framer-motion";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: "easeOut", delay },
});

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden flex items-end"
      style={{
        background:
          "linear-gradient(120deg, #b8c6ef 0%, #c5cff5 30%, #c8c6f0 55%, #d4c2f0 75%, #e0c8f5 100%)",
      }}
    >
      {/* Decorative curved arc lines — right side, hidden on mobile */}
      <svg
        className="hidden md:block absolute right-0 top-0 h-full w-1/2 pointer-events-none opacity-30"
        viewBox="0 0 500 800"
        preserveAspectRatio="xMaxYMid meet"
        fill="none"
      >
        <path d="M500 0 Q300 400 500 800" stroke="white" strokeWidth="1" />
        <path d="M540 0 Q340 400 540 800" stroke="white" strokeWidth="1" />
        <path d="M460 0 Q260 400 460 800" stroke="white" strokeWidth="1" />
        <path d="M420 0 Q220 400 420 800" stroke="white" strokeWidth="1" />
        <path d="M380 0 Q180 400 380 800" stroke="white" strokeWidth="1" />
      </svg>

      {/* Floating dots — hidden on mobile */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="hidden md:block absolute right-[22%] top-[22%] w-4 h-4 rounded-full bg-white/40"
      />
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="hidden md:block absolute right-[8%] bottom-[35%] w-6 h-6 rounded-full border border-white/40"
      />
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="hidden md:block absolute right-[14%] top-[60%] w-3 h-3 rounded-full bg-white/30"
      />

      {/* Main layout */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-24 pb-0 flex flex-col md:flex-row md:items-end h-full overflow-hidden">

        {/* LEFT: Text content */}
        <div className="w-full md:w-1/2 pb-8 md:pb-20 space-y-5 text-center md:text-left">

          {/* Call us badge — mobile only, shown above heading */}
          <motion.div
            {...fadeUp(0.1)}
            className="flex md:hidden justify-center"
          >
            <div className="flex items-center gap-3 bg-[#3D4F8F] text-white pl-2 pr-5 py-2 rounded-full shadow-xl">
              <div className="w-9 h-9 rounded-full bg-[#6B7FD4] flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div className="leading-tight">
                <p className="text-[10px] opacity-70 tracking-wide">Call us anytime</p>
                <p className="text-sm font-bold tracking-wide">(555) 123-4567</p>
              </div>
            </div>
          </motion.div>

          {/* Eyebrow */}
          <motion.p
            {...fadeUp(0.15)}
            className="text-xs font-semibold tracking-[0.18em] uppercase text-white/80"
          >
            Find Balance, Embrace Life
          </motion.p>

          {/* Headline */}
          <motion.h1
            {...fadeUp(0.2)}
            className="text-4xl sm:text-5xl lg:text-[3.4rem] font-bold leading-tight"
          >
            <span className="text-white">Caring for Your</span>
            <br />
            <span className="text-[#3D4F8F] font-extrabold">Inner</span>
            <span className="text-white font-bold"> Peace</span>
          </motion.h1>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-48 h-px bg-white/50 origin-left mx-auto md:mx-0"
          />

          {/* Body */}
          <motion.p
            {...fadeUp(0.35)}
            className="text-sm text-white/80 leading-relaxed max-w-xs mx-auto md:mx-0"
          >
            Discover clarity, confidence, and emotional wellness through guided
            support that helps you manage stress, heal from within, and grow
            stronger in every aspect of your mental health journey.
          </motion.p>

          {/* CTAs */}
          <motion.div
            {...fadeUp(0.45)}
            className="flex items-center gap-4 pt-2 justify-center md:justify-start"
          >
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04, boxShadow: "0 8px 28px rgba(61,79,143,0.4)" }}
              whileTap={{ scale: 0.97 }}
              className="bg-[#3D4F8F] text-white text-sm font-semibold px-7 py-3.5 rounded-full shadow-lg"
            >
              Start A Checkup Now
            </motion.a>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-11 h-11 rounded-full bg-[#3D4F8F] flex items-center justify-center shadow-lg"
            >
              <svg className="w-4 h-4 text-white ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </motion.button>
          </motion.div>

          {/* Rating badge — mobile only, shown below CTAs */}
          <motion.div
            {...fadeUp(0.55)}
            className="flex md:hidden justify-center pt-2"
          >
            <div className="bg-[#4A6741] text-white px-6 py-3 rounded-2xl shadow-lg text-center inline-block">
              <p className="text-xl font-bold leading-none">4.9 /5</p>
              <p className="text-[10px] opacity-80 mt-1 tracking-wide">Review on Google</p>
            </div>
          </motion.div>
        </div>

        {/* RIGHT: Hero image + badges — desktop layout */}
        <div className="w-full md:w-1/2 relative flex justify-center items-end self-end">

          {/* Call us badge — desktop only */}
          <motion.div
            initial={{ opacity: 0, y: -20, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="hidden md:flex absolute top-6 right-0 z-30"
          >
            <div className="flex items-center gap-3 bg-[#3D4F8F] text-white pl-2 pr-5 py-2 rounded-full shadow-xl">
              <div className="w-10 h-10 rounded-full bg-[#6B7FD4] flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div className="leading-tight">
                <p className="text-[10px] opacity-70 tracking-wide">Call us anytime</p>
                <p className="text-sm font-bold tracking-wide">(555) 123-4567</p>
              </div>
            </div>
          </motion.div>

          {/* Rating badge — desktop only */}
          <motion.div
            initial={{ opacity: 0, x: -20, scale: 0.85 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="hidden md:block absolute left-4 top-[45%] z-30"
          >
            <div className="bg-[#4A6741] text-white px-4 py-3 rounded-2xl shadow-lg text-center">
              <p className="text-xl font-bold leading-none">4.9 /5</p>
              <p className="text-[10px] opacity-80 mt-1 tracking-wide">Review on Google</p>
            </div>
          </motion.div>

          {/* Hero image */}
          <motion.img
            src="/images/home/hero.png"
            alt="Therapist"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="relative z-20 w-full object-contain block"
            style={{ maxWidth: 500, height: "82vh", objectPosition: "bottom", objectFit: "contain" }}
          />
        </div>
      </div>
    </section>
  );
}