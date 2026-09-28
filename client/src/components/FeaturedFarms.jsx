import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./FeaturedFarms.css";

function FeaturedFarms() {
  const [farms, setFarms] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/farms`)
      .then((response) => response.json())
      .then((data) => {
        setFarms(data.slice(0, 3));
      })
      .catch((error) => {
        console.error("Farms fetch error:", error);
      });
  }, []);

  return (
    <section className="featured-farms">
      <div className="featured-farms-header">
        <span>MEET OUR FARMERS</span>

        <h2>Good food starts with good farms</h2>

        <p>
          Get to know the local farms behind the fresh products you bring home.
        </p>
      </div>

      <div className="featured-farms-grid">
        {farms.map((farm) => (
          <Link
            key={farm.id}
            to={`/farms/${farm.id}`}
            className="featured-farm-card"
          >
            <img src={farm.image} alt={farm.name} />

            <div className="featured-farm-info">
              <h3>{farm.name}</h3>

              <p>{farm.location}</p>
            </div>
          </Link>
        ))}
      </div>

      <Link to="/farms" className="view-all-farms">
        Explore all farms
      </Link>
    </section>
  );
}

export default FeaturedFarms;
