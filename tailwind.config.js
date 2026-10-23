/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bmw: {
          blue: '#1c69d4',
          darkBlue: '#002664',
          red: '#e7222e',
          dark: '#08090b',
          card: '#101216',
          border: '#1f242d',
          accent: '#2563eb'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Syncopate', 'sans-serif']
      }
    },
  },
  plugins: [],
}
