export const metadata = { title: "Inside the atelier — Elegance" };

export default function About(){
  return (
    <main className="container">
      <section className="banner"><img src="/images/hero-bag-marble.png" alt="Caramel bag on marble"/><div className="label">Kanpur — since 2024</div></section>
      <section className="section">
        <div className="container">
          <h1 style={{fontFamily:'Playfair Display,serif'}}>Inside the atelier</h1>
          <p>We build everyday pieces with the attention usually reserved for couture. Full‑grain feel, smooth hardware, tight stitching, and honest materials.</p>
          <div className="grid cols-3">
            <div className="card"><img src="/images/women-tote.png" alt="Cognac tote"/><div className="caption">Cognac — our house color</div></div>
            <div className="card"><img src="/images/wallet.png" alt="Wallet"/><div className="caption">Lined with microfiber</div></div>
            <div className="card"><img src="/images/duffle.png" alt="Duffle"/><div className="caption">Hardware in soft gold</div></div>
          </div>
        </div>
      </section>
    </main>
  );
}
