import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "../Cart.css";

function Cart() {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } =
    useContext(CartContext);

  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const totalItems = cart.reduce(
    (total, product) => total + product.cartQuantity,
    0,
  );

  const totalPrice = cart.reduce(
    (total, product) => total + product.price * product.cartQuantity,
    0,
  );

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1>Your Cart</h1>
        <p>
          {totalItems} {totalItems === 1 ? "item" : "items"} in cart
        </p>
      </div>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>Browse our products and add something to your cart.</p>
          <Link to="/">Browse Products</Link>
        </div>
      ) : (
        <>
          {cart.map((product) => (
            <div className="cart-item" key={product.id}>
              <img src={product.image} alt={product.name} />

              <div className="cart-item-info">
                <h2>{product.name}</h2>

                <p>
                  ₽{product.price} / {product.unit}
                </p>

                <p>Subtotal: ₽{product.price * product.cartQuantity}</p>
              </div>

              <div className="quantity-controls">
                <button onClick={() => decreaseQuantity(product.id)}>−</button>

                <span>{product.cartQuantity}</span>

                <button onClick={() => increaseQuantity(product.id)}>+</button>
              </div>

              <button
                className="remove-button"
                onClick={() => removeFromCart(product.id)}
              >
                Remove
              </button>
            </div>
          ))}

          <div className="cart-summary">
            <h2>Total: ₽{totalPrice}</h2>

            <button
              className="checkout-button"
              onClick={() => setShowLoginPrompt(true)}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}

      {showLoginPrompt && (
        <div
          className="login-modal-overlay"
          onClick={() => setShowLoginPrompt(false)}
        >
          <div
            className="login-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setShowLoginPrompt(false)}
              aria-label="Close login prompt"
            >
              ×
            </button>

            <div className="modal-icon">🔐</div>

            <span className="modal-label">FARMLINK ACCOUNT</span>

            <h2>Login required</h2>

            <p>
              Please log in to your FarmLink account before proceeding to
              checkout.
            </p>

            {/* <p className="modal-note">
Accounts are currently being prepared for FarmLink.
</p> */}

            <Link to="/login" className="modal-login-button">
              Log in
            </Link>

            <button
              className="modal-continue-button"
              onClick={() => setShowLoginPrompt(false)}
            >
              Continue shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
