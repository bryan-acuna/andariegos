import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import "./About.css";

function About() {
  useDocumentTitle("Sobre mí · Andariegos");

  const [bio, setBio] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("site_content")
      .select("value")
      .eq("key", "about_bio")
      .single()
      .then(({ data, error }) => {
        if (!error && data) setBio(data.value);
        setLoading(false);
      });
  }, []);

  const paragraphs = bio
    ? bio
        .split(/\n\s*\n/)
        .map((p) => p.trim())
        .filter(Boolean)
    : [];

  return (
    <div className="about">
      <details className="about-section" open>
        <summary>Perfil</summary>
        <div className="about-section-body">
          {loading && <p className="about-loading">Cargando...</p>}

          {!loading && paragraphs.length > 0 && (
            <div className="about-body">
              {paragraphs.map((text, i) => (
                <p key={i}>{text}</p>
              ))}
            </div>
          )}

          {!loading && paragraphs.length === 0 && (
            <p className="about-empty">Aún no hay contenido.</p>
          )}
        </div>
      </details>

      <details className="about-section" open>
        <summary>Experiencia</summary>
        <div className="about-section-body">
          <ul className="about-experience">
            <li>
              <span className="about-exp-place">Nicaragua — Cerro Asunción</span>
              <span className="about-exp-year">2026</span>
            </li>
            <li>
              <span className="about-exp-place">Costa Rica — Cerro Chirripó</span>
              <span className="about-exp-year">2026</span>
            </li>
            <li>
              <span className="about-exp-place">
                Chile — Cerro Pintor, Volcán Ojos del Salado
              </span>
              <span className="about-exp-year">2026</span>
            </li>
            <li>
              <span className="about-exp-place">
                Bolivia — Volcán Thunupa, Laguna Juri Khota, Laguna Glacial
                Ventanani, Tuni Condoriri, Laguna Chuiarkhota, Pico Tarija
              </span>
              <span className="about-exp-year">2024</span>
            </li>
            <li>
              <span className="about-exp-place">
                Guatemala — Volcán Tajumulco, Volcán de Cuxliquel, Volcán
                Concepción
              </span>
              <span className="about-exp-year">2024</span>
            </li>
            <li>
              <span className="about-exp-place">Perú — Cordillera Blanca</span>
              <span className="about-exp-year">2023</span>
            </li>
            <li>
              <span className="about-exp-place">
                Ecuador — Cotopaxi, Chimborazo, Cayambe, Illiniza Norte y Sur,
                Ruku Pichincha
              </span>
              <span className="about-exp-year">1986 – 2004</span>
            </li>
          </ul>
        </div>
      </details>

      <details className="about-section">
        <summary>Habilidades técnicas</summary>
        <div className="about-section-body">
          <ul className="about-list">
            <li>Alpine climbing</li>
            <li>Snow climbing</li>
            <li>Trekking</li>
            <li>Volcanic terrain experience</li>
            <li>Expedition planning</li>
          </ul>
        </div>
      </details>

      <details className="about-section">
        <summary>Certificaciones</summary>
        <div className="about-section-body">
          <ul className="about-list">
            <li>CPR / Lugares greatest</li>
            <li>Houston CERT — grupo de auxilio de desastres naturales</li>
          </ul>
        </div>
      </details>
    </div>
  );
}

export default About;
