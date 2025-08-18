export default function Footer(){
  return (
    <footer className="bg-[#0c0c0c] border-t border-white/10 text-white">
      <div className="container py-10 grid md:grid-cols-3 gap-8">
        <div><div className="text-white font-semibold mb-2">Elegance Threads</div>
          <p className="text-white/70 text-sm">Premium leather goods. Designed with intention.</p></div>
        <div><div className="text-white font-semibold mb-2">Support</div>
          <ul className="text-white/80 text-sm space-y-1">
            <li><a href="/shipping-returns">Shipping & Returns</a></li>
            <li><a href="/warranty">Warranty</a></li>
            <li><a href="/faq">FAQ</a></li>
          </ul></div>
        <div><div className="text-white font-semibold mb-2">Follow</div>
          <p className="text-white/70 text-sm">Instagram · Pinterest · LinkedIn</p></div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/60">© {new Date().getFullYear()} Elegance Threads</div>
    </footer>
  )
}