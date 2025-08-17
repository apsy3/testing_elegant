import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata = {
  title: "Elegance Threads — Premium Leather Goods",
  description: "Premium leather, modern lines. Craft that carries."
};

export default function RootLayout({ children }){
  return (
    <html lang="en"><body><Header />{children}<Footer /></body></html>
  )
}