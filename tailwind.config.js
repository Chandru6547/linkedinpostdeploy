/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        bounceX: {
          "0%": { transform: "translateX(100%)" },
          "50%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        bounceY: {
          "0%": { transform: "translateX(-100%)" },
          "50%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      animation: {
        "bounce-x": "bounceX 40s linear infinite",
        "bounce-y": "bounceY 40s linear infinite",
      },
    },
  },
  plugins: [],
};
