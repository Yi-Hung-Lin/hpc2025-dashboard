/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"    // ✅ 這行一定要有
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

