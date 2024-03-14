/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html", "./src/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                "primary": "#272831",
                "header": "#121314",
                "btn-hover": "#262727",
                "accent": "#167dff",
                "item-hover": "#2e3338",
                "border": "#414248",
            },
        },
    },
    plugins: [
        require("@tailwindcss/typography")
    ],
};
