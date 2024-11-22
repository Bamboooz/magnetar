/** @type {import("tailwindcss").Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        "background-secondary": "var(--background-secondary)",
        "background-tertiary": "var(--background-tertiary)",
        foreground: "var(--foreground)",
        "foreground-secondary": "var(--foreground-secondary)",
        "foreground-tertiary": "var(--foreground-tertiary)",
        accent: "var(--accent)",
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
