/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cultural: {
          purple: '#6B46C1',
          orange: '#ED8936',
        },
      },
    },
  },
  plugins: [],
};