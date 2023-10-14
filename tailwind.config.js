/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#3B66B5'
      }
    }
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light']
  }
}

