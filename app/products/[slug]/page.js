import products from "../../data";
import AddToCart from "../../components/AddToCart";
import ProductImage from "../../components/ProductImage";
export async function generateStaticParams(){ return products.map(p=>({ slug: p.slug })); }
export default function Product({ params }){
  const p = products.find(x=>x.slug===params.slug);
  if(!p) return <main className="container py-10"><p>Not found.</p></main>;
  return (
    <main className="bg-white">
      <div className="container py-12 grid md:grid-cols-2 gap-12">
        <div className="rounded-md border border-[#E5E7EB] p-4"><ProductImage src={`/assets/products/real/${p.slug}.jpg`} fallback={p.image} alt={p.name} className="w-full h-auto"/></div>
        <div>
          <h1 className="h1">{p.name}</h1>
          <div className="mt-2 text-lg">₹{p.price.toLocaleString('en-IN')}</div>
          <div className="mt-4 flex gap-3">
            <AddToCart slug={p.slug} name={p.name} price={p.price} img={p.image} />
            <a href="/cart" className="btn">Go to cart</a>
          </div>
          <div className="mt-8 grid gap-2">
            <div className="small">Material: full‑grain / pebbled (varies by style)</div>
            <div className="small">Hardware: soft gold, nickel‑free</div>
            <div className="small">Lining: light microfiber</div>
          </div>
          <div className="mt-8 small text-gray-600">Care: wipe with a soft dry cloth; avoid moisture/chemicals; condition every 6–12 months.</div>
        </div>
      </div>
    </main>
  )
}