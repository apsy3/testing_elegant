'use client'
import { useMemo, useState } from "react";
import catalog from "../data";
import ProductCard from "../components/ProductCard";

export default function ProductsClient(){
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('All');
  const categories = useMemo(()=>['All', ...Array.from(new Set(catalog.map(p=>p.category)))],[]);
  const filtered = useMemo(()=>catalog.filter(p =>
    (cat==='All'||p.category===cat) && (p.name.toLowerCase().includes(q.toLowerCase())||p.short.toLowerCase().includes(q.toLowerCase()))
  ), [q, cat]);

  return (
    <main className="container py-10">
      <header className="mb-4"><h1 className="h2">All Products</h1></header>
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search products..." className="bg-[#161616] p-3 rounded-xl border border-white/15 md:w-80"/>
        <select value={cat} onChange={e=>setCat(e.target.value)} className="bg-[#161616] p-3 rounded-xl border border-white/15">
          {categories.map(c=><option key={c}>{c}</option>)}
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(p => <ProductCard key={p.slug} p={p} />)}
      </div>
    </main>
  )
}