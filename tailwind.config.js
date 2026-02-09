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
        pastelPink: "#F5B8DB",
        pastelGreen: "#9AAB63",
        pastelBlue: "#B6CAEB",
        pastelYellow: "#F5D867",
        primary: "#9AAB63",
        secondary: "#F5D867",
      }

    },
  },
  plugins: [],
}
