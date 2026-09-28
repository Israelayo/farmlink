import "./About.css";
import { Link } from "react-router-dom";

function About() {
  return (
    <main className="about-page">
      <section className="about-hero">
        <span className="about-label">ABOUT FARMLINK</span>

        <h1>Connecting farms with tables</h1>

        <p>
          FarmLink brings local farmers and customers closer together, making it
          easier to discover fresh food and the people who grow it.
        </p>
      </section>

      <section className="about-story">
        <div>
          <span className="about-label">OUR STORY</span>

          <h2>From local farms to your table</h2>
        </div>

        <p>
          FarmLink was created with a simple idea: finding fresh, quality food
          should also mean knowing where it comes from. We connect customers
          with local farms so they can discover fresh products while supporting
          the farmers behind them.
        </p>
      </section>

      <section className="about-how">
        <div className="about-section-heading">
          <span className="about-label">HOW IT WORKS</span>

          <h2>Simple from farm to table</h2>
        </div>

        <div className="about-steps">
          <article>
            <span>01</span>
            <h3>Discover farms</h3>
            <p>
              Explore local farms and learn more about the people growing your
              food.
            </p>
          </article>

          <article>
            <span>02</span>
            <h3>Find fresh products</h3>
            <p>Browse fresh products available from farmers on FarmLink.</p>
          </article>

          <article>
            <span>03</span>
            <h3>Shop with confidence</h3>
            <p>
              Add what you need to your cart and enjoy a simpler connection
              between you and the farm.
            </p>
          </article>
        </div>
      </section>

      <section className="about-cta">
        <div className="about-cta-content">
          <span className="about-label">START EXPLORING</span>

          <h2>Ready to discover what local farms have to offer?</h2>

          <p>
            Explore fresh products from farmers around you and bring something
            better to your table.
          </p>

          <Link to="/products" className="about-cta-button">
            Explore products
          </Link>
        </div>
      </section>
    </main>
  );
}

export default About;
