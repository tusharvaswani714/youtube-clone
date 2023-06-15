/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: {
                    dark: {
                        900: "#0f0f0f",
                        800: "#121212",
                        700: "#222222",
                        600: "#303030",
                    },
                    light: {
                        900: "#f1f1f1",
                        800: "#aaa",
                        700: "#666",
                    },
                },
                secondary: {
                    blue: {
                        900: "#3ea6ff",
                        100: "#263850",
                    },
                },
            },
        },
    },
    plugins: [],
};
