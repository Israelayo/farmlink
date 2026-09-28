import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "./ProductCard.css";

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <article className="product-card">
      <Link to={`/products/${product.id}`} className="product-link">
        <div className="product-image">
          <img src={product.image} alt={product.name} />

          <span>{product.category}</span>
        </div>

        <div className="product-info">
          <span className="product-category">{product.category}</span>

          <h3>{product.name}</h3>

          <p className="product-price">
            ₽{product.price}
            <span> / {product.unit}</span>
          </p>

          <p className="product-quantity">
            {product.quantity} {product.unit} available
          </p>
        </div>
      </Link>

      <button className="add-to-cart" onClick={() => addToCart(product)}>
        Add to cart
      </button>
    </article>
  );
}

export default ProductCard;
