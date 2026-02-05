/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        primary: "#24305e",
        secondary: "#f8e9a180",
      },
      fontFamily: {
        brand: ["Lilita One", "cursive"],
      },
    },
  },
  plugins: [],
};