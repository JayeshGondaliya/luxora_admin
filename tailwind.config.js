/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "hsl(36, 100%, 50%)",
          foreground: "#fff",
        },
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        muted: {
          DEFAULT: "hsl(var(--muted-foreground))",
        },
        accent: "hsl(var(--accent))",
        "accent-foreground": "hsl(var(--accent-foreground))",
      },
      borderRadius: {
        DEFAULT: "0.5rem",
      },
    },
  },
  plugins: [],
};
