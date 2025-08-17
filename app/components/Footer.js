export default function Footer(){
  return (
    <footer className="border-t border-gold/20 bg-[#0c0c0c]">
      <div className="container flex flex-wrap items-center justify-between gap-3 py-6">
        <div className="flex items-center gap-3">
          <img src="/assets/logo.svg" className="h-7" alt="" />
          <p className="text-bone/90">© {new Date().getFullYear()} Elegance Threads</p>
        </div>
        <div className="flex gap-4">
          <a href="/shipping-returns">Shipping & Returns</a>
          <a href="/warranty">Warranty</a>
          <a href="/journal">Journal</a>
        </div>
      </div>
    </footer>
  )
}