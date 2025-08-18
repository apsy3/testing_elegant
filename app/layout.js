import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata = {
  title: "Elegance Threads — Premium Leather Goods",
  description: "Premium leather, modern, minimalist UI for clarity and trust.",
};
export default function RootLayout({ children }){
  return <html lang="en"><body><Header />{children}<Footer /></body></html>
}