/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html", "./src/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                "primary": "#23272b",
                "header": "#121314",
                "accent": "#167dff",
                "item-hover": "#2e3338",
                "header-item-hover": "#252626",
                "border": "#414248",
            },
        },
    },
    plugins: [
        require("@tailwindcss/typography")
    ],
};
