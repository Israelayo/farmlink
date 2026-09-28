import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "../ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { cart, addToCart } = useContext(CartContext);
  const totalItems = cart.reduce((total, item) => total + item.cartQuantity, 0);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, [id]);

  return (
    <div className="product-details-page">
      {product ? (
        <>
          <Link to="/products" className="back-link">
            ← Back to products
          </Link>

          <div className="product-details">
            <div className="product-image-container">
              <img src={product.image} alt={product.name} />
            </div>

            <div className="product-info">
              <p className="product-category">{product.category}</p>

              <h1>{product.name}</h1>

              <p className="product-price">
                ₽{product.price} / {product.unit}
              </p>

              <p className="product-stock">
                {product.quantity} {product.unit} available
              </p>

              <button
                className="add-to-cart-button"
                onClick={() => addToCart(product)}
              >
                Add to cart
              </button>

              <p className="cart-items-count">
                {totalItems} {totalItems === 1 ? "item" : "items"} in cart
              </p>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ProductDetails;
