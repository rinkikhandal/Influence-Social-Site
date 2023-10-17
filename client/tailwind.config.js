/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-dark": "#2f3e46",
        "primary-green-1": "#354f52",
        "primary-green-2": "#52796f",
        "secondary-green-1": "#84a98c",
        // "for-icons-1": "#295a44",
        "tertiary-green-1": "#cad2c5",
        "absolute-green": "#00ff00",
        "login-gradient": "rgba(255, 255, 255, 0.7)",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        young: ["Young Serif", "serif"],
        poppins: ["Poppins", "sans-serif"],
        lobster: ["Lobster", "cursive"],
        pacifico: ["Pacifico", "cursive"],
        "roboto-slab": ["Roboto Slab", "serif"],
        geologica: ["Geologica", "sans-serif"],
        vietnam: ["Be Vietnam Pro", "sans-serif"],
      },
      backgroundImage: {
        galaxy:
          "url('./public/images/galaxy.jpg') center/cover fixed no-repeat",
      },
      gridTemplateColumns: {
        "nav-grid": "1fr 1fr",
        "header-grid-md": "3fr 0.8fr",
        "header-grid-sm": "1fr 0.3fr ",
        "header-grid-lg": "3fr 0.5fr",
        // "header"
      },
      keyframes: {
        myCustomAnimation: {
          "0%": { transform: "scale(0.8) " },
          "50%": { transform: "scale(1.25)" },
          "100%": { transform: "scale(0.8)" },
        },
      },
      animation: {
        "custom-scale": "myCustomAnimation 1s ease infinite",
      },
      transitionProperty: {
        transitionCustom: "all ease 0.5s",
      },
    },
  },
  plugins: [],
};
