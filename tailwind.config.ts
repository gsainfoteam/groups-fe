/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",

        dark: "var(--grey900)",
        secondaryText: "var(--grey400)",
        white: "var(--white)",
        deselected: "var(--grey200)",
        grey: "var(--grey300)",
        greyDark: "var(--grey500)",
        greyBorder: "var(--grey200)",
        greyLight: "var(--grey100)",

        d_dark: "var(--d_grey900)",
        d_greyDark: "var(--d_grey100)",
        d_greyBorder: "var(--d_grey300)",
        d_grey: "var(--d_grey500)",
        d_white: "var(--d_white)",
        d_secondary: "var(--d_secondary)",
      },
      spacing: {
        pageSide: "20vw",
      },
    },
  },
  plugins: [],
};
