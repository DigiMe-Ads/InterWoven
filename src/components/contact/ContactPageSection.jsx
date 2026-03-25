import { useState } from "react";
import { motion } from "framer-motion";

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;

async function sendContactEmail({ name, email, phone, subject, message }) {
  const payload = {
    access_key: WEB3FORMS_KEY,
    subject: `New Contact Message — ${subject || "General Enquiry"} from ${name}`,
    from_name: name,
    email: email,
    replyto: email,
    message: `
New contact form submission:

👤 Name:     ${name}
📧 Email:    ${email}
📞 Phone:    ${phone || "Not provided"}
📋 Subject:  ${subject || "Not specified"}

💬 Message:
${message || "No message provided"}

—
Submitted via the InterWoven contact page.
    `.trim(),
  };

  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  return data.success;
}

const contactCards = [
  {
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Address",
    lines: ["123 Serenity Lane, Blissfield,", "CA 90210, United States"],
  },
  {
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: "Need Support?",
    lines: ["(555) 123-4567", "Info@Yourmail.com"],
  },
];

export default function ContactPageSection() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", subject: "", message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");

    const success = await sendContactEmail(form);

    if (success) {
      setStatus("success");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    } else {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <>
      {/* ── CONTACT SECTION ──────────────────────────────────── */}
      <section id="contact-details" className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">

          {/* LEFT: Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="rounded-3xl p-8"
            style={{ backgroundColor: "#9BAEE8" }}
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Row 1 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-bold text-white">Name</label>
                  <input name="name" required value={form.name} onChange={handleChange}
                    placeholder="Your name here"
                    className="w-full bg-white rounded-xl px-4 py-3 text-sm text-gray-500 outline-none placeholder-gray-300 focus:ring-2 focus:ring-[#4A5DAA]/30 transition" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-bold text-white">Email</label>
                  <input name="email" type="email" required value={form.email} onChange={handleChange}
                    placeholder="Your email here"
                    className="w-full bg-white rounded-xl px-4 py-3 text-sm text-gray-500 outline-none placeholder-gray-300 focus:ring-2 focus:ring-[#4A5DAA]/30 transition" />
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-bold text-white">Phone</label>
                  <input name="phone" value={form.phone} onChange={handleChange}
                    placeholder="Your phone number"
                    className="w-full bg-white rounded-xl px-4 py-3 text-sm text-gray-500 outline-none placeholder-gray-300 focus:ring-2 focus:ring-[#4A5DAA]/30 transition" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-bold text-white">Subject</label>
                  <input name="subject" value={form.subject} onChange={handleChange}
                    placeholder="Your subject."
                    className="w-full bg-white rounded-xl px-4 py-3 text-sm text-gray-500 outline-none placeholder-gray-300 focus:ring-2 focus:ring-[#4A5DAA]/30 transition" />
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-white">Message</label>
                <textarea name="message" rows={5} value={form.message} onChange={handleChange}
                  className="w-full bg-white rounded-xl px-4 py-3 text-sm text-gray-500 outline-none placeholder-gray-300 focus:ring-2 focus:ring-[#4A5DAA]/30 transition resize-none" />
              </div>

              {/* Status messages */}
              {status === "success" && (
                <p className="text-sm font-semibold text-white bg-green-500/30 rounded-xl px-4 py-2 text-center">
                  ✓ Message sent! We'll get back to you soon.
                </p>
              )}
              {status === "error" && (
                <p className="text-sm font-semibold text-white bg-red-500/30 rounded-xl px-4 py-2 text-center">
                  Something went wrong. Please try again.
                </p>
              )}

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={status === "submitting"}
                whileHover={status !== "submitting" ? { scale: 1.02 } : {}}
                whileTap={status !== "submitting" ? { scale: 0.98 } : {}}
                className="w-full bg-[#1E2A4A] text-white font-bold text-sm py-4 rounded-xl shadow-md hover:bg-[#2D3D7A] transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {status === "submitting" ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : "Submit Now"}
              </motion.button>
            </form>
          </motion.div>

          {/* RIGHT: Contact details — unchanged */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            className="flex flex-col gap-5"
          >
            <div>
              <p className="text-xs font-bold tracking-[0.18em] uppercase text-[#6B7FD4] mb-2">
                Get In Touch
              </p>
              <h2 className="text-4xl font-extrabold text-[#1E2A4A]">Contact Details</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactCards.map((card, i) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                  className="flex flex-col items-center text-center gap-3 rounded-2xl border border-[#6B7FD4]/30 p-6"
                >
                  <div className="w-12 h-12 rounded-full bg-[#2D3D7A] flex items-center justify-center">
                    {card.icon}
                  </div>
                  <p className="text-base font-extrabold text-[#1E2A4A]">{card.title}</p>
                  {card.lines.map((line, j) => (
                    <p key={j} className="text-sm text-gray-400 leading-snug">{line}</p>
                  ))}
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="flex items-center gap-5 rounded-2xl border border-[#6B7FD4]/30 px-6 py-5"
            >
              <div className="w-12 h-12 rounded-full bg-[#2D3D7A] flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-base font-extrabold text-[#1E2A4A]">Working Hours</p>
                <p className="text-sm text-gray-400 mt-0.5">Mon - Fri 8:00 - 6:30</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── FULL-WIDTH MAP ───────────────────────────────────── */}
      <div className="w-full" style={{ height: 420 }}>
        <iframe
          title="Office Location"
          width="100%"
          height="100%"
          style={{ border: 0, display: "block" }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019540492669!2d-122.43194168468212!3d37.77492997975901!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0xb10ed6d9b5158e1b!2sPainted%20Ladies!5e0!3m2!1sen!2sus!4v1680000000000!5m2!1sen!2sus"
        />
      </div>
    </>
  );
}