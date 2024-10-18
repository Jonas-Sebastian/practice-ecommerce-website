/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'lt-1366': { 'max': '1366px' },
      },
    },
  },
  plugins: [],
};
