'use client'
import { useEffect, useState } from "react";

export default function Cart(){
  const [items, setItems] = useState([]);
  useEffect(()=>{ setItems(JSON.parse(localStorage.getItem('cart')||'[]')); },[]);

  const subtotal = items.reduce((s,i)=> s + i.price*i.qty, 0);

  function update(slug, delta){
    const next = items.map(i=> i.slug===slug ? {...i, qty: Math.max(1, i.qty+delta)} : i);
    setItems(next); localStorage.setItem('cart', JSON.stringify(next));
  }
  function remove(slug){
    const next = items.filter(i=> i.slug!==slug); setItems(next); localStorage.setItem('cart', JSON.stringify(next));
  }

  return (
    <main className="container py-10">
      <h1 className="h2 mb-4">Your Cart</h1>
      {items.length===0 ? <p>Your cart is empty.</p> : (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            {items.map(i=> (
              <div key={i.slug} className="card p-3 flex items-center gap-4">
                <img src={i.img} className="w-24 h-20 object-cover rounded-lg border border-gold/30" alt="" />
                <div className="flex-1">
                  <div className="font-semibold">{i.name}</div>
                  <div className="text-sm text-bone/80">₹{i.price.toLocaleString('en-IN')}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="btn btn-ghost" onClick={()=>update(i.slug,-1)}>-</button>
                  <span>{i.qty}</span>
                  <button className="btn btn-ghost" onClick={()=>update(i.slug,1)}>+</button>
                </div>
                <button className="btn btn-ghost" onClick={()=>remove(i.slug)}>Remove</button>
              </div>
            ))}
          </div>
          <aside className="card p-4 space-y-2 h-fit">
            <div className="flex items-center justify-between"><span>Subtotal</span><b>₹{subtotal.toLocaleString('en-IN')}</b></div>
            <p className="text-sm text-bone/80">Taxes & shipping calculated at checkout (demo).</p>
            <button className="btn btn-solid w-full">Checkout (demo)</button>
          </aside>
        </div>
      )}
    </main>
  )
}
