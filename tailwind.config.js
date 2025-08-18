module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}","./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        et_black: "#0A0A0A",
        et_white: "#FFFFFF",
        et_grey: "#F3F4F6",
        et_line: "#E5E7EB",
        et_text: "#111827",
        et_muted: "#6B7280",
        et_gold: "#C7A86A"
      },
      fontFamily: { ui: ['Inter','ui-sans-serif','system-ui','-apple-system','Segoe UI','Roboto','Arial','sans-serif'] }
    }
  }, plugins: []
};