import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cart } = useContext(CartContext);
  const totalItems = cart.reduce((total, item) => total + item.cartQuantity, 0);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo" onClick={closeMenu}>
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
          <Link to="/" onClick={closeMenu}>
            Home
          </Link>

          <Link to="/products" onClick={closeMenu}>
            Products
          </Link>

          <Link to="/farms" onClick={closeMenu}>
            Farms
          </Link>

          <Link to="/about" onClick={closeMenu}>
            About
          </Link>
        </div>

        <div className="nav-actions">
          <Link to="/cart" className="cart-count" onClick={closeMenu}>
            🛒 {totalItems}
          </Link>

          <Link to="/login" className="login-button" onClick={closeMenu}>
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
