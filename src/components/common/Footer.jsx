import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;

const quickLinks = [
  { label: "Homepage",    href: "/" },
  { label: "Services",    href: "/services" },
  { label: "Appointment", href: "/#contact" },
  { label: "Blogs",       href: "/blog" },
];

export default function Footer() {
  const [email,      setEmail]      = useState("");
  const [subStatus,  setSubStatus]  = useState("idle"); // idle | submitting | success | error

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setSubStatus("submitting");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Newsletter Subscription — ${email}`,
          from_name: "Newsletter Signup",
          email: email,
          message: `New newsletter subscription from: ${email}`,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSubStatus("success");
        setEmail("");
        setTimeout(() => setSubStatus("idle"), 4000);
      } else {
        setSubStatus("error");
        setTimeout(() => setSubStatus("idle"), 4000);
      }
    } catch {
      setSubStatus("error");
      setTimeout(() => setSubStatus("idle"), 4000);
    }
  };

  return (
    <footer className="relative overflow-hidden">
      {/* Background image with blue/purple overlay */}
      <img
        src="/images/home/footer.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(180,190,230,0.88) 0%, rgba(160,175,220,0.88) 40%, rgba(190,195,235,0.85) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-14 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-10">

          {/* COL 1: Logo + description + socials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <img src="/logo.png" alt="Innerpeace" className="h-18 w-auto object-contain" />
            <p className="text-sm text-[#2D3D6B]/80 leading-relaxed">
              Professional, responsive, and soothing design for therapists,
              counselors, and life coaches.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a href="#" className="w-9 h-9 rounded-full bg-[#212529] flex items-center justify-center hover:bg-[#1E2A4A] transition-colors shadow-sm">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-[#212529] flex items-center justify-center hover:bg-[#1E2A4A] transition-colors shadow-sm">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-[#212529] flex items-center justify-center hover:bg-[#1E2A4A] transition-colors shadow-sm">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </motion.div>

          {/* COL 2: Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-3"
          >
            <h4 className="text-base font-extrabold text-[#1E2A4A]">Contact</h4>
            <div className="space-y-2">
              <p className="text-sm text-[#2D3D6B]/80 leading-relaxed">
                123 Serenity Lane, Blissfield, CA<br />90210, United States
              </p>
              <a href="mailto:Info@yourmail.com" className="block text-sm text-[#2D3D6B]/80 hover:text-[#1E2A4A] transition-colors">
                Info@yourmail.com
              </a>
              <a href="tel:5551234567" className="block text-sm text-[#2D3D6B]/80 hover:text-[#1E2A4A] transition-colors">
                (555) 123-4567
              </a>
            </div>
          </motion.div>

          {/* COL 3: Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-3"
          >
            <h4 className="text-base font-extrabold text-[#1E2A4A]">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-sm text-[#2D3D6B]/80 hover:text-[#1E2A4A] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* COL 4: Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-3"
          >
            <h4 className="text-base font-extrabold text-[#1E2A4A]">Newsletter</h4>
            <p className="text-sm font-bold text-[#1E2A4A]">Get the latest news other tips.</p>

            <form onSubmit={handleSubscribe} className="space-y-2 pt-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email here"
                required
                className="w-full bg-white rounded-xl px-4 py-3 text-sm text-gray-500 outline-none placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-[#6B7FD4]/30 transition"
              />

              {subStatus === "success" && (
                <p className="text-xs font-semibold text-green-700 bg-green-100 rounded-lg px-3 py-1.5">
                  ✓ Subscribed successfully!
                </p>
              )}
              {subStatus === "error" && (
                <p className="text-xs font-semibold text-red-700 bg-red-100 rounded-lg px-3 py-1.5">
                  Something went wrong. Try again.
                </p>
              )}

              <motion.button
                type="submit"
                disabled={subStatus === "submitting"}
                whileHover={subStatus !== "submitting" ? { scale: 1.02 } : {}}
                whileTap={subStatus !== "submitting" ? { scale: 0.98 } : {}}
                className="w-full bg-[#212529] text-white text-sm font-semibold py-3 rounded-xl shadow-md hover:bg-[#2D3D7A] transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {subStatus === "submitting" ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Subscribing...
                  </>
                ) : "Subscribe now"}
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-[#2D3D6B]/20 mb-5" />

        {/* Copyright */}
        <p className="text-center text-xs text-[#2D3D6B]/70">
          Copyright © 2025 Widagdos. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}