export const metadata = {
  title: "Elegance — Leather Goods",
  description: "Minimal, cinematic leather goods — crafted in India."
};

import "./../styles/globals.css";

export default function RootLayout({ children }){
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin=""/>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@500;600&display=swap" rel="stylesheet"/>
      </head>
      <body>
        <header className="header">
          <div className="container nav">
            <a className="brand" href="/"><img src="/images/logo.png" alt="Elegance logo"/><span>ELEGANCE</span></a>
            <nav className="menu">
              <a href="/collection">Women</a>
              <a href="/collection">Men</a>
              <a href="/collection">Travel</a>
              <a href="/about">Craft</a>
              <a className="cta" href="/collection">Shop now</a>
            </nav>
          </div>
        </header>
        {children}
        <footer className="footer">
          <div className="container cols">
            <div>
              <div className="brand"><img src="/images/logo.png" alt="logo"/><span>ELEGANCE</span></div>
              <p style={{maxWidth:460}}>Premium leather goods designed in India. Minimal, functional, beautiful.</p>
            </div>
            <div>
              <strong>Company</strong><br/>
              <a href="/about">About</a><br/>
              <a href="#">Shipping & Returns</a><br/>
              <a href="#">Warranty</a>
            </div>
            <div>
              <strong>Newsletter</strong>
              <p>Quality, not spam.</p>
              <input type="email" placeholder="your@email.com"/>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
