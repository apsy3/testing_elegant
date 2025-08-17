export default function Header(){
  return (
    <header className="sticky top-0 z-20 border-b border-gold/20 bg-ink/80 backdrop-blur">
      <div className="container flex items-center justify-between py-3">
        <a href="/" className="flex items-center gap-3">
          <img src="/assets/logo.svg" alt="Elegance Threads" className="h-7 w-auto" />
          <span className="sr-only">Elegance Threads</span>
        </a>
        <nav className="flex items-center gap-2 text-bone/90">
          <a href="/products" className="px-3 py-2 rounded-lg hover:bg-white/10">Shop</a>
          <a href="/craft" className="px-3 py-2 rounded-lg hover:bg-white/10">Craft</a>
          <a href="/about" className="px-3 py-2 rounded-lg hover:bg-white/10">About</a>
          <a href="/faq" className="px-3 py-2 rounded-lg hover:bg-white/10">FAQ</a>
          <a href="/contact" className="px-3 py-2 rounded-lg hover:bg-white/10">Contact</a>
          <a href="/cart" className="ml-1 px-3 py-2 rounded-lg bg-gold text-ink font-semibold">Cart</a>
        </nav>
      </div>
    </header>
  )
}