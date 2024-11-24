module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3575E2",  // Name your color (e.g., 'primary')
        secondary: "#0D2550", // Another reusable color
        dark: "#20242C",      // Add your third hex code
      },
      fontFamily: {
        sans: ['Lexend', 'sans-serif'], // Set Lexend as the default sans-serif font
      },
    },
  },
  plugins: [],
};
