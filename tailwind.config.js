/** @type {import("tailwindcss").Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#161a1f",
        secondary: "#20252b",
        tertiary: "#394147",
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
    },
  },
  plugins: [],
};
