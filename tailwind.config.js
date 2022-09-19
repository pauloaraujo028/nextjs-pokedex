/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "poke-red": "#ee1515",
        "poke-blue": "#2A75BB",
        "poke-yellow": "#FECA1B",
        "poke-black": "#222224",
      },
    },
  },
  plugins: [],
};
