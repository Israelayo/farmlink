import { Link } from "react-router-dom";
import "./ClosingCTA.css";

function ClosingCTA() {
  return (
    <section className="closing-cta">
      <div className="closing-cta-content">
        <span className="closing-cta-label">FRESH. LOCAL. CONNECTED.</span>

        <h2>Good food starts at the farm</h2>

        <p>
          Discover fresh produce from local farmers and bring something better
          to your table.
        </p>

        <Link to="/products" className="closing-cta-button">
          Start shopping
        </Link>
      </div>
    </section>
  );
}

export default ClosingCTA;
