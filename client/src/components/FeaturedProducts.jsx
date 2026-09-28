import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./FeaturedProducts.css";

function FeaturedProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/products`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.slice(0, 3));
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
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

      <div className="featured-products-grid">
        {products.map((product) => (
          <Link
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

      <Link to="/products" className="view-all-products">
        View all products
      </Link>
    </section>
  );
}

export default FeaturedProducts;
