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
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/farms">Farms</Link>
          <Link to="/about">About</Link>
        </div>
        <div className="nav-actions">
          <Link to="/cart" className="cart-count">
            🛒 {totalItems}
          </Link>

          <Link to="/login" className="login-button">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
