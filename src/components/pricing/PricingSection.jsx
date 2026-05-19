import { motion } from "framer-motion";
import { useContent } from "../../hooks/useContent";

function PricingCard({ plan, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: index * 0.12, ease: "easeOut" }}
      className={`relative flex flex-col rounded-2xl overflow-visible
        ${plan.featured ? "shadow-2xl shadow-[#3D52B0]/30 scale-105 z-10" : "border border-gray-100 shadow-sm"}`}
      style={plan.featured
        ? { background: "linear-gradient(160deg, #4A5DAA 0%, #2D3D7A 50%, #3D6B41 100%)" }
        : { backgroundColor: "#ffffff" }}
    >
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
          <div className="text-white text-xs font-bold px-6 py-2 rounded-t-xl whitespace-nowrap" style={{ backgroundColor: "#43559e" }}>
            Most Popular
          </div>
        </div>
      )}

      <div className="flex flex-col flex-1 p-7 pt-10 gap-4">
        <h3 className={`text-xl font-extrabold ${plan.featured ? "text-white" : "text-[#1E2A4A]"}`}>
          {plan.name}
        </h3>

        <div className="flex items-end gap-1">
          <span className={`text-5xl font-extrabold leading-none ${plan.featured ? "text-white" : "text-[#1E2A4A]"}`}>
            {plan.price}
          </span>
          <span className={`text-base font-medium mb-1 ${plan.featured ? "text-white/70" : "text-gray-400"}`}>
            {plan.period}
          </span>
        </div>

        <p className={`text-sm leading-relaxed ${plan.featured ? "text-white/75" : "text-gray-400"}`}>
          {plan.description}
        </p>

        <div className={`w-full h-px ${plan.featured ? "bg-white/20" : "bg-gray-100"}`} />

        <div className="flex flex-col gap-3 flex-1">
          <p className={`text-sm font-bold ${plan.featured ? "text-white" : "text-[#1E2A4A]"}`}>
            What We Offer ?
          </p>
          <ul className="space-y-2.5">
            {plan.features.filter(Boolean).map((feature, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${plan.featured ? "bg-white/20" : "bg-[#E8EBFA]"}`}>
                  <svg className={`w-3 h-3 ${plan.featured ? "text-white" : "text-[#4A5DAA]"}`} fill="currentColor" viewBox="0 0 20 20">
                    <circle cx="10" cy="10" r="4" />
                  </svg>
                </div>
                <span className={`text-sm leading-snug ${plan.featured ? "text-white/85" : "text-gray-500"}`}>
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <motion.a href="#contact" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          className={`mt-4 w-full py-3.5 rounded-xl text-sm font-bold text-center transition-colors shadow-md ${
            plan.featured ? "bg-white text-[#2D3D7A] hover:bg-gray-100" : "bg-[#2D3D7A] text-white hover:bg-[#1E2A4A]"
          }`}
        >
          Select Plan
        </motion.a>
      </div>
    </motion.div>
  );
}

export default function PricingSection() {
  const { content } = useContent("pricingPage");

  const plans = [
    {
      id: 1,
      name:        content.plan1Name,
      price:       content.plan1Price,
      period:      content.plan1Period,
      description: content.plan1Desc,
      features:    [content.plan1f1, content.plan1f2, content.plan1f3, content.plan1f4],
      popular: false, featured: false,
    },
    {
      id: 2,
      name:        content.plan2Name,
      price:       content.plan2Price,
      period:      content.plan2Period,
      description: content.plan2Desc,
      features:    [content.plan2f1, content.plan2f2, content.plan2f3, content.plan2f4],
      popular: true, featured: true,
    },
    {
      id: 3,
      name:        content.plan3Name,
      price:       content.plan3Price,
      period:      content.plan3Period,
      description: content.plan3Desc,
      features:    [content.plan3f1, content.plan3f2, content.plan3f3, content.plan3f4, content.plan3f5],
      popular: false, featured: false,
    },
  ];

  return (
    <section id="pricing" className="bg-white py-20 px-6">
      <div className="max-w-5xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-bold tracking-[0.18em] uppercase text-[#6B7FD4] mb-2">
            {content.eyebrow}
          </p>
          <h2 className="text-4xl font-extrabold text-[#1E2A4A] leading-tight">
            {content.heading}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start mt-6">
          {plans.map((plan, i) => (
            <PricingCard key={plan.id} plan={plan} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}