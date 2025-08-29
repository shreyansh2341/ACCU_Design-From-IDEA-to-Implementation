/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{html,js,jsx,tsx,ts}"
  ],
  theme: {
    extend: {
      animation: {
        'show-right': 'showRight 1s ease-in-out forwards',
        'spin-slow': 'spin 4s linear infinite',
        'spin-reverse': 'spin-reverse 4s linear infinite',
        'fill': 'fillEffect 1s forwards',
        blob: 'blob 7s infinite',
      },
      keyframes: {
        'spin-reverse': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(-360deg)' },
        },
                showRight: {
          '100%': { width: '0%' },
        },
        fillEffect: {
          '0%': { width: '0%' },
          '100%': { width: '100%' }
        },
        blob: {
          '0%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
          '33%': {
            transform: 'translate(30px, -50px) scale(1.1)',
          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.9)',
          },
          '100%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
        },
      }
    },
  },
  plugins: [],
}