module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        montserrat: [
          "Montserrat",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
        noto: ["Noto Serif", "serif"],
      },
      fontSize: {
        xxl: "12rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
