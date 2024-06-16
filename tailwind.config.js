/** @type {import("tailwindcss").Config} */
export default {
    content: [
        "./index.html", "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "primary": "var(--primary)",
                "secondary": "var(--secondary)",
                "tertiary": "var(--tertiary)",
                "accent": "var(--accent)",
                "header-primary": "var(--header-primary)",
                "header-secondary": "var(--header-secondary)",
                "border": "var(--border)",
                "text-primary": "var(--text-primary)",
                "text-secondary": "var(--text-secondary)",
                "text-tertiary": "var(--text-tertiary)",
                "close-primary": "var(--close-primary)",
                "close-secondary": "var(--close-secondary)",
            },
        },
    },
    plugins: [
        require("@tailwindcss/typography"),
    ],
};
