/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6B7FD4",
        "primary-dark": "#4A5DAA",
        "primary-light": "#E8EBFA",
        accent: "#3D4F6B",
        "green-badge": "#4A6741",
      },
      fontFamily: {
        heading: ["'Playfair Display'", "serif"],
        body: ["'DM Sans'", "sans-serif"],
      },
    },
  },
  plugins: [],
};