/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      zIndex: {
        1: 1
      },
      colors: {
        lightpink: "#ffcccc"
      }
    },
  },
  plugins: [],
}
