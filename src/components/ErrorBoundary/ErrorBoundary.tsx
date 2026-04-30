import { Component, type ReactNode, type ErrorInfo } from "react";
import "./ErrorBoundary.css";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // TODO: wire to Sentry / error monitoring once configured
    console.error("ErrorBoundary caught:", error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="error-boundary">
          <div className="error-boundary-card">
            <h1>Algo salió mal</h1>
            <p>
              Hubo un problema cargando esta página. Intenta recargar.
            </p>
            <div className="error-boundary-actions">
              <button onClick={() => window.location.reload()}>
                Recargar
              </button>
              <a href="/">Volver al inicio</a>
            </div>
            {import.meta.env.DEV && this.state.error && (
              <pre className="error-boundary-detail">
                {this.state.error.message}
              </pre>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
