/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"    // ✅ 這行一定要有
  ],
  safelist: [
    {
      pattern: /bg-\[url\(.*\)\]/, // 允許 url 類的背景類別
    },
  ],
  theme: {
    extend: {
      backgroundImage: {
        ginza: "url('/image/ginza-night.jpg')",
      }, 
      fontFamily: {
        zen: ['"Zen Kaku Gothic New"', 'sans-serif']
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

