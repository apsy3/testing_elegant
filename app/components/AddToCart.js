'use client'
export default function AddToCart({ slug, name, price, img }){
  return (
    <button className="btn btn-gold" onClick={()=>{
      const cart = JSON.parse(localStorage.getItem('cart')||'[]');
      const ex = cart.find(i=>i.slug===slug);
      if(ex){ ex.qty+=1 } else { cart.push({slug, name, price, img, qty:1}) }
      localStorage.setItem('cart', JSON.stringify(cart));
      alert('Added to cart');
    }}>Add to Cart</button>
  )
}