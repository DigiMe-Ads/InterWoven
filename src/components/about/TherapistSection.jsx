import { motion } from "framer-motion";

const therapists = [
  {
    id: 1,
    name: "Ubeid Una",
    role: "Psychologist",
    image: "/images/about/therapist1.jpg",
    social: { facebook: "#", twitter: "#", linkedin: "#" },
  },
  {
    id: 2,
    name: "Hafsha Jasmine",
    role: "Psychologist",
    image: "/images/about/therapist2.jpg",
    social: { facebook: "#", twitter: "#", linkedin: "#" },
  },
  {
    id: 3,
    name: "Farina Amira",
    role: "Psychologist",
    image: "/images/about/therapist3.jpg",
    social: { facebook: "#", twitter: "#", linkedin: "#" },
  },
  {
    id: 4,
    name: "Idayati Ilyas",
    role: "Psychologist",
    image: "/images/about/therapist4.jpg",
    social: { facebook: "#", twitter: "#", linkedin: "#" },
  },
];

function TherapistCard({ therapist, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: "easeOut" }}
      className="rounded-2xl overflow-hidden relative"
      style={{ height: 360 }}
    >
      {/* Photo fills entire card */}
      <img
        src={therapist.image}
        alt={therapist.name}
        className="w-full h-full object-cover object-top"
      />

      {/* Green info box — floats over bottom of image, with side margins */}
      <div
        className="absolute bottom-4 left-4 right-4 rounded-xl px-4 py-3 flex flex-col items-center gap-1.5"
        style={{ backgroundColor: "#4A6741" }}
      >
        <p className="text-white font-bold text-base leading-tight text-center">
          {therapist.name}
        </p>
        <p className="text-white/75 text-xs text-center">{therapist.role}</p>

        {/* Social icons */}
        <div className="flex items-center gap-2 mt-1">
          <a
            href={therapist.social.facebook}
            className="w-7 h-7 rounded-lg bg-[#3D4F8F] flex items-center justify-center hover:bg-[#2D3D7A] transition-colors"
          >
            <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
            </svg>
          </a>
          <a
            href={therapist.social.twitter}
            className="w-7 h-7 rounded-lg bg-[#3D4F8F] flex items-center justify-center hover:bg-[#2D3D7A] transition-colors"
          >
            <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a
            href={therapist.social.linkedin}
            className="w-7 h-7 rounded-lg bg-[#3D4F8F] flex items-center justify-center hover:bg-[#2D3D7A] transition-colors"
          >
            <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function TherapistsSection() {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-xs font-bold tracking-[0.18em] uppercase text-[#4A6741] mb-2">
            Our Specialist
          </p>
          <h2 className="text-4xl font-extrabold text-[#1E2A4A] leading-tight">
            Meet Our Senior<br />Therapist
          </h2>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {therapists.map((t, i) => (
            <TherapistCard key={t.id} therapist={t} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}