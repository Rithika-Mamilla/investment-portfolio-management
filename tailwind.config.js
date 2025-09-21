/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f3f0ff',
          100: '#e9e5ff',
          200: '#d6ceff',
          300: '#b8a6ff',
          400: '#9375ff',
          500: '#7c3aed',
          600: '#4b13a0',
          700: '#3c0d7a',
          800: '#320f5c',
          900: '#2a0e4a',
        }
      }
    },
  },
  plugins: [],
}
