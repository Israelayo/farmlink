import { useEffect, useState } from "react";

import "./ProductSection.css";
import ProductCard from "./ProductCard";
import "./ProductStatus.css";

function ProductSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

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

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <section id="products" className="products-section">
      <div className="products-header">
        <span className="products-label">FARM TO TABLE</span>

        <h2>Fresh picks from local farms</h2>

        <p>
          Discover fresh, quality products from farmers around you and bring the
          best of the farm home.
        </p>
      </div>
      <div className="catalogue-controls">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <div className="category-filters">
          <button
            className={selectedCategory === "all" ? "active" : ""}
            onClick={() => setSelectedCategory("all")}
          >
            All
          </button>

          <button
            className={selectedCategory === "vegetables" ? "active" : ""}
            onClick={() => setSelectedCategory("vegetables")}
          >
            Vegetables
          </button>

          <button
            className={selectedCategory === "fruits" ? "active" : ""}
            onClick={() => setSelectedCategory("fruits")}
          >
            Fruits
          </button>

          <button
            className={selectedCategory === "dairy" ? "active" : ""}
            onClick={() => setSelectedCategory("dairy")}
          >
            Dairy
          </button>

          <button
            className={selectedCategory === "grains" ? "active" : ""}
            onClick={() => setSelectedCategory("grains")}
          >
            Grains
          </button>
        </div>
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
      ) : filteredProducts.length === 0 ? (
        <p className="product-status" role="status">
          {products.length === 0
            ? "No products are available at the moment."
            : "No products match your search or selected category."}
        </p>
      ) : (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}

export default ProductSection;
