/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito-Regular"],
        'nunito-light': ["Nunito-Light"],
        'nunito- bold': ["Nunito-Bold"],
        'nunito-black': ["Nunito-Black"],

      },
      colors: {

      }

    },
  },
  plugins: [],
}

