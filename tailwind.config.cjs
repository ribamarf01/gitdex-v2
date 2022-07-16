/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["index.html", "./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        "pop": ["Poppins", 'sans-serif']
      }
    },
  },
  plugins: [],
}
