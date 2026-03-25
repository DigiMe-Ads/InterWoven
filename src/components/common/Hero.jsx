import { motion } from "framer-motion";
import { Link } from "react-router-dom";

/**
 * PageHero — reusable hero banner for inner pages
 *
 * Props:
 *   title       — page title e.g. "About Us"
 *   breadcrumbs — array of { label, href } objects
 *                 last item is the current page (no link)
 *
 * Usage:
 *   <PageHero
 *     title="About Us"
 *     breadcrumbs={[
 *       { label: "Homepage", href: "/" },
 *       { label: "About Us" },
 *     ]}
 *   />
 */
export default function PageHero({ title, breadcrumbs = [] }) {
  return (
    <section className="relative overflow-hidden" style={{ height: 360 }}>
      {/* Background image */}
      <img
        src="/images/home/footer.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Blue/purple overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(100,120,210,0.82) 0%, rgba(120,140,220,0.78) 50%, rgba(150,165,230,0.72) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center gap-3 px-6">
        {/* Page title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl lg:text-5xl font-extrabold text-white text-center"
        >
          {title}
        </motion.h1>

        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="flex items-center gap-2 text-sm"
          aria-label="Breadcrumb"
        >
          {breadcrumbs.map((crumb, i) => {
            const isLast = i === breadcrumbs.length - 1;
            return (
              <span key={i} className="flex items-center gap-2">
                {i > 0 && (
                  <span className="text-white/60">/</span>
                )}
                {isLast || !crumb.href ? (
                  <span className="text-white/80 font-medium">{crumb.label}</span>
                ) : (
                  <Link
                    to={crumb.href}
                    className="text-[#a8b8f0] hover:text-white font-medium transition-colors"
                  >
                    {crumb.label}
                  </Link>
                )}
              </span>
            );
          })}
        </motion.nav>
      </div>
    </section>
  );
}