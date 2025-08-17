/***** Tailwind Config *****/
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}","./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        leather: "#5A3B2E",
        leatherDark: "#3E2A21",
        gold: "#C7A86A",
        ink: "#0F0F0F",
        ash: "#1A1A1A",
        slate: "#1e2a38",
        bone: "#F5EFE9"
      },
      boxShadow: {
        card: "0 12px 28px rgba(0,0,0,.18)",
        subtle: "0 6px 16px rgba(0,0,0,.12)"
      },
      borderRadius: { xl: "14px", '2xl': "18px" }
    }
  },
  plugins: []
};
