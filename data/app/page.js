import products from "./data";
import ProductCard from "./components/ProductCard";
import ScrollReveal from "./components/ScrollReveal";
export default function Home(){
  const featured = products.slice(0,4);
  return (
    <main>
      <ScrollReveal />
      <section className="aurora">
        <div className="container py-24 relative z-10">
          <p className="uppercase tracking-[.25em] text-xs text-white/60">Elegance Threads</p>
          <h1 className="text-[clamp(36px,6vw,72px)] font-black text-transparent sheen">Craft that carries.</h1>
          <p className="text-[clamp(16px,2vw,20px)] text-white/80 mt-2">Premium leather pieces—timeless silhouettes, modern utility, quiet luxury.</p>
          <div className="mt-6 flex gap-3">
            <a className="btn btn-gold" href="/products">Shop the range</a>
            <a className="btn btn-ghost" href="/craft">Our craft</a>
          </div>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 reveal">
            {featured.map(p => <ProductCard key={p.slug} p={p} />)}
          </div>
        </div>
      </section>
      <section className="section-light">
        <div className="container py-14 grid md:grid-cols-3 gap-8">
          <div className="card p-6 reveal"><div className="text-xs tracking-widest uppercase text-gray-500">Material</div><h3 className="text-xl font-semibold mt-1">Full‑grain first</h3><p className="mt-2 text-gray-600 text-sm">Selected hides, nickel‑free hardware, reinforced stress points.</p></div>
          <div className="card p-6 reveal"><div className="text-xs tracking-widest uppercase text-gray-500">Design</div><h3 className="text-xl font-semibold mt-1">Clear, useful</h3><p className="mt-2 text-gray-600 text-sm">Slim profiles, easy access, light lining for visibility.</p></div>
          <div className="card p-6 reveal"><div className="text-xs tracking-widest uppercase text-gray-500">Care</div><h3 className="text-xl font-semibold mt-1">Made to last</h3><p className="mt-2 text-gray-600 text-sm">Simple care and repair support extend product life.</p></div>
        </div>
      </section>
    </main>
  )
}