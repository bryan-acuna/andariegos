import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  useDocumentTitle("Iniciar sesión · Andariegos");
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSignIn = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    const { error } = await signIn(email, password);
    if (error) {
      setError(error.message);
    } else {
      navigate("/admin");
    }
    setIsLoading(false);
  };

  // ← added: submit on Enter key from any field
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isLoading) {
      handleSignIn();
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Bienvenido</h1>
        <p className="login-subtitle">Inicia sesión</p>

        {error && <p className="login-error">{error}</p>}

        <div className="login-fields">
          <div className="login-field">
            <label htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              type="email"
              placeholder="tu@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyDown} // ← added
            />
          </div>
          <div className="login-field">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown} // ← added
            />
          </div>
        </div>

        <div className="login-actions">
          <button
            className="btn-primary"
            onClick={handleSignIn}
            disabled={isLoading}
          >
            {isLoading ? "Cargando..." : "Iniciar sesión"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
