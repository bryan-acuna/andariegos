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

        <aside className="hero-stats">
          {STATS.map((s, i) => (
            <div key={i} className="hero-stat">
              <span className="hero-stat-value">{s.value}</span>
              <span className="hero-stat-label">{s.label}</span>
            </div>
          ))}
        </aside>

        <div className="hero-text">
          <p className="hero-bio">
            Soy Clever Acuña, ingeniero en sistemas ecuatoriano radicado en Houston, Texas,
            y desde 1986 el andinismo es la pasión que define mi vida. Hace cuatro años,
            mi visión de escalar transformó: cada cumbre ya no es solo una meta, sino una
            prueba de que los límites están en la mente, no en el cuerpo. Hoy escalo para
            inspirar a otros, demostrando que con voluntad, disciplina y fe en uno mismo,
            siempre es posible seguir adelante y redefinir nuestros sueños.
          </p>
          <Link to="/about" className="hero-btn">Sobre mí</Link>
        </div>
      </div>
    </>
  );
}

export default Home;
