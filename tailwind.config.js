/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,js,jsx}", "./components/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        primaryBg: '#0F172A',
        secondaryBg: '#1A2847',
        accent: '#06B6D4'
      },
      fontFamily: {
        geist: ['Geist', 'ui-sans-serif', 'system-ui']
      }
    }
  },
  plugins: []
}
