/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],  
  theme: {
    extend: {
      keyframes: {
        fall: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      animation: {
        fall: 'fall 2s ease-out',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

