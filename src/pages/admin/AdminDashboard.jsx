import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { getContent, saveContent } from "../../lib/contentService";
import { TextField, AdminSection } from "./AdminFields";

const SECTIONS = [
  { key: "global",       label: "Global — Phone, Email, Address" },
  { key: "hero",         label: "Home — Hero" },
  { key: "features",     label: "Home — Features Cards" },
  { key: "about",        label: "Home — About Section" },
  { key: "howWeHelp",    label: "Home — How We Help" },
  { key: "services",     label: "Home — Services" },
  { key: "whyChooseUs",  label: "Home — Why Choose Us" },
  { key: "testimonials", label: "Home — Testimonials" },
  { key: "contact",      label: "Home — Contact / Booking" },
  { key: "extendedServices", label: "Services Page — Extended Services" },
  { key: "aboutPage",    label: "About Page" },
{ key: "mentalHealthMatters", label: "About Page — Mental Health Matters" },
  { key: "howWeHelpAbout", label: "About Page — How We Help" },
  { key: "contactPage",  label: "Contact Page" },
  { key: "pricingPage",  label: "Pricing Page" },
//   { key: "blogPage",     label: "Blog Page" },
  { key: "blogPageExtended", label: "Blog Page — All Posts" },
  { key: "footer",       label: "Footer" },
];

// Fields that should render as multiline textarea
const MULTILINE_KEYS = [
  "body", "desc", "Desc", "quote", "excerpt", "Excerpt",
  "rightBody", "description", "subheading",
  "step1Desc", "step2Desc", "step3Desc",
  "svc1Desc", "svc2Desc", "svc3Desc",
  "card1Desc", "card2Desc", "card3Desc", "card4Desc",
  "plan1Desc", "plan2Desc", "plan3Desc",
  "t1Quote", "t2Quote", "t3Quote",
  "bullet1", "bullet2", "bullet3", "bullet4",
  "post1Excerpt", "post2Excerpt", "post3Excerpt",
  "post4Excerpt", "post5Excerpt", "post6Excerpt",
];

function isMultiline(key) {
  return MULTILINE_KEYS.some(m => key === m || key.endsWith(m.charAt(0).toUpperCase() + m.slice(1)));
}

// ── Single section editor ─────────────────────────────────────────────────────
function SectionEditor({ sectionKey, label }) {
  const [data,   setData]   = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved,  setSaved]  = useState(false);

  useEffect(() => {
    setData(null);
    getContent(sectionKey).then(setData);
  }, [sectionKey]);

  const handleChange = (key, value) => {
    setData(prev => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    await saveContent(sectionKey, data);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (!data) return (
    <div className="bg-white rounded-2xl border border-gray-100 p-8 flex items-center gap-3">
      <div className="w-5 h-5 border-2 border-[#2D8080] border-t-transparent rounded-full animate-spin" />
      <span className="text-sm text-gray-400">Loading {label}...</span>
    </div>
  );

  return (
    <AdminSection title={label} onSave={handleSave} saving={saving} saved={saved}>
      {Object.entries(data).map(([key, value]) => (
        <TextField
          key={key}
          label={key}
          value={value}
          multiline={isMultiline(key)}
          onChange={val => handleChange(key, val)}
        />
      ))}
    </AdminSection>
  );
}

// ── Admin Dashboard ───────────────────────────────────────────────────────────
export default function AdminDashboard({ user }) {
  const [activeSection, setActiveSection] = useState("global");
  const [sidebarOpen,   setSidebarOpen]   = useState(false);

  const activeLabel = SECTIONS.find(s => s.key === activeSection)?.label || "";

  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-100 shadow-sm flex flex-col
        transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:flex
      `}>
        <div className="px-6 py-5 border-b border-gray-100">
          <img src="/logo.png" alt="Logo" className="h-10 w-auto object-contain" />
          <p className="text-[10px] text-gray-400 mt-1 font-semibold uppercase tracking-widest">Content Manager</p>
        </div>

        <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-0.5">
          {SECTIONS.map(s => (
            <button
              key={s.key}
              onClick={() => { setActiveSection(s.key); setSidebarOpen(false); }}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                activeSection === s.key
                  ? "bg-[#E8F5F5] text-[#2D8080]"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              }`}
            >
              {s.label}
            </button>
          ))}
        </nav>

        <div className="px-4 py-4 border-t border-gray-100 space-y-2">
          <p className="text-[10px] text-gray-400 truncate font-medium">{user.email}</p>
          <button
            onClick={() => signOut(auth)}
            className="w-full text-xs font-semibold text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-xl transition-colors"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top bar */}
        <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center gap-4 sticky top-0 z-20 shadow-sm">
          <button
            className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
            onClick={() => setSidebarOpen(v => !v)}
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div>
            <h1 className="text-sm font-extrabold text-gray-800">{activeLabel}</h1>
            <p className="text-xs text-gray-400 mt-0.5">Edit text and save — changes appear on the live site instantly</p>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <SectionEditor key={activeSection} sectionKey={activeSection} label={activeLabel} />
          </div>
        </main>
      </div>
    </div>
  );
}