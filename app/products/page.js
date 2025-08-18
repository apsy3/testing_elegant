import products from "../data";
import ProductCard from "../components/ProductCard";
export const metadata = { title: "Shop — Elegance Threads" };
export default function Products(){
  return (
    <main className="aurora">
      <div className="container py-14 relative z-10">
        <h1 className="text-[44px] font-black text-transparent sheen">All products</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
          {products.map(p => <ProductCard key={p.slug} p={p} />)}
        </div>
      </div>
    </main>
  )
}