import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./FeaturedProducts.css";
import "./ProductStatus.css";

function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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
        if (!controller.signal.aborted) setProducts(data.slice(0, 3));
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

  return (
    <section className="featured-products">
      <div className="featured-products-header">
        <span>OUR FRESH PICKS</span>

        <h2>Fresh from local farms</h2>

        <p>
          A few of our favourite picks, freshly sourced from farmers around you.
        </p>
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
      ) : products.length === 0 ? (
        <p className="product-status" role="status">
          No products are available at the moment.
        </p>
      ) : (
        <div className="featured-products-grid">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className="featured-product-card"
            >
              <img src={product.image} alt={product.name} />

              <div>
                <h3>{product.name}</h3>

                <p>
                  ₽{product.price} / {product.unit}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}

      <Link to="/products" className="view-all-products">
        View all products
      </Link>
    </section>
  );
}

export default FeaturedProducts;
