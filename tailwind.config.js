/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#DDF2FD", // background and text on buttons
        window: "#9BBEC8", // modal pages
        text: "#164863", // Text
        accent: "#427D9D", // background color for buttons
      },
    },
  },
  plugins: [require("daisyui")],
};
