'use client'
import AddToCart from "./AddToCart";
import ProductImage from "./ProductImage";
export default function ProductRow({p}){
  return (
    <article className="grid grid-cols-12 gap-6 items-center border-t border-[#E5E7EB] py-6">
      <div className="col-span-4 md:col-span-3">
        <ProductImage src={`/assets/products/real/${p.slug}.jpg`} fallback={p.image} alt={p.name} className="w-full h-auto rounded-md border border-[#E5E7EB]"/>
      </div>
      <div className="col-span-8 md:col-span-9 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h3 className="text-xl font-semibold">{p.name}</h3>
          <p className="small">{p.short}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-base font-medium">₹{p.price.toLocaleString('en-IN')}</div>
          <AddToCart slug={p.slug} name={p.name} price={p.price} img={p.image} />
          <a href={`/products/${p.slug}`} className="small underline">Details</a>
        </div>
      </div>
    </article>
  )
}