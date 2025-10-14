/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        gold: '#C0A062',
        charcoal: '#111111',
        fog: '#F7F5F2'
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'serif'],
        sans: ['var(--font-inter)', 'sans-serif']
      },
      boxShadow: {
        soft: '0 20px 40px -20px rgba(17, 17, 17, 0.15)'
      }
    }
  },
  plugins: []
};

module.exports = config;
