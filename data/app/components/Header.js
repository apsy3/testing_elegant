export default function Header(){
  return (
    <header className="sticky top-0 z-30 backdrop-blur bg-black/40 border-b border-white/10">
      <div className="container flex items-center justify-between py-3">
        <a href="/" className="flex items-center gap-3">
          <img src="/assets/logo.svg" alt="Elegance Threads" className="h-8 w-auto"/>
        </a>
        <nav className="flex items-center gap-3 text-sm text-white/90">
          <a href="/products" className="px-3 py-2 rounded hover:bg-white/10">Shop</a>
          <a href="/craft" className="px-3 py-2 rounded hover:bg-white/10">Craft</a>
          <a href="/about" className="px-3 py-2 rounded hover:bg-white/10">About</a>
          <a href="/contact" className="px-3 py-2 rounded hover:bg-white/10">Contact</a>
          <a href="/cart" className="btn btn-gold ml-1">Cart</a>
        </nav>
      </div>
    </header>
  )
}