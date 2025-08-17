import products from "../../data";

export async function generateStaticParams(){
  return products.map(p=>({ slug: p.slug }));
}

export default function Product({ params }){
  const p = products.find(x=> x.slug === params.slug);
  if(!p) return <main className="container py-10"><p>Product not found.</p></main>;

  return (
    <main className="container py-10 grid md:grid-cols-2 gap-8 items-start">
      <div className="rounded-xl overflow-hidden border border-gold/20 bg-[#141414] shadow-subtle">
        <img src={p.images[0]} alt={p.name} className="w-full h-auto"/>
      </div>
      <div>
        <h1 className="h2">{p.name}</h1>
        <p className="mt-1 text-bone/80">{p.short}</p>
        <div className="mt-2 text-gold text-xl font-semibold">₹{p.price.toLocaleString('en-IN')}</div>
        <div className="mt-4 space-y-2">
          <div><b>Material:</b> {p.material}</div>
          <div><b>Hardware:</b> {p.hardware}</div>
          <div><b>Dimensions:</b> {p.dimensions} · <b>Weight:</b> {p.weight}</div>
          <div><b>Warranty:</b> {p.warranty}</div>
        </div>
        <ul className="mt-4 grid grid-cols-1 gap-2">
          {p.features.map((f,i)=>(<li key={i}>◆ {f}</li>))}
        </ul>
        <div className="mt-6 flex gap-2">
          <button className="btn btn-solid" onClick={()=>{
            const cart = JSON.parse(localStorage.getItem('cart')||'[]');
            const existing = cart.find(i=>i.slug===p.slug);
            if(existing){ existing.qty+=1 } else { cart.push({slug:p.slug, name:p.name, price:p.price, img:p.images[0], qty:1}) }
            localStorage.setItem('cart', JSON.stringify(cart));
            alert('Added to cart');
          }}>Add to Cart</button>
          <a href="/cart" className="btn btn-ghost">Go to Cart</a>
        </div>
        <p className="mt-6">{p.description}</p>
      </div>
    </main>
  )
}
