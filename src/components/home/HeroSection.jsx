import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TIME_SLOTS,
  BLOCKED_DATES,
  isSlotBooked,
  saveBooking,
  sendBookingEmail,
} from "../../lib/bookingService";

// ── Helpers ───────────────────────────────────────────────────────────────────
const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const DAY_NAMES = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

function pad(n) { return String(n).padStart(2, "0"); }
function formatDate(dateStr) {
  const [y, m, d] = dateStr.split("-");
  return `${MONTH_NAMES[parseInt(m) - 1]} ${parseInt(d)}, ${y}`;
}
function formatTime(t) {
  const [h, mn] = t.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  return `${h % 12 || 12}:${pad(mn)} ${ampm}`;
}

// ── Mini Calendar ─────────────────────────────────────────────────────────────
function MiniCalendar({ selected, onSelect, bookedSlotsMap }) {
  const today = new Date();
  const [year, setYear]   = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  const firstDay    = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const prevMonth = () => month === 0 ? (setMonth(11), setYear(y => y - 1)) : setMonth(m => m - 1);
  const nextMonth = () => month === 11 ? (setMonth(0), setYear(y => y + 1)) : setMonth(m => m + 1);

  function getDayStatus(dateStr) {
    const isPast    = new Date(dateStr) < new Date(today.toDateString());
    const isBlocked = BLOCKED_DATES.includes(dateStr);
    if (isPast || isBlocked) return "unavailable";
    const booked = bookedSlotsMap[dateStr] || [];
    if (booked.length >= TIME_SLOTS.length) return "full";
    return "available";
  }

  return (
    <div className="w-full">
      {/* Month nav */}
      <div className="flex items-center justify-between mb-3">
        <button onClick={prevMonth} className="w-7 h-7 rounded-full hover:bg-[#E8F5F5] flex items-center justify-center transition-colors">
          <svg className="w-3.5 h-3.5 text-[#2D6B6B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="text-xs font-bold text-[#1A3D3D]">{MONTH_NAMES[month]} {year}</span>
        <button onClick={nextMonth} className="w-7 h-7 rounded-full hover:bg-[#E8F5F5] flex items-center justify-center transition-colors">
          <svg className="w-3.5 h-3.5 text-[#2D6B6B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-1">
        {DAY_NAMES.map(d => (
          <div key={d} className="text-center text-[9px] font-bold text-gray-400 py-0.5">{d}</div>
        ))}
      </div>

      {/* Cells */}
      <div className="grid grid-cols-7 gap-y-0.5">
        {cells.map((day, i) => {
          if (!day) return <div key={`e-${i}`} />;
          const dateStr = `${year}-${pad(month + 1)}-${pad(day)}`;
          const status  = getDayStatus(dateStr);
          const isSelected = selected === dateStr;

          return (
            <button
              key={dateStr}
              disabled={status !== "available"}
              onClick={() => status === "available" && onSelect(dateStr)}
              className={`mx-auto w-8 h-8 rounded-full text-xs font-medium transition-all
                ${isSelected
                  ? "bg-[#1A3D3D] text-white scale-110 shadow-sm"
                  : status === "available"
                  ? "bg-[#2D8080] text-white hover:bg-[#236B6B] hover:scale-105 shadow-sm cursor-pointer"
                  : status === "full"
                  ? "bg-red-100 text-red-400 cursor-not-allowed"
                  : "text-gray-300 cursor-not-allowed"
                }`}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-3 mt-3 pt-2 border-t border-gray-100 flex-wrap">
        <div className="flex items-center gap-1">
          <div className="w-2.5 h-2.5 rounded-full bg-[#2D8080]" />
          <span className="text-[10px] text-gray-400">Available</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2.5 h-2.5 rounded-full bg-red-100 border border-red-300" />
          <span className="text-[10px] text-gray-400">Full</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2.5 h-2.5 rounded-full bg-gray-200" />
          <span className="text-[10px] text-gray-400">Unavailable</span>
        </div>
      </div>
    </div>
  );
}

// ── Hero Booking Dialog ───────────────────────────────────────────────────────
function HeroBookingDialog({ therapyType, onClose, onConfirm, bookedSlotsMap, loadingSlots }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", time: "", subject: therapyType, message: "",
  });
  const [status,   setStatus]   = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const takenSlots     = selectedDate ? (bookedSlotsMap[selectedDate] || []) : [];
  const availableSlots = TIME_SLOTS.filter(s => !takenSlots.includes(s));

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDate) { setErrorMsg("Please select a date."); return; }
    if (!form.time)    { setErrorMsg("Please select a time slot."); return; }
    setStatus("submitting");
    setErrorMsg("");

    const slotTaken = await isSlotBooked(selectedDate, form.time);
    if (slotTaken) {
      setStatus("error");
      setErrorMsg("That time slot was just taken. Please pick another.");
      return;
    }

    const bookingData = { ...form, date: selectedDate };
    const saveResult  = await saveBooking(bookingData);
    if (!saveResult.success) {
      setStatus("error");
      setErrorMsg("Failed to save your booking. Please try again.");
      return;
    }

    await sendBookingEmail(bookingData);
    onConfirm(selectedDate, form.time); // update parent's bookedSlotsMap immediately
    setStatus("success");
  };

  const accentColor = therapyType === "Couples Therapy" ? "#4A6741" : "#3D4F8F";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6"
      style={{ backgroundColor: "rgba(20,35,25,0.6)", backdropFilter: "blur(6px)" }}
      onClick={status !== "submitting" ? onClose : undefined}
    >
      <motion.div
        initial={{ scale: 0.93, opacity: 0, y: 24 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.93, opacity: 0, y: 24 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl relative overflow-hidden max-h-[92vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Coloured top bar matching therapy type */}
        <div className="h-1.5 w-full" style={{ backgroundColor: accentColor }} />

        {/* Header */}
        <div className="flex items-center justify-between px-7 pt-6 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-extrabold text-[#1A3D3D]">Book a Session</h2>
            <span
              className="text-xs font-bold text-white px-3 py-1 rounded-full"
              style={{ backgroundColor: accentColor }}
            >
              {therapyType}
            </span>
          </div>
          {status !== "submitting" && (
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
              <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Success state */}
        {status === "success" && (
          <div className="flex-1 flex items-center justify-center p-10">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-extrabold text-[#1A3D3D]">Booking Confirmed!</h3>
              <p className="text-sm text-gray-400">
                Your <span className="font-bold text-[#2D8080]">{therapyType}</span> session on{" "}
                <span className="font-bold text-[#2D8080]">{formatDate(selectedDate)}</span> at{" "}
                <span className="font-bold text-[#2D8080]">{formatTime(form.time)}</span> has been booked.
                <br />The therapist has been notified.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-6 py-2.5 rounded-full text-sm font-semibold text-white transition-colors"
                style={{ backgroundColor: accentColor }}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Error state */}
        {status === "error" && (
          <div className="p-7 space-y-4">
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-600">{errorMsg}</div>
            <button onClick={() => setStatus("idle")} className="w-full bg-gray-100 text-gray-600 font-semibold py-3 rounded-xl hover:bg-gray-200 transition-colors">
              Try Again
            </button>
          </div>
        )}

        {/* Form + Calendar */}
        {(status === "idle" || status === "submitting") && (
          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">

              {/* LEFT: Calendar */}
              <div className="p-7 border-r border-gray-100">
                <p className="text-xs font-bold text-[#1A3D3D] mb-1">
                  1. Pick a date
                </p>
                <p className="text-[11px] text-gray-400 mb-4">
                  {loadingSlots ? "Loading availability..." : "Select an available date"}
                </p>
                {loadingSlots ? (
                  <div className="flex items-center justify-center py-10">
                    <div className="w-5 h-5 border-2 border-[#2D8080] border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : (
                  <MiniCalendar
                    selected={selectedDate}
                    onSelect={(d) => { setSelectedDate(d); setForm(f => ({ ...f, time: "" })); }}
                    bookedSlotsMap={bookedSlotsMap}
                  />
                )}

                {selectedDate && (
                  <div className="mt-3 p-2.5 rounded-xl text-xs font-semibold text-[#2D8080] bg-[#E8F5F5]">
                    📅 {formatDate(selectedDate)}
                  </div>
                )}
              </div>

              {/* RIGHT: Form fields */}
              <div className="p-7">
                <p className="text-xs font-bold text-[#1A3D3D] mb-4">2. Your details</p>

                {errorMsg && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-xs text-red-600 mb-3">{errorMsg}</div>
                )}

                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-[#1A3D3D] mb-1 block">Name *</label>
                      <input name="name" required value={form.name} onChange={handleChange} placeholder="Your name"
                        className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#2D8080] transition-colors" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#1A3D3D] mb-1 block">Email *</label>
                      <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="Your email"
                        className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#2D8080] transition-colors" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-[#1A3D3D] mb-1 block">Phone</label>
                      <input name="phone" value={form.phone} onChange={handleChange} placeholder="Your phone"
                        className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#2D8080] transition-colors" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#1A3D3D] mb-1 block">Time Slot *</label>
                      <select
                        name="time"
                        value={form.time}
                        onChange={handleChange}
                        disabled={!selectedDate}
                        className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#2D8080] transition-colors bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <option value="">{selectedDate ? "Select time" : "Pick a date first"}</option>
                        {selectedDate && TIME_SLOTS.map(slot => {
                          const isTaken = takenSlots.includes(slot);
                          return (
                            <option key={slot} value={isTaken ? "" : slot} disabled={isTaken}>
                              {formatTime(slot)}{isTaken ? " — Taken" : ""}
                            </option>
                          );
                        })}
                      </select>
                      {selectedDate && availableSlots.length === 0 && (
                        <p className="text-[10px] text-red-400 mt-1">No slots left for this day.</p>
                      )}
                    </div>
                  </div>

                  {/* Session type — pre-filled, still editable */}
                  <div>
                    <label className="text-xs font-semibold text-[#1A3D3D] mb-1 block">Session Type</label>
                    <select
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#2D8080] transition-colors bg-white"
                    >
                      <option value="Individual Therapy">Individual Therapy</option>
                      <option value="Couples Therapy">Couples Therapy</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#1A3D3D] mb-1 block">Message</label>
                    <textarea name="message" rows={3} value={form.message} onChange={handleChange} placeholder="Tell us your story..."
                      className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#2D8080] transition-colors resize-none" />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={status === "submitting" || !selectedDate || (selectedDate && availableSlots.length === 0)}
                    whileHover={status !== "submitting" ? { scale: 1.02 } : {}}
                    whileTap={status !== "submitting" ? { scale: 0.98 } : {}}
                    className="w-full text-white font-semibold text-sm py-3.5 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                    style={{ backgroundColor: accentColor }}
                  >
                    {status === "submitting" ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Confirming...
                      </>
                    ) : "Confirm Appointment"}
                  </motion.button>
                </form>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

// ── Hero Section ──────────────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: "easeOut", delay },
});

export default function HeroSection({ bookedSlotsMap = {}, loadingSlots = true, onBookingConfirm }) {
  const [dialogType, setDialogType] = useState(null);

  const handleConfirm = (date, time) => {
    onBookingConfirm?.(date, time);
  };

  return (
    <section id="home" className="relative min-h-screen overflow-hidden flex items-end">

      {/* Background image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/images/home/new-bg.png')",
          backgroundSize: "fill",
          backgroundPosition: "center top",
          opacity: 0.45,
        }}
      />

      {/* Dark overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "linear-gradient(120deg, rgba(30,50,35,0.75) 0%, rgba(61,79,143,0.55) 40%, rgba(74,103,65,0.60) 100%)",
        }}
      />

      {/* Decorative arcs */}
      <svg className="hidden md:block absolute right-0 top-0 h-full w-1/2 pointer-events-none opacity-30 z-10" viewBox="0 0 500 800" preserveAspectRatio="xMaxYMid meet" fill="none">
        <path d="M500 0 Q300 400 500 800" stroke="white" strokeWidth="1" />
        <path d="M540 0 Q340 400 540 800" stroke="white" strokeWidth="1" />
        <path d="M460 0 Q260 400 460 800" stroke="white" strokeWidth="1" />
        <path d="M420 0 Q220 400 420 800" stroke="white" strokeWidth="1" />
        <path d="M380 0 Q180 400 380 800" stroke="white" strokeWidth="1" />
      </svg>

      {/* Floating dots */}
      <motion.div animate={{ y: [0,-10,0] }} transition={{ duration:4, repeat:Infinity, ease:"easeInOut" }}
        className="hidden md:block absolute right-[22%] top-[22%] w-4 h-4 rounded-full bg-white/40 z-10" />
      <motion.div animate={{ y: [0,10,0] }} transition={{ duration:5, repeat:Infinity, ease:"easeInOut", delay:1 }}
        className="hidden md:block absolute right-[8%] bottom-[35%] w-6 h-6 rounded-full border border-white/40 z-10" />
      <motion.div animate={{ y: [0,-8,0] }} transition={{ duration:3.5, repeat:Infinity, ease:"easeInOut", delay:0.5 }}
        className="hidden md:block absolute right-[14%] top-[60%] w-3 h-3 rounded-full bg-white/30 z-10" />

      {/* Main layout */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-32 md:pt-24 pb-0 flex flex-col md:flex-row md:items-end h-full overflow-hidden">

        {/* LEFT: Text */}
        <div className="w-full md:w-1/2 pb-8 md:pb-20 space-y-5 text-center md:text-left">

          <motion.p {...fadeUp(0.15)} className="text-xs font-semibold tracking-[0.18em] uppercase text-white/80">
            You don't have to navigate life alone.
          </motion.p>

          <motion.h1 {...fadeUp(0.2)} className="text-2xl sm:text-4xl lg:text-[3.4rem] font-bold leading-tight">
            <span className="text-white">Support, guidance, </span>
            <br />
            <span className="text-[#a8c5f0] font-extrabold">and growth</span>
            <span className="text-white font-bold"> all in one place</span>
          </motion.h1>

          <motion.div
            initial={{ scaleX:0, opacity:0 }} animate={{ scaleX:1, opacity:1 }}
            transition={{ duration:0.6, delay:0.4 }}
            className="w-48 h-px bg-white/50 origin-left mx-auto md:mx-0"
          />

          <motion.p {...fadeUp(0.35)} className="text-sm text-white/80 leading-relaxed max-w-xs mx-auto md:mx-0">
            Interwoven connects individuals with the support they need to grow, heal, and thrive.
          </motion.p>

          {/* CTA buttons — open dialog */}
          <motion.div {...fadeUp(0.45)} className="flex flex-col sm:flex-row items-center gap-3 pt-2 justify-center md:justify-start">
            <motion.button
              onClick={() => setDialogType("Individual Therapy")}
              whileHover={{ scale:1.04, boxShadow:"0 8px 28px rgba(61,79,143,0.5)" }}
              whileTap={{ scale:0.97 }}
              className="flex items-center gap-2 bg-[#3D4F8F] text-white text-sm font-semibold px-7 py-3.5 rounded-full shadow-lg"
            >
              <svg className="w-4 h-4 opacity-80 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Individual Therapy
              <span className="text-white/60 text-xs font-normal">— for me</span>
            </motion.button>

            <motion.button
              onClick={() => setDialogType("Couples Therapy")}
              whileHover={{ scale:1.04, boxShadow:"0 8px 28px rgba(74,103,65,0.5)" }}
              whileTap={{ scale:0.97 }}
              className="flex items-center gap-2 bg-[#4A6741] text-white text-sm font-semibold px-7 py-3.5 rounded-full shadow-lg"
            >
              <svg className="w-4 h-4 opacity-80 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Couples Therapy
              <span className="text-white/60 text-xs font-normal">— for us</span>
            </motion.button>
          </motion.div>

          {/* Mobile badges */}
          <motion.div {...fadeUp(0.55)} className="flex md:hidden justify-center items-center gap-3 pt-2">
            <div className="flex items-center gap-2 bg-[#3D4F8F] text-white pl-2 pr-4 py-2 rounded-full shadow-xl">
              <div className="w-8 h-8 rounded-full bg-[#6B7FD4] flex items-center justify-center flex-shrink-0">
                <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div className="leading-tight">
                <p className="text-[9px] opacity-70 tracking-wide">Call us anytime</p>
                <p className="text-xs font-bold tracking-wide">(555) 123-4567</p>
              </div>
            </div>
            <div className="bg-[#4A6741] text-white px-4 py-2.5 rounded-2xl shadow-lg text-center">
              <p className="text-base font-bold leading-none">4.9 /5</p>
              <p className="text-[9px] opacity-80 mt-0.5 tracking-wide">Review on Google</p>
            </div>
          </motion.div>
        </div>

        {/* RIGHT: Image + desktop badges */}
        <div className="w-full md:w-1/2 relative flex justify-center items-end self-end">
          <motion.div
            initial={{ opacity:0, y:-20, x:20 }} animate={{ opacity:1, y:0, x:0 }}
            transition={{ duration:0.6, delay:0.5 }}
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

          <motion.div
            initial={{ opacity:0, x:-20, scale:0.85 }} animate={{ opacity:1, x:0, scale:1 }}
            transition={{ duration:0.6, delay:0.65 }}
            className="hidden md:block absolute left-4 top-[45%] z-30"
          >
            <div className="bg-[#4A6741] text-white px-4 py-3 rounded-2xl shadow-lg text-center">
              <p className="text-xl font-bold leading-none">4.9 /5</p>
              <p className="text-[10px] opacity-80 mt-1 tracking-wide">Review on Google</p>
            </div>
          </motion.div>

          <motion.img
            src="/images/home/hero.png"
            alt="Therapist"
            initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:0.8, delay:0.25 }}
            className="relative z-20 w-full object-contain block"
            style={{ maxWidth:450, height:"72vh", objectPosition:"bottom", objectFit:"contain" }}
          />
        </div>
      </div>

      {/* Booking Dialog */}
      <AnimatePresence>
        {dialogType && (
          <HeroBookingDialog
            therapyType={dialogType}
            onClose={() => setDialogType(null)}
            onConfirm={handleConfirm}
            bookedSlotsMap={bookedSlotsMap}
            loadingSlots={loadingSlots}
          />
        )}
      </AnimatePresence>
    </section>
  );
}