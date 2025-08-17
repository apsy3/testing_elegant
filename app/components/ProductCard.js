import Link from "next/link";
export default function ProductCard({p}){
  return (
    <article className="card">
      <Link href={`/products/${p.slug}`}>
        <div className="aspect-[9/6] bg-[#161616]">
          <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
        </div>
      </Link>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="h3">{p.name}</h3>
          <span>₹{p.price.toLocaleString("en-IN")}</span>
        </div>
        <p className="text-bone/90 mt-1">{p.short}</p>
        <div className="mt-3 flex gap-2 flex-wrap">
          <span className="badge">Premium leather</span>
          <span className="badge">Gold hardware</span>
        </div>
        <div className="mt-4 flex gap-2">
          <Link href={`/products/${p.slug}`} className="btn btn-ghost">View</Link>
          <button className="btn btn-solid" onClick={()=>{
            const cart = JSON.parse(localStorage.getItem('cart')||'[]');
            const existing = cart.find(i=>i.slug===p.slug);
            if(existing){ existing.qty+=1 } else { cart.push({slug:p.slug, name:p.name, price:p.price, img:p.images[0], qty:1}) }
            localStorage.setItem('cart', JSON.stringify(cart));
            alert('Added to cart');
          }}>Add to Cart</button>
        </div>
      </div>
    </article>
  )
}