import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    stars: 5,
    quote:
      '"Thanks to the supportive team, I\'ve learned how to manage my anxiety and feel more in control of my life. I\'m truly grateful for the care and guidance they provided."',
    name: "Jessica M",
    role: "Digital Agency",
    avatar: "/images/home/jessica.jpg",
  },
  {
    id: 2,
    stars: 5,
    quote:
      '"The counseling sessions were a game-changer for me. The therapist was so understanding, and I finally felt heard. I highly recommend their services to anyone struggling."',
    name: "David L.",
    role: "Product Manager",
    avatar: "/images/home/david.jpg",
  },
  {
    id: 3,
    stars: 5,
    quote:
      '"I joined one of their mindfulness workshops, and it helped me find a sense of calm I didn\'t know I could achieve. Their approach is practical and easy to follow."',
    name: "Emily R.",
    role: "Content Creator",
    avatar: "/images/home/emily.jpg",
  },
];

function StarRating({ count }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-5 h-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: index * 0.12, ease: "easeOut" }}
      className="bg-white rounded-2xl p-6 flex flex-col gap-5 border border-[#6B7FD4]/25 shadow-sm"
    >
      {/* Stars */}
      <StarRating count={testimonial.stars} />

      {/* Quote */}
      <p className="text-sm font-bold text-[#191919] leading-relaxed flex-1">
        {testimonial.quote}
      </p>

      {/* Divider */}
      <div className="w-full h-px bg-gray-100" />

      {/* Avatar + name */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-gray-100">
          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
          {/* Fallback initials */}
          <div
            className="hidden w-full h-full items-center justify-center bg-[#E8EBFA] text-[#425CA9] font-bold text-sm"
          >
            {testimonial.name.charAt(0)}
          </div>
        </div>
        <div>
          <p className="text-m font-bold text-[#425CA9]">{testimonial.name}</p>
          <p className="text-xs text-gray-400">{testimonial.role}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="relative bg-white pt-20 pb-32 px-6 overflow-hidden">

      {/* Solid pink/mauve strip — bottom portion */}
      <div
        className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none"
        style={{ backgroundColor: "#EDE0EE" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Header: left heading + right description */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-12">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="text-xs font-extrabold tracking-[0.18em] uppercase text-[#425CA9] mb-3">
              Client Feedbacks
            </p>
            <h2 className="text-4xl font-extrabold text-[#191919] leading-tight">
              Healing Begins with a<br />Conversation
            </h2>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            className="lg:pt-10"
          >
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              Healing isn't rushed—it's supported. Our team walks beside you,
              offering understanding and tailored support to help you rebuild
              confidence and emotional peace day by day.
            </p>
          </motion.div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.id} testimonial={t} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}