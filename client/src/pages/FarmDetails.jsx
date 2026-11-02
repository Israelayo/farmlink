import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "./FarmDetails.css";
import "../components/ProductStatus.css";

function FarmDetails() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [farm, setFarm] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/farms/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setFarm(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, [id]);

  useEffect(() => {
    const controller = new AbortController();

    fetch(`${import.meta.env.VITE_API_URL}/api/products`, {
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Products request failed: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) throw new Error("Invalid products response");
        if (!controller.signal.aborted) setProducts(data);
      })
      .catch((error) => {
        if (controller.signal.aborted) return;
        console.error("Products fetch error:", error);
        setError(true);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, []);

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

        {loading ? (
          <div className="product-status" role="status">
            <span className="product-status-spinner" aria-hidden="true" />
            <p>Please wait while we load the products...</p>
          </div>
        ) : error ? (
          <p className="product-status" role="alert">
            We couldn't load the products right now. Please try again later.
          </p>
        ) : farmProducts.length === 0 ? (
          <p className="product-status" role="status">
            No products are available at the moment.
          </p>
        ) : (
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
        )}
      </section>

      <Link to="/farms" className="back-to-farms">
        Back to all farms
      </Link>
    </main>
  );
}

export default FarmDetails;
