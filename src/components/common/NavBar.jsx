import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Home",       href: "/" },
  { label: "About Us",   href: "/about" },
  { label: "Services",   href: "/services" },
  { label: "Pricing",    href: "/pricing" },
  { label: "Blog",       href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  // Derive active label directly from the current URL — no state needed
  const activeLabel = navLinks.find((l) => l.href === pathname)?.label ?? "Home";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm shadow-[#6B7FD4]/10"
          : "bg-white"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center group">
          <img
            src="/logo.png"
            alt="Innerpeace Therapy & Wellness"
            className="h-20 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeLabel === link.label;
            return (
              <Link
                key={link.label}
                to={link.href}
                className={`px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-full
                  ${isActive ? "text-[#6B7FD4]" : "text-gray-500 hover:text-[#6B7FD4]"}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-3">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/contact"
              className="flex items-center gap-2 bg-[#1E2A4A] text-white text-sm font-medium px-5 py-2.5 rounded-full shadow-md hover:bg-[#4A5DAA] transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Get Quotes
            </Link>
          </motion.div>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-[#E8EBFA] transition-colors"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <div className="w-5 space-y-1.5">
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="block h-0.5 bg-[#3D4F6B] rounded-full"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block h-0.5 bg-[#3D4F6B] rounded-full"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="block h-0.5 bg-[#3D4F6B] rounded-full"
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-white border-t border-[#E8EBFA]"
          >
            <nav className="flex flex-col px-6 py-4 gap-1">
              {navLinks.map((link, i) => {
                const isActive = activeLabel === link.label;
                return (
                  <motion.div
                    key={link.label}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to={link.href}
                      className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-[#E8EBFA] text-[#6B7FD4]"
                          : "text-gray-500 hover:bg-[#E8EBFA] hover:text-[#6B7FD4]"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
              <Link
                to="/contact"
                className="mt-2 flex items-center justify-center gap-2 bg-[#1E2A4A] text-white text-sm font-medium px-5 py-3 rounded-full"
              >
                Get Quotes
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}