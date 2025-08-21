import products from "../../../data/catalog.json";
import ProductGallery from "../../../components/ProductGallery.jsx";

export function generateStaticParams(){
  return products.map(p => ({ slug: p.slug }));
}

export default function ProductPage({ params }){
  const product = products.find(p => p.slug === params.slug);
  if(!product) return <main className="container"><p>Not found.</p></main>;
  return (
    <main className="container section pdp">
      <ProductGallery images={product.images} />
      <div>
        <h1 style={{fontFamily:'Playfair Display,serif',marginTop:0}}>{product.title}</h1>
        <div className="price">₹{product.price.toLocaleString('en-IN')}</div>
        <p>{product.description}</p>
        <div className="buy">
          <button className="primary">Add to bag</button>
          <button>Buy now</button>
        </div>
        <div className="section">
          <strong>Details</strong>
          <ul>
            <li>{product.materials}</li>
            <li>Dimensions: {product.dimensions}</li>
            <li>Warranty: 2 years</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
