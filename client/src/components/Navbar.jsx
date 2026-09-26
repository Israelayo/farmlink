import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cart } = useContext(CartContext);
  const totalItems = cart.reduce((total, item) => total + item.cartQuantity, 0);

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <span className="logo-icon">🌱</span>
        FarmLink
      </Link>

      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation menu"
      >
        ☰
      </button>

      <div className={`nav-menu ${menuOpen ? "open" : ""}`}>
        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/products">Products</a>
          <a href="/farms">Farms</a>
          <a href="/about">About</a>
        </div>
        <div className="nav-actions">
          <Link to="/cart" className="cart-count">
            🛒 {totalItems}
          </Link>

          <button className="login-button">Login</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
