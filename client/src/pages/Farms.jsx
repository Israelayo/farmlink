import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Farms.css";

function Farms() {
  const [farms, setFarms] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/farms`)
      .then((response) => response.json())
      .then((data) => {
        setFarms(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, []);

  return (
    <main className="farms-page">
      <section className="farms-hero">
        <span className="farms-label">MEET THE FARMERS</span>

        <h1>From their farms to your table</h1>

        <p>
          Get to know the local farmers behind the fresh products you love.
          Discover their farms, their stories, and what they grow.
        </p>
      </section>

      <section className="farms-grid">
        {farms.map((farm) => (
          <Link key={farm.id} to={`/farms/${farm.id}`} className="farm-card">
            <div className="farm-image">
              <img src={farm.image} alt={farm.name} />
            </div>

            <div className="farm-content">
              <span className="farm-location">{farm.location}</span>

              <h2>{farm.name}</h2>

              <p>{farm.description}</p>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}

export default Farms;
