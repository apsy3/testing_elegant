export default function Footer(){
  return (
    <footer className="border-t border-[#E5E7EB] bg-white">
      <div className="container py-10 grid md:grid-cols-3 gap-8 text-sm">
        <div>
          <div className="font-semibold mb-2">Elegance Threads</div>
          <p className="text-gray-600">Premium leather goods. Designed with intention.</p>
        </div>
        <div>
          <div className="font-semibold mb-2">Info</div>
          <ul className="space-y-1 text-gray-700">
            <li><a href="/shipping-returns">Shipping & Returns</a></li>
            <li><a href="/warranty">Warranty</a></li>
            <li><a href="/journal">Journal</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-2">Follow</div>
          <p className="text-gray-600">Instagram · Pinterest · LinkedIn</p>
        </div>
      </div>
      <div className="border-t border-[#E5E7EB] py-4 text-center text-xs text-gray-500">© {new Date().getFullYear()} Elegance Threads</div>
    </footer>
  )
}