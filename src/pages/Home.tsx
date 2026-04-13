import "./Home.css";
import hero from "../assets/hero.jpg";

function Home() {
  return (
    <div className="hero">
      <img src={hero} alt="Andariegos hero" className="hero-img" />
      <div className="hero-overlay" />
      <div className="hero-text">
        <h1>No conquisto cumbres</h1>
        <h2>conquisto mis miedos</h2>
      </div>
    </div>
  );
}

export default Home;
