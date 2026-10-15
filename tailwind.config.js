/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#9D72FF',
        secondary: '#201938',
        tertiary: '#181427',
        neutral: '#FFFFFF',
        safe: '#22C55E',
        suspicious: '#F59E0B',
        scam: '#EF4444',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
