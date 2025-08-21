'use client';
import { useState, useRef, useEffect } from 'react';

export default function ProductGallery({ images }){
  const [main, setMain] = useState(images[0]);
  const stageRef = useRef(null);
  const lensRef = useRef(null);

  useEffect(()=>{
    const stage = stageRef.current;
    const lens = lensRef.current;
    if(!stage || !lens) return;
    const onEnter = ()=> lens.style.display='block';
    const onLeave = ()=> lens.style.display='none';
    const onMove = (e)=>{
      const rect = stage.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const lw = lens.offsetWidth, lh = lens.offsetHeight;
      lens.style.left = (x - lw/2) + 'px';
      lens.style.top = (y - lh/2) + 'px';
      const img = stage.querySelector('img');
      const zoom = 2.0;
      lens.style.backgroundImage = `url(${img.src})`;
      lens.style.backgroundRepeat = 'no-repeat';
      lens.style.backgroundSize = (img.width*zoom)+'px '+(img.height*zoom)+'px';
      const rx = -((x*zoom) - lw/2);
      const ry = -((y*zoom) - lh/2);
      lens.style.backgroundPosition = `${rx}px ${ry}px`;
    };
    stage.addEventListener('mouseenter', onEnter);
    stage.addEventListener('mouseleave', onLeave);
    stage.addEventListener('mousemove', onMove);
    return ()=>{
      stage.removeEventListener('mouseenter', onEnter);
      stage.removeEventListener('mouseleave', onLeave);
      stage.removeEventListener('mousemove', onMove);
    };
  }, [main]);

  return (
    <div className="gallery">
      <div className="gallery-main" ref={stageRef}>
        <img src={main} alt="Product image"/>
        <div className="lens" ref={lensRef}></div>
      </div>
      <div className="thumbs">
        {images.map((src,i)=> (
          <img key={i} src={src} alt={"thumb "+i} onClick={()=>setMain(src)} />
        ))}
      </div>
    </div>
  );
}
