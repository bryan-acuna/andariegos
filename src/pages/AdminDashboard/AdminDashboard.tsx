import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import "./AdminDashboard.css";

function AdminDashboard() {
  useDocumentTitle("Panel de administración · Andariegos");
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <h1>Panel de administración</h1>
          <p className="dashboard-subtitle">¿Qué quieres editar hoy?</p>
        </div>
        <button className="btn-logout" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>

      <div className="dashboard-grid">
        <Link to="/admin/about" className="dashboard-card">
          <div className="dashboard-card-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <h2>Sobre mí</h2>
          <p>Editar el texto de tu página de presentación</p>
          <span className="dashboard-card-arrow">→</span>
        </Link>

        <Link to="/admin/photos" className="dashboard-card">
          <div className="dashboard-card-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
          <h2>Fotos y aventuras</h2>
          <p>Agregar, editar o eliminar fotos y aventuras</p>
          <span className="dashboard-card-arrow">→</span>
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;
