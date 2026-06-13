/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          cream: '#F6F8F4',
          surface: '#FFFFFF',
          sand: '#E9EFE4',
          border: '#D4E0CC',
          ink: '#13321F',
          'ink-light': '#5C6E5C',
          accent: '#D9A23B',
          'accent-dark': '#B9842A',
          'accent-light': '#F7E6BD',
          green: '#0C3D26',
          'green-dark': '#0A2E1B',
          'green-light': '#1F5C39',
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
