'use client'
import { useState } from "react";
export default function ProductImage({ src, fallback, alt, className }){
  const [imgSrc, setImgSrc] = useState(src);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={imgSrc} alt={alt} className={className}
         onError={() => { if (imgSrc !== fallback) setImgSrc(fallback) }} />
  );
}
