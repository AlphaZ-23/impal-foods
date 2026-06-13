/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          cream: '#FBF8F4',
          surface: '#FFFFFF',
          sand: '#F0E8DC',
          border: '#E6DDD0',
          ink: '#2E2A26',
          'ink-light': '#7A716A',
          accent: '#E0923D',
          'accent-dark': '#C97A2C',
          'accent-light': '#FBE6C8',
        },
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
        display: ['"Fredoka"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};