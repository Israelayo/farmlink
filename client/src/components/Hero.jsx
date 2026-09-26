import "./Hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <span className="hero-label">LOCAL • FRESH • TRUSTED</span>

        <h1>
          Fresh from the farm
          <span>Closer to your table</span>
        </h1>

        <p>
          Discover fresh products from local farmers and bring the best of the
          farm straight to your table.
        </p>

        <div className="hero-actions">
          <button className="primary-button">Explore products →</button>

          <button className="secondary-button">Meet our farmers</button>
        </div>

        <div className="hero-stats">
          <div>
            <strong>30+</strong>
            <span>Fresh products</span>
          </div>

          <div>
            <strong>10+</strong>
            <span>Local farmers</span>
          </div>

          <div>
            <strong>100%</strong>
            <span>Farm fresh</span>
          </div>
        </div>
      </div>

      <div className="hero-visual">
        <div className="hero-image">
          <img
            src="/images/hero-farm.jpg"
            alt="Fresh produce from a local farm"
          />
          <a href="#products" className="floating-card">
            <span className="floating-card-icon">🥕</span>

            <div>
              <strong>Fresh carrots</strong>
              <small>From a local farm · Explore →</small>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
