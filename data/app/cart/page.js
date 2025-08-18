'use client'
import { useEffect, useState } from "react";
export default function Cart(){
  const [items, setItems] = useState([]);
  useEffect(()=>{ setItems(JSON.parse(localStorage.getItem('cart')||'[]')); },[]);
  const subtotal = items.reduce((s,i)=> s + i.price*i.qty, 0);
  const update=(slug,d)=>{ const next=items.map(i=>i.slug===slug?{...i,qty:Math.max(1,i.qty+d)}:i); setItems(next); localStorage.setItem('cart',JSON.stringify(next));}
  const remove=(slug)=>{ const next=items.filter(i=>i.slug!==slug); setItems(next); localStorage.setItem('cart',JSON.stringify(next));}
  return (
    <main className="section-light">
      <div className="container py-12">
        <h1 className="text-3xl font-bold mb-6">Your cart</h1>
        {items.length===0 ? <p className="text-gray-600">Your cart is empty.</p> : (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              {items.map(i=> (
                <div key={i.slug} className="grid grid-cols-12 gap-4 items-center border-b border-[#E8E4DC] pb-4">
                  <img src={i.img} className="col-span-3 rounded-md border border-[#E8E4DC]" />
                  <div className="col-span-9 flex items-center justify-between">
                    <div>
                      <div className="font-semibold">{i.name}</div>
                      <div className="text-sm text-gray-600">₹{i.price.toLocaleString('en-IN')}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="btn" onClick={()=>update(i.slug,-1)}>-</button>
                      <span>{i.qty}</span>
                      <button className="btn" onClick={()=>update(i.slug,1)}>+</button>
                      <button className="btn" onClick={()=>remove(i.slug)}>Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <aside className="card p-4 h-fit">
              <div className="flex items-center justify-between"><span>Subtotal</span><b>₹{subtotal.toLocaleString('en-IN')}</b></div>
              <p className="text-sm text-gray-600 mt-2">Taxes & shipping at checkout (demo).</p>
              <button className="btn btn-gold w-full mt-3">Checkout (demo)</button>
            </aside>
          </div>
        )}
      </div>
    </main>
  )
}