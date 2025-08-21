
document.addEventListener('DOMContentLoaded', () => {
  // Preloader
  setTimeout(()=> document.querySelector('.preloader')?.classList.add('hidden'), 600);

  // Gallery thumb switch
  const thumbs = document.querySelectorAll('.thumbs img');
  const main = document.querySelector('.gallery-main img');
  thumbs.forEach(t => t.addEventListener('click', ()=>{
    if(main && t.dataset.src){ main.src = t.dataset.src; main.alt = t.alt || ''; }
  }));

  // Magnifier on PDP
  const stage = document.querySelector('.gallery-main');
  if(stage){
    const lens = document.createElement('div');
    lens.className = 'lens';
    stage.appendChild(lens);
    const img = stage.querySelector('img');
    let zoom = 2.0;
    stage.addEventListener('mouseenter', ()=> lens.style.display='block');
    stage.addEventListener('mouseleave', ()=> lens.style.display='none');
    stage.addEventListener('mousemove', (e)=>{
      const rect = stage.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const lw = lens.offsetWidth, lh = lens.offsetHeight;
      lens.style.left = (x - lw/2) + 'px';
      lens.style.top = (y - lh/2) + 'px';
      lens.style.backgroundImage = `url(${img.src})`;
      lens.style.backgroundRepeat = 'no-repeat';
      const rx = -((x*zoom) - lw/2);
      const ry = -((y*zoom) - lh/2);
      lens.style.backgroundSize = (img.width*zoom)+'px '+(img.height*zoom)+'px';
      lens.style.backgroundPosition = `${rx}px ${ry}px`;
    });
  }
});
