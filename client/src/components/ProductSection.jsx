import { useEffect, useState } from "react";

import "./ProductSection.css";
import ProductCard from "./ProductCard";

function ProductSection() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
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

      <div className="products-grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default ProductSection;
