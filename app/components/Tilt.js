'use client'
import { useRef } from 'react';
export default function Tilt({ children, className='' }){
  const ref = useRef(null);
  function move(e){
    const el = ref.current; if(!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left)/r.width - .5;
    const y = (e.clientY - r.top)/r.height - .5;
    el.style.transform = `perspective(900px) rotateY(${x*-6}deg) rotateX(${y*6}deg)`;
  }
  function leave(){ if(ref.current) ref.current.style.transform = '' }
  return <div ref={ref} onMouseMove={move} onMouseLeave={leave} className={`tilt ${className}`}>{children}</div>
}