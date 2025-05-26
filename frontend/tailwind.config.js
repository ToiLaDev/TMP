/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  // eslint-disable-next-line no-undef
  plugins: [require('tailwindcss-primeui')]
}
