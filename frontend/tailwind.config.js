export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        display: ["'Instrument Serif'", "'Space Grotesk'", "serif"],
      },
      colors: {
        ink: "#12213a",
        ink2: "#1a2d4f",
        paper: "#f5f1ea",
        paper2: "#ebe4d6",
        accent: "#c8451f",
        gold: "#c9a961",
        line: "rgba(18, 33, 58, 0.14)",
      },
    },
  },
  plugins: [],
};
