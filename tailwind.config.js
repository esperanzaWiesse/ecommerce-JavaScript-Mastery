/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        rubik: ['Rubik-Regular', 'sans-serif'],
        "rubik-bold": [ "Rubik-Bold", "sans-serif"],
        "rubik-extraBold": [ "Rubik-ExtraBold", "sans-serif"],
        "rubik-ligh": [ "Rubik-Ligh", "sans-serif"],
        "rubik-medium": [ "Rubik-Medium", "sans-serif"],
        "rubik-semiBold": [ "Rubik-SemiBold", "sans-serif"],
        "rubik-light": [ "Rubik-Light", "sans-serif"],
      },
      // colores por variantes
      colors: {
        // todos los colores a continuacion son degradados del color primario 
        "primary": {
          100: '#0061FF0A', // degradado 10%
          200: '#0061FF1A', // degradado 4%
          300: '#0061FF',  // desgradado 0%
        },
        accent: {
          100: '#FBFBFD'
        },
        black: {
          DEFAULT: '#000000',
          100: "#8C8E98",
          200: "#666876",
          300: "#191d31",
        },
        danger: "#F75555",
      }
      // los colores se puden poner de esta forma tambien, cuando son colores diferentes
      // colors: {
      //   "primary": "#FF6A00",
      //   "secondary": "#FFA400",
      //   "tertiary": "#FFD700",
      //   "dark": "1A1A1A",
      //   "light": "F5F5F5",
      //   "white": "FFFFFF",
      // }
    },
  },
  plugins: [],
}