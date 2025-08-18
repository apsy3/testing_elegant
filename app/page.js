import Link from "next/link";
export default function Home(){
  return (
    <main>
      <section className="bg-white">
        <div className="container py-16 md:py-24">
          <h1 className="h0">Leather, made simple.</h1>
          <p className="lead mt-3">Quiet design. Honest materials. Everyday function.</p>
          <div className="mt-6 flex gap-3">
            <a className="btn-primary" href="/products">Shop now</a>
            <a className="btn" href="/craft">Our craft</a>
          </div>
        </div>
      </section>
      <section className="border-t border-[#E5E7EB] bg-white">
        <div className="container py-12 grid md:grid-cols-3 gap-8">
          <div><div className="badge">Material</div><h3 className="h2 mt-2">Full‑grain first</h3><p className="small mt-2">Selected hides, tested hardware, and reinforced stress points.</p></div>
          <div><div className="badge">Design</div><h3 className="h2 mt-2">Clear, useful</h3><p className="small mt-2">Slim silhouettes, easy access, light interior for visibility.</p></div>
          <div><div className="badge">Care</div><h3 className="h2 mt-2">Made to last</h3><p className="small mt-2">Simple care, repair support, and a straightforward warranty.</p></div>
        </div>
      </section>
    </main>
  )
}