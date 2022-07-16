/** @type {import('tailwindcss').Config} */
module.exports = {
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
