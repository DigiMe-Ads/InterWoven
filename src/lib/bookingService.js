import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  Timestamp,
} from "firebase/firestore";

const BOOKINGS_COLLECTION = "bookings";

// ── Time Slots Config ─────────────────────────────────────────────────────────
// Edit this array to set the available time slots for every working day.
// Format: "HH:MM" in 24hr or "H:MM AM/PM" — displayed as-is to the user.
export const TIME_SLOTS = [
  "09:00", "09:30",
  "10:00", "10:30",
  "11:00", "11:30",
  "12:00",
  "13:00", "13:30",
  "14:00", "14:30",
  "15:00", "15:30",
  "16:00", "16:30",
  "17:00",
];

// ── Blocked Dates Config ──────────────────────────────────────────────────────
// Hardcode any dates that should be completely unavailable regardless of bookings.
// e.g. public holidays, therapist leave, etc.
export const BLOCKED_DATES = [
  // "2026-04-18", // Good Friday example
  // "2026-04-25", // ANZAC day example
];

// ── Fetch booked slots for a specific date ────────────────────────────────────
/**
 * Returns array of booked time strings for a given date.
 * e.g. ["09:00", "10:30"]
 */
export async function getBookedSlotsForDate(dateStr) {
  try {
    const q = query(
      collection(db, BOOKINGS_COLLECTION),
      where("date", "==", dateStr)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => doc.data().time).filter(Boolean);
  } catch (err) {
    console.error("Error fetching slots for date:", err);
    return [];
  }
}

// ── Fetch all bookings grouped by date ───────────────────────────────────────
/**
 * Returns a map of { "YYYY-MM-DD": ["09:00", "10:30", ...] }
 * Used to determine which dates are fully booked.
 */
export async function getAllBookedSlots() {
  try {
    const snapshot = await getDocs(collection(db, BOOKINGS_COLLECTION));
    const map = {};
    snapshot.docs.forEach((doc) => {
      const { date, time } = doc.data();
      if (!date) return;
      if (!map[date]) map[date] = [];
      if (time) map[date].push(time);
    });
    return map;
  } catch (err) {
    console.error("Error fetching all booked slots:", err);
    return {};
  }
}

// ── Check if a specific slot is taken ────────────────────────────────────────
export async function isSlotBooked(dateStr, timeStr) {
  try {
    const q = query(
      collection(db, BOOKINGS_COLLECTION),
      where("date", "==", dateStr),
      where("time", "==", timeStr)
    );
    const snapshot = await getDocs(q);
    return !snapshot.empty;
  } catch (err) {
    console.error("Error checking slot:", err);
    return false;
  }
}

// ── Save Booking ──────────────────────────────────────────────────────────────
export async function saveBooking(bookingData) {
  try {
    const docRef = await addDoc(collection(db, BOOKINGS_COLLECTION), {
      ...bookingData,
      createdAt: Timestamp.now(),
    });
    return { success: true, id: docRef.id };
  } catch (err) {
    console.error("Error saving booking:", err);
    return { success: false, error: err.message };
  }
}

// ── Send Email via Web3Forms ──────────────────────────────────────────────────
export async function sendBookingEmail(bookingData) {
  const { name, email, phone, time, subject, message, date } = bookingData;

  const payload = {
    access_key: import.meta.env.VITE_WEB3FORMS_KEY,
    subject: `New Appointment — ${name} on ${date} at ${time}`,
    from_name: name,
    email: email,
    replyto: email,
    message: `
New appointment booking received:

👤 Patient Name:   ${name}
📧 Email:          ${email}
📞 Phone:          ${phone || "Not provided"}
📅 Date:           ${date}
🕐 Time:           ${time}
📋 Subject:        ${subject || "Not specified"}

💬 Message:
${message || "No message provided"}

—
Submitted via the InterWoven website.
    `.trim(),
  };

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    return { success: data.success };
  } catch (err) {
    console.error("Error sending email:", err);
    return { success: false };
  }
}