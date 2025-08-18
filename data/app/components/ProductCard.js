'use client'
import Tilt from "./Tilt";
import AddToCart from "./AddToCart";
export default function ProductCard({ p }){
  return (
    <Tilt className="card">
      <div className="media aspect-[4/3] bg-[#1a1a1a]">
        <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
      </div>
      <div className="p-4 text-white">
        <div className="flex items-center justify-between">
          <div className="font-semibold">{p.name}</div>
          <div className="text-white/90">₹{p.price.toLocaleString('en-IN')}</div>
        </div>
        <p className="text-white/70 text-sm mt-1">{p.short}</p>
        <div className="mt-3 flex gap-2">
          <a href={`/products/${p.slug}`} className="btn btn-ghost">View</a>
          <AddToCart slug={p.slug} name={p.name} price={p.price} img={p.image} />
        </div>
      </div>
    </Tilt>
  )
}