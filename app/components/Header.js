export default function Header(){
  return (
    <header className="border-b border-[#E5E7EB] bg-white sticky top-0 z-20">
      <div className="container flex items-center justify-between py-3">
        <a href="/" className="flex items-center gap-3">
          <img src="/assets/logo.svg" alt="Elegance Threads" className="h-8 w-auto"/>
        </a>
        <nav className="flex items-center gap-4 text-sm">
          <a href="/products">Shop</a>
          <a href="/about">About</a>
          <a href="/craft">Craft</a>
          <a href="/faq">FAQ</a>
          <a href="/contact">Contact</a>
          <a href="/cart" className="btn">Cart</a>
        </nav>
      </div>
    </header>
  )
}