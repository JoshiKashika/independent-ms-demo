module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./node_modules/@yext/search-ui-react/**/*.{js,ts,jsx,tsx}", // New
  ],
  theme: {
    container: {
      center: true,
    },
    colors: {
      transparent: "transparent",
      outline: "#2d5ab3",
      outlineBlack: "#101010",
      LightGray: "#6d6e71",
      BtnGray: "#aaa",
      LightBlue: "#8abee0",
      DarkBlue: "#293651",
      BorderGray: "#d3d3d3",
      orange: "#ce4a36",
      white: "#FFFFFF",
      whiteLight: "#e9edf5",
      black: "#000000",
      grayOther: "#cccccc",
      orangeHover: "#a92914",      
    },

    fontFamily: {
      primary: ["Roboto"],
    },

    extend: {
      backgroundImage: {
        phoneBlue: "url('../../assets/images/phone-blue.svg')",
        phonewhite: "url('../../assets/images/phone-white.svg')",
        placeBlue: "url('../../assets/images/place-blue.svg')",
        arrow: "url('../../assets/images/chevron-blue.svg')",
        arrowRed: "url('../../assets/images/chevron-red.svg')",
        dollorBlue: "url('../../assets/images/dollar-blue.svg')", 
        mailBlue: "url('../../assets/images/mail-blue.svg')",         
        chevronBlack: "url('../../assets/images/chevron-black.svg')",         
      },
    },

    screens: {
 
      xs: "576px",
      // => @media (min-width: 576px) { ... }

      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "992px",
      // => @media (min-width: 992px) { ... }

      xl: "1200px",
      // => @media (min-width: 1200px) { ... }
 
     },
  },
  plugins: [],
};
