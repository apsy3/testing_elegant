import Link from "next/link";
import products from "../../data/catalog.json";

export const metadata = { title: "Collection — Elegance" };

export default function Collection(){
  return (
    <main className="container">
      <section className="section"><h1 style={{fontFamily:'Playfair Display,serif',margin:'10px 0 0'}}>Featured styles</h1></section>
      <section className="section">
        <div className="grid cols-3">
          {products.map(p => (
            <Link className="card" key={p.slug} href={`/product/${p.slug}`}>
              <img src={p.images[0]} alt={p.title}/>
              <div className="caption"><strong>{p.title}</strong><span>₹{p.price.toLocaleString("en-IN")}</span></div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
