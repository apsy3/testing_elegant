module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}","./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: { ink:"#0B0B0B", bone:"#F5F3EF", line:"#E8E4DC", gold:"#D4AF37" },
      boxShadow: { glow: "0 10px 40px rgba(212,175,55,.25)", card: "0 20px 40px rgba(0,0,0,.10)" }
    }
  },
  plugins: []
};