import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "./FarmDetails.css";

function FarmDetails() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [farm, setFarm] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/farms/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setFarm(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
    fetch(`${import.meta.env.VITE_API_URL}/api/products`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Products fetch error:", error);
      });
  }, [id]);

  if (!farm) {
    return <p>Loading...</p>;
  }
  const farmProducts = products.filter(
    (product) => product.farmerId === farm.id,
  );

  return (
    <main className="farm-details-page">
      <section className="farm-hero">
        <img src={farm.image} alt={farm.name} />

        <div className="farm-hero-content">
          <span>FARMLINK FARM</span>

          <h1>{farm.name}</h1>

          <p className="farm-location">{farm.location}</p>

          <p>{farm.description}</p>
        </div>
      </section>

      <section className="farm-products">
        <div className="farm-products-header">
          <span>FROM THE FARM</span>

          <h2>Fresh from this farm</h2>

          <p>Explore fresh products grown and produced by {farm.name}.</p>
        </div>

        <div className="farm-products-grid">
          {farmProducts.map((product) => (
            <article key={product.id} className="farm-product-card">
              <Link
                to={`/products/${product.id}`}
                className="farm-product-link"
              >
                <div className="farm-product-image">
                  <img src={product.image} alt={product.name} />
                </div>

                <div className="farm-product-info">
                  <h3>{product.name}</h3>

                  <p>
                    ₽{product.price} / {product.unit}
                  </p>
                </div>
              </Link>

              <div className="farm-product-action">
                <button onClick={() => addToCart(product)}>Add to cart</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Link to="/farms" className="back-to-farms">
        Back to all farms
      </Link>
    </main>
  );
}

export default FarmDetails;
