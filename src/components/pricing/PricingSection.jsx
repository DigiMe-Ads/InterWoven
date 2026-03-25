import { motion } from "framer-motion";

const plans = [
  {
    id: 1,
    name: "Basic Plan",
    price: "$49",
    period: "/Month",
    description:
      "Creates a compassionate environment where healing begins with shared stories, emotional validation, and gentle guidance.",
    features: [
      "Access to group counseling sessions (twice a month)",
      "Unlimited access to self-help resources",
      "Weekly guided meditation and mindfulness exercises",
      "24/7 support via chat and email",
    ],
    popular: false,
    featured: false,
  },
  {
    id: 2,
    name: "Standard Plan",
    price: "$99",
    period: "/Month",
    description:
      "Strengthens inner stability by teaching coping skills, improving self-awareness, and fostering a supportive group dynamic.",
    features: [
      "Everything in Basic Plan",
      "One-on-one counseling session (once a month)",
      "Personalized mental wellness plan",
      "Priority response from mental health professionals",
    ],
    popular: true,
    featured: true,
  },
  {
    id: 3,
    name: "Premium Plan",
    price: "$149",
    period: "/Month",
    description:
      "Focuses on emotional recovery through trauma-informed care, building trust, and nurturing personal growth in a safe setting.",
    features: [
      "Everything in Standard Plan",
      "Weekly one-on-one counseling sessions",
      "Access to exclusive workshops and webinars",
      "Direct access to expert therapists, anytime",
      "Ongoing progress tracking and feedback",
    ],
    popular: false,
    featured: false,
  },
];

function PricingCard({ plan, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: index * 0.12, ease: "easeOut" }}
      className={`relative flex flex-col rounded-2xl overflow-visible
        ${plan.featured
          ? "shadow-2xl shadow-[#3D52B0]/30 scale-105 z-10"
          : "border border-gray-100 shadow-sm"
        }`}
      style={
        plan.featured
          ? { background: "linear-gradient(160deg, #4A5DAA 0%, #2D3D7A 50%, #3D6B41 100%)" }
          : { backgroundColor: "#ffffff" }
      }
    >
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
          <div className="text-white text-xs font-bold px-6 py-2 rounded-t-xl whitespace-nowrap z-10"
            style={{ backgroundColor: "#43559e" }}
          >
            Most Popular
          </div>
        </div>
      )}

      <div className="flex flex-col flex-1 p-7 pt-10 gap-4">
        {/* Plan name */}
        <h3
          className={`text-xl font-extrabold ${
            plan.featured ? "text-white" : "text-[#1E2A4A]"
          }`}
        >
          {plan.name}
        </h3>

        {/* Price */}
        <div className="flex items-end gap-1">
          <span
            className={`text-5xl font-extrabold leading-none ${
              plan.featured ? "text-white" : "text-[#1E2A4A]"
            }`}
          >
            {plan.price}
          </span>
          <span
            className={`text-base font-medium mb-1 ${
              plan.featured ? "text-white/70" : "text-gray-400"
            }`}
          >
            {plan.period}
          </span>
        </div>

        {/* Description */}
        <p
          className={`text-sm leading-relaxed ${
            plan.featured ? "text-white/75" : "text-gray-400"
          }`}
        >
          {plan.description}
        </p>

        {/* Divider */}
        <div
          className={`w-full h-px ${
            plan.featured ? "bg-white/20" : "bg-gray-100"
          }`}
        />

        {/* What we offer */}
        <div className="flex flex-col gap-3 flex-1">
          <p
            className={`text-sm font-bold ${
              plan.featured ? "text-white" : "text-[#1E2A4A]"
            }`}
          >
            What We Offer ?
          </p>

          <ul className="space-y-2.5">
            {plan.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    plan.featured ? "bg-white/20" : "bg-[#E8EBFA]"
                  }`}
                >
                  <svg
                    className={`w-3 h-3 ${
                      plan.featured ? "text-white" : "text-[#4A5DAA]"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <circle cx="10" cy="10" r="10" className={plan.featured ? "fill-white/0" : "fill-[#E8EBFA]/0"} />
                    <circle cx="10" cy="10" r="4" />
                  </svg>
                </div>
                <span
                  className={`text-sm leading-snug ${
                    plan.featured ? "text-white/85" : "text-gray-500"
                  }`}
                >
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA button */}
        <motion.a
          href="#contact"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className={`mt-4 w-full py-3.5 rounded-xl text-sm font-bold text-center transition-colors shadow-md ${
            plan.featured
              ? "bg-white text-[#2D3D7A] hover:bg-gray-100"
              : "bg-[#2D3D7A] text-white hover:bg-[#1E2A4A]"
          }`}
        >
          Select Plan
        </motion.a>
      </div>
    </motion.div>
  );
}

export default function PricingSection() {
  return (
    <section id="pricing" className="bg-white py-20 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-bold tracking-[0.18em] uppercase text-[#6B7FD4] mb-2">
            Pricing Plan
          </p>
          <h2 className="text-4xl font-extrabold text-[#1E2A4A] leading-tight">
            Affordable Plans for<br />a Healthier Mind
          </h2>
        </motion.div>

        {/* Cards — middle card is taller via scale, aligned at top */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start mt-6">
          {plans.map((plan, i) => (
            <PricingCard key={plan.id} plan={plan} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}