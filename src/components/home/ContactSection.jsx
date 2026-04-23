import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TIME_SLOTS,
  BLOCKED_DATES,

  isSlotBooked,
  saveBooking,
  sendBookingEmail,
} from "../../lib/bookingService";

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
  const [h, m] = t.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return `${hour}:${pad(m)} ${ampm}`;
}

// ── Calendar ──────────────────────────────────────────────────────────────────
function Calendar({ onSelectDate, bookedSlotsMap, loading }) {
  const today = new Date();
  const [year, setYear]   = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  const firstDay    = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const prevMonth = () =>
    month === 0 ? (setMonth(11), setYear((y) => y - 1)) : setMonth((m) => m - 1);
  const nextMonth = () =>
    month === 11 ? (setMonth(0), setYear((y) => y + 1)) : setMonth((m) => m + 1);

  function getDayStatus(dateStr) {
    const isPast    = new Date(dateStr) < new Date(today.toDateString());
    const isBlocked = BLOCKED_DATES.includes(dateStr);
    if (isPast || isBlocked) return "unavailable";
    const bookedSlots = bookedSlotsMap[dateStr] || [];
    if (bookedSlots.length >= TIME_SLOTS.length) return "full";
    return "available";
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth} className="w-8 h-8 rounded-full hover:bg-[#E8F5F5] flex items-center justify-center transition-colors">
          <svg className="w-4 h-4 text-[#2D6B6B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="text-sm font-bold text-[#1A3D3D]">{MONTH_NAMES[month]} {year}</span>
        <button onClick={nextMonth} className="w-8 h-8 rounded-full hover:bg-[#E8F5F5] flex items-center justify-center transition-colors">
          <svg className="w-4 h-4 text-[#2D6B6B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-7 mb-2">
        {DAY_NAMES.map((d) => (
          <div key={d} className="text-center text-[10px] font-bold text-gray-400 py-1">{d}</div>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-10">
          <div className="w-6 h-6 border-2 border-[#2D8080] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-7 gap-y-1">
          {cells.map((day, i) => {
            if (!day) return <div key={`e-${i}`} />;
            const dateStr = `${year}-${pad(month + 1)}-${pad(day)}`;
            const status  = getDayStatus(dateStr);
            return (
              <button
                key={dateStr}
                disabled={status !== "available"}
                onClick={() => status === "available" && onSelectDate(dateStr)}
                title={status === "full" ? "Fully booked" : status === "unavailable" ? "Not available" : ""}
                className={`mx-auto w-9 h-9 rounded-full text-sm font-medium transition-all
                  ${status === "available"
                    ? "bg-[#2D8080] text-white hover:bg-[#236B6B] hover:scale-110 shadow-sm cursor-pointer"
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
      )}

      <div className="flex items-center gap-4 mt-4 pt-3 border-t border-gray-100 flex-wrap">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#2D8080]" />
          <span className="text-xs text-gray-400">Available</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-100 border border-red-300" />
          <span className="text-xs text-gray-400">Fully Booked</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-gray-200" />
          <span className="text-xs text-gray-400">Unavailable</span>
        </div>
      </div>
    </div>
  );
}

// ── Booking Dialog ────────────────────────────────────────────────────────────
function BookingDialog({ date, bookedSlotsMap, onClose, onConfirm, prefillSubject }) {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", time: "", subject: prefillSubject || "", message: "",
  });
  const [status, setStatus]     = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const takenSlots     = bookedSlotsMap[date] || [];
  const availableSlots = TIME_SLOTS.filter((s) => !takenSlots.includes(s));

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.time) { setErrorMsg("Please select a time slot."); return; }
    setStatus("submitting");
    setErrorMsg("");

    const slotTaken = await isSlotBooked(date, form.time);
    if (slotTaken) {
      setStatus("error");
      setErrorMsg("That time slot was just taken. Please pick another.");
      return;
    }

    const bookingData = { ...form, date };
    const saveResult = await saveBooking(bookingData);
    if (!saveResult.success) {
      setStatus("error");
      setErrorMsg("Failed to save your booking. Please try again.");
      return;
    }

    await sendBookingEmail(bookingData);
    setStatus("success");
    setTimeout(() => { onConfirm(date, form.time); onClose(); }, 2500);
  };

  // Badge color based on therapy type
  const subjectColor = form.subject === "Couples Therapy"
    ? "bg-[#4A6741]"
    : form.subject === "Individual Therapy"
    ? "bg-[#3D4F8F]"
    : "bg-[#2D8080]";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ backgroundColor: "rgba(30,42,74,0.45)", backdropFilter: "blur(4px)" }}
      onClick={status !== "submitting" ? onClose : undefined}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-7 relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {status !== "submitting" && (
          <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
            <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        {/* Success */}
        {status === "success" && (
          <div className="text-center py-8 space-y-3">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-extrabold text-[#1A3D3D]">Booking Confirmed!</h3>
            <p className="text-sm text-gray-400">
              Appointment on <span className="font-bold text-[#2D8080]">{formatDate(date)}</span> at{" "}
              <span className="font-bold text-[#2D8080]">{formatTime(form.time)}</span>.
              <br />The therapist has been notified.
            </p>
          </div>
        )}

        {/* Error */}
        {status === "error" && (
          <div className="space-y-4">
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-600">{errorMsg}</div>
            <button onClick={() => setStatus("idle")} className="w-full bg-gray-100 text-gray-600 font-semibold py-3 rounded-xl hover:bg-gray-200 transition-colors">
              Try Again
            </button>
          </div>
        )}

        {/* Form */}
        {(status === "idle" || status === "submitting") && (
          <>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-xl font-extrabold text-[#1A3D3D]">Book Appointment</h3>
              {/* Therapy type badge — shown if prefilled */}
              {form.subject && (
                <span className={`text-xs font-bold text-white px-3 py-1 rounded-full ${subjectColor}`}>
                  {form.subject}
                </span>
              )}
            </div>
            <p className="text-xs text-[#2D8080] font-semibold mb-5">📅 {formatDate(date)}</p>

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
                    required
                    value={form.time}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#2D8080] transition-colors bg-white"
                  >
                    <option value="">Select time</option>
                    {TIME_SLOTS.map((slot) => {
                      const isTaken = takenSlots.includes(slot);
                      return (
                        <option key={slot} value={isTaken ? "" : slot} disabled={isTaken}>
                          {formatTime(slot)}{isTaken ? " — Taken" : ""}
                        </option>
                      );
                    })}
                  </select>
                  {availableSlots.length === 0 && (
                    <p className="text-xs text-red-400 mt-1">No slots left for this day.</p>
                  )}
                </div>
              </div>

              {/* Subject — pre-filled but still editable */}
              <div>
                <label className="text-xs font-semibold text-[#1A3D3D] mb-1 block">
                  Session Type
                  {form.subject && <span className="ml-1 text-[#2D8080] font-normal">(pre-selected from your choice)</span>}
                </label>
                <select
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#2D8080] transition-colors bg-white"
                >
                  <option value="">Select session type</option>
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
                disabled={status === "submitting" || availableSlots.length === 0}
                whileHover={status !== "submitting" ? { scale: 1.02 } : {}}
                whileTap={status !== "submitting" ? { scale: 0.98 } : {}}
                className="w-full bg-[#2D8080] text-white font-semibold text-sm py-3.5 rounded-xl shadow-md hover:bg-[#236B6B] transition-colors mt-1 flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {status === "submitting" ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Confirming...
                  </>
                ) : "Confirm Appointment"}
              </motion.button>
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

// ── Main Section ──────────────────────────────────────────────────────────────
export default function ContactSection({ bookedSlotsMap = {}, loading = true, onBookingConfirm }) {
  const [selectedDate,  setSelectedDate]  = useState(null);
  const [confirmedList, setConfirmedList] = useState([]);

  const handleConfirm = (date, time) => {
    onBookingConfirm?.(date, time);
    setConfirmedList(prev => [...prev, { date, time }]);
  };

  return (
    <section id="contact" className="relative overflow-hidden">

      {/* TOP: BG image + overlay + heading */}
      <div className="relative">
        <img src="/images/home/contact-bg.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(107,127,212,0.75) 0%, rgba(74,93,170,0.82) 100%)" }} />
        <div className="relative z-10 text-center px-6 pt-20 pb-72">
          <motion.p initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="text-xs font-bold tracking-[0.18em] uppercase text-white/80 mb-3">
            Get A Quote
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl lg:text-4xl font-extrabold text-white leading-snug max-w-3xl mx-auto">
            Take <span className="text-[#c7d0f8]">The first step</span> toward a{" "}
            <span className="text-[#c7d0f8]">healthier</span> mind.
            <br />Join us today and start your journey to{" "}
            <span className="text-[#c7d0f8]">well-being!</span>
          </motion.h2>


        </div>
      </div>

      {/* BOTTOM: White */}
      <div className="bg-white px-6 pb-20">
        <div className="max-w-5xl mx-auto -mt-52 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">

            {/* LEFT: Calendar */}
            <div className="p-8 border-r border-gray-100">
              <h3 className="text-lg font-extrabold text-[#1A3D3D] mb-1">Select an Available Date</h3>
              <p className="text-xs text-gray-400 mb-6">
                {loading ? "Loading..." : "Click any date to see available time slots."}
              </p>

              <Calendar
                onSelectDate={setSelectedDate}
                bookedSlotsMap={bookedSlotsMap}
                loading={loading}
              />

              {confirmedList.length > 0 && (
                <div className="mt-5 pt-4 border-t border-gray-100">
                  <p className="text-xs font-bold text-[#2D8080] mb-2">Your bookings this session:</p>
                  {confirmedList.map((b, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#2D8080]" />
                      {formatDate(b.date)} at {formatTime(b.time)}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT: Contact info */}
            <div className="p-8 flex flex-col gap-6" style={{ background: "linear-gradient(145deg, #2D9E9E 0%, #1F7A7A 100%)" }}>
              <div>
                <h3 className="text-xl font-extrabold text-white leading-snug">Need Any Help? Get In Touch With Us</h3>
                <p className="text-xs text-white/70 mt-2 leading-relaxed">
                  Every small step counts. We're committed to walking with you through difficult moments, encouraging progress, and nurturing your journey toward lasting mental and emotional recovery.
                </p>
              </div>
              <div className="space-y-5">
                {[
                  { icon: <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>, label: "Call us anytime", value: "(555) 123-4567" },
                  { icon: <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>, label: "Email us", value: "Info@Yourmail.Com" },
                  { icon: <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>, label: "Our location", value: "123 Serenity Lane,\nBlissfield, CA 90210, US." },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">{item.icon}</div>
                    <div>
                      <p className="text-xs text-white/70">{item.label}</p>
                      <p className="text-sm font-bold text-white whitespace-pre-line">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {selectedDate && (
          <BookingDialog
            date={selectedDate}
            bookedSlotsMap={bookedSlotsMap}
            onClose={() => setSelectedDate(null)}
            onConfirm={handleConfirm}
          />
        )}
      </AnimatePresence>
    </section>
  );
}