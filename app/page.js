import Link from "next/link";
import products from "./data";

export default function Home(){
  const featured = products.slice(0,4);
  return (
    <main>
      <section className="relative overflow-hidden bg-gradient-to-b from-leather to-leatherDark">
        <div className="absolute -right-40 -top-40 w-[900px] h-[900px] opacity-30 rotate-12" style={{backgroundImage:'url(/assets/pattern.svg)'}}/>
        <div className="container py-24">
          <h1 className="h1">Elegance Threads</h1>
          <p className="lead mt-2">Premium leather, modern lines. <span className="text-gold font-semibold">Craft that carries.</span></p>
          <div className="mt-5 flex gap-3 flex-wrap">
            <a href="/products" className="btn btn-solid">Explore Products</a>
            <a href="/craft" className="btn btn-ghost">Our Craft</a>
          </div>
        </div>
      </section>

      <section className="container py-12">
        <header className="mb-4">
          <h2 className="h2">Featured Products</h2>
          <p className="text-bone/90">A small selection to showcase the look & feel.</p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map(p=> (
            <div key={p.slug} className="card">
              <a href={`/products/${p.slug}`}>
                <div className="aspect-[9/6] bg-[#161616]">
                  <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover"/>
                </div>
              </a>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="h3">{p.name}</h3>
                  <span>₹{p.price.toLocaleString('en-IN')}</span>
                </div>
                <p className="text-bone/90 mt-1">{p.short}</p>
                <div className="mt-3 flex gap-2 flex-wrap">
                  <span className="badge">Premium leather</span>
                  <span className="badge">Gold hardware</span>
                </div>
                <div className="mt-4 flex gap-2">
                  <a href={`/products/${p.slug}`} className="btn btn-ghost">View</a>
                  <button className="btn btn-solid" onClick={()=>{
                    const cart = JSON.parse(localStorage.getItem('cart')||'[]');
                    const ex = cart.find(i=>i.slug===p.slug);
                    if(ex){ ex.qty+=1 } else { cart.push({slug:p.slug, name:p.name, price:p.price, img:p.images[0], qty:1}) }
                    localStorage.setItem('cart', JSON.stringify(cart));
                    alert('Added to cart');
                  }}>Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <Link className="btn btn-ghost" href="/products">View all products →</Link>
        </div>
      </section>
    </main>
  )
}
