import { Link } from "react-router-dom";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import "./NotFound.css";

export default function NotFound() {
  useDocumentTitle("Página no encontrada · Andariegos");

  return (
    <div className="not-found">
      <div className="not-found-card">
        <p className="not-found-code">404</p>
        <h1>Esta cumbre no existe</h1>
        <p className="not-found-text">
          La página que buscas no se encuentra. Quizás se perdió en el camino.
        </p>
        <Link to="/" className="not-found-btn">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
