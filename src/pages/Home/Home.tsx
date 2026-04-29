import "./Home.css";
import hero from "../../assets/hero.jpg";
import { Link } from "react-router-dom";

const STATS = [
  { value: "+30", label: "Montañas" },
  { value: "10",  label: "Países"   },
  { value: "+5000m", label: "Altitud"  },
];

function Home() {
  return (
    <>
      <div className="hero">
        <img src={hero} alt="Andariegos hero" className="hero-img" />
        <div className="hero-overlay" />

        <div className="hero-text">
          <h1 className="hero-name">Clever Acuña</h1>
          <p className="hero-tagline">Andinista desde 1986 · Ecuador → Houston</p>
          <p className="hero-bio">
            Escalo para inspirar — porque los límites están en la mente, no en el cuerpo.
          </p>

          <dl className="hero-stats">
            {STATS.map((s, i) => (
              <div key={i} className="hero-stat">
                <dt className="hero-stat-value">{s.value}</dt>
                <dd className="hero-stat-label">{s.label}</dd>
              </div>
            ))}
          </dl>

          <div className="hero-cta-group">
            <Link to="/montanas" className="hero-btn hero-btn-primary">
              Ver montañas
            </Link>
            <Link to="/about" className="hero-btn hero-btn-secondary">
              Sobre mí
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
