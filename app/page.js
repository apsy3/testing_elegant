import Link from "next/link";
import products from "../data/catalog.json";

export default function Home(){
  const featured = products.slice(0,3);
  return (
    <main className="container">
      <section className="hero">
        <img src="/images/hero-starry.png" alt="Deep navy backdrop with gold speckles"/>
        <div className="overlay"></div>
        <div className="content">
          <h1>Quiet Luxury, Crafted to Last</h1>
          <p>Understated silhouettes, refined hardware, and leather that ages with you.</p>
          <div className="buttons">
            <a className="button gold" href="/collection">Explore the collection</a>
            <a className="button" href="/about">Inside the atelier</a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="grid cols-3">
          {featured.map(p => (
            <Link className="card" key={p.slug} href={`/product/${p.slug}`}>
              <span className="badge">{p.collection}</span>
              <img src={p.images[0]} alt={p.title}/>
              <div className="caption"><strong>{p.title}</strong><span>Shop →</span></div>
            </Link>
          ))}
        </div>
      </section>

      <section className="banner">
        <img src="/images/hero-caramel.png" alt="Caramel backdrop and bag on marble"/>
        <div className="label">Signature Cognac — limited batch</div>
      </section>

      <section className="section">
        <div className="grid cols-3">
          {products.slice(0,6).map(p => (
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
