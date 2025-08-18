import products from "../../data";
import AddToCart from "../../components/AddToCart";
export async function generateStaticParams(){ return products.map(p=>({ slug: p.slug })); }
export default function Product({ params }){
  const p = products.find(x=>x.slug===params.slug);
  if(!p) return <main className="container py-10"><p>Not found.</p></main>;
  return (
    <main className="aurora">
      <div className="container py-14 grid md:grid-cols-2 gap-10 relative z-10">
        <div className="card overflow-hidden"><img src={p.image} alt={p.name} className="w-full h-auto"/></div>
        <div className="text-white">
          <h1 className="text-4xl font-extrabold">{p.name}</h1>
          <div className="mt-2 text-xl text-white/90">₹{p.price.toLocaleString('en-IN')}</div>
          <p className="mt-3 text-white/80">{p.short}</p>
          <div className="mt-5 flex gap-2">
            <AddToCart slug={p.slug} name={p.name} price={p.price} img={p.image}/>
            <a href="/cart" className="btn btn-ghost">Go to Cart</a>
          </div>
          <div className="hr my-8"></div>
          <ul className="text-white/80 space-y-2 text-sm">
            <li>• Full‑grain / pebbled leather (style dependent)</li>
            <li>• Soft gold or nickel hardware</li>
            <li>• Light microfiber lining</li>
            <li>• 2‑year limited warranty</li>
          </ul>
        </div>
      </div>
    </main>
  )
}