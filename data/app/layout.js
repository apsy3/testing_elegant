import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
export const metadata = { title: "Elegance Threads — Aurora", description: "Premium leather goods with a modern expressive aesthetic." };
export default function RootLayout({ children }){ return <html lang="en"><body><Header />{children}<Footer /></body></html> }