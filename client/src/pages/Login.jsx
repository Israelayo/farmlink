import { Link } from "react-router-dom";
import "./Login.css";

function Login() {
  return (
    <main className="login-page">
      <section className="login-card">
        <div className="login-icon">🌱</div>

        <span className="login-label">FARMLINK ACCOUNT</span>

        <h1>Accounts are coming soon</h1>

        <p>
          We’re working on bringing personalized accounts and ordering to
          FarmLink. For now, you can explore our farms, discover fresh products,
          and build your cart.
        </p>

        <div className="login-actions">
          <Link to="/products" className="login-primary-button">
            Explore Products
          </Link>

          <Link to="/" className="login-secondary-button">
            Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Login;
