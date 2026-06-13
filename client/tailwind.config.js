/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          cream: '#FBF9F4',
          surface: '#FFFFFF',
          sand: '#EEF1E8',
          border: '#DCE3D4',
          ink: '#23291F',
          'ink-light': '#6E7568',
          accent: '#D9A23B',
          'accent-dark': '#B9842A',
          'accent-light': '#F7E6BD',
          green: '#0C3D26',
          'green-light': '#13502F',
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
