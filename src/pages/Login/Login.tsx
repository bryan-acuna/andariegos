import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
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
      navigate("/");
    }
    setIsLoading(false);
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <h1>Bienvenido</h1>
        <p className="register-subtitle">Inicia sesión o crea una cuenta</p>

        {error && <p className="register-error">{error}</p>}

        <div className="register-fields">
          <div className="register-field">
            <label htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              type="email"
              placeholder="tu@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="register-field">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="register-actions">
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
