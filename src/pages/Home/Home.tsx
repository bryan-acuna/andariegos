import { useMemo } from "react";
import "./Home.css";
import hero from "../../assets/hero.jpg";
import { Link } from "react-router-dom";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { usePhotos } from "../../hooks/usePhotos";
import { getCountryMeta } from "../../lib/countries";

// Years climbing — anchor on his start year so it stays accurate.
const FIRST_CLIMB_YEAR = 1986;

function Home() {
  useDocumentTitle();
  const { data: photos } = usePhotos();

  const stats = useMemo(() => {
    const yearsClimbing = new Date().getFullYear() - FIRST_CLIMB_YEAR;

    // Unique adventures by name (multiple photos per climb collapse to one).
    const adventures = new Set(
      (photos ?? []).map((p) => p.Name).filter((name): name is string => !!name),
    );

    // Unique countries via the alias-aware lookup so "Brasil" and "Brazil" collapse.
    const countries = new Set(
      (photos ?? [])
        .map((p) => getCountryMeta(p.country)?.label)
        .filter((label): label is string => !!label),
    );

    return [
      { value: `${yearsClimbing}`, label: "Años en la montaña" },
      {
        value: adventures.size > 0 ? `+${adventures.size}` : "—",
        label: "Aventuras",
      },
      {
        value: countries.size > 0 ? `${countries.size}` : "—",
        label: countries.size === 1 ? "País" : "Países",
      },
    ];
  }, [photos]);

  return (
    <>
      <div className="hero">
        <img
          src={hero}
          alt="Clever Acuña en una expedición de andinismo"
          className="hero-img"
        />
        <div className="hero-overlay" />

        <div className="hero-text">
          <h1 className="hero-name">Clever Acuña</h1>
          <p className="hero-tagline">Andinista desde 1986 · Ecuador → Houston</p>
          <p className="hero-bio">
            Escalo para inspirar — porque los límites están en la mente, no en el cuerpo.
          </p>

          <dl className="hero-stats">
            {stats.map((s) => (
              <div key={s.label} className="hero-stat">
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
