import * as Progress from "@radix-ui/react-progress";
import "./Loader.css";

interface LoaderProps {
  label?: string;
}

function Loader({ label = "Cargando..." }: LoaderProps) {
  return (
    <div className="loader-wrap">
      <div className="loader-spinner" />
      <Progress.Root className="loader-progress-root" value={null}>
        <Progress.Indicator className="loader-progress-indicator" />
      </Progress.Root>
      <span className="loader-label">{label}</span>
    </div>
  );
}

export default Loader;
