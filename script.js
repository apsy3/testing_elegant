
(function(){
  const grid = document.getElementById('productGrid');
  const products = window.PRODUCTS || [];
  const formatter = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });

  products.forEach(p => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <div class="card-media">
        <img src="/assets/products/${p.id}.svg" alt="${p.name}" loading="lazy" />
      </div>
      <div class="card-body">
        <div class="card-title">${p.name}</div>
        <div class="card-meta">
          <span>${p.price || formatter.format(3999)}</span>
          <span>In stock</span>
        </div>
        <div class="badges">
          <span class="badge">Handcrafted</span>
          <span class="badge">Premium leather</span>
          <span class="badge">Gold hardware</span>
        </div>
        <div class="card-actions">
          <button class="btn-mini" aria-label="View details of ${p.name}" data-id="${p.id}">View details</button>
          <button class="btn-mini" aria-label="Add ${p.name} to wishlist">♡ Wishlist</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });

  window.fakeSubmit = (e) => {
    e.preventDefault();
    alert('Thanks! We will notify you at your email when we launch.');
    return false;
  };

  document.getElementById('year').textContent = new Date().getFullYear();
})();
