import products from "../data";
import ProductRow from "../components/ProductRow";
export const metadata = { title: "Shop — Elegance Threads" };
export default function Products(){
  return (
    <main className="bg-white">
      <div className="container py-12">
        <h1 className="h1 mb-6">All products</h1>
        <div className="card p-0">
          {products.map((p,i)=> <ProductRow key={p.slug} p={p} />)}
        </div>
      </div>
    </main>
  )
}