/** @type {import("tailwindcss").Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0d0f12",
        secondary: "#171a1e",
        tertiary: "#30363a",
        accent: "#5066ef",
      },
      fontSize: {
        sm: "10px",
        md: "12px",
        lg: "13px",
        xl: "16px",
        "2xl": "18px",
        "3xl": "23px",
      },
      fontFamily: {
        poppins: "Poppins",
      },
    },
  },
  plugins: [],
};
