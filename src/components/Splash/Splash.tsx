import { useEffect, useState } from "react";
import "./Splash.css";

const WORDS = ["NO", "CONQUISTO", "CUMBRES", "CONQUISTO", "MIS", "MIEDOS"];
const WORD_DELAY = 180; // ms between each word disappearing
const SHOW_DURATION = 1600; // ms before words start leaving

function Splash() {
  const [phase, setPhase] = useState<"in" | "out" | "done">("in");
  const [hiddenCount, setHiddenCount] = useState(0);

  useEffect(() => {
    const startOut = setTimeout(() => setPhase("out"), SHOW_DURATION);
    return () => clearTimeout(startOut);
  }, []);

  useEffect(() => {
    if (phase !== "out") return;
    if (hiddenCount >= WORDS.length) {
      const t = setTimeout(() => setPhase("done"), 400);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setHiddenCount((n) => n + 1), WORD_DELAY);
    return () => clearTimeout(t);
  }, [phase, hiddenCount]);

  if (phase === "done") return null;

  return (
    <div className="splash">
      <p className="splash-text">
        {WORDS.map((word, i) => {
          const direction = i % 2 === 0 ? "up" : "down";
          const isHidden = i < hiddenCount;
          return (
            <span
              key={i}
              className={`splash-word${isHidden ? ` splash-word--${direction}` : ""}`}
            >
              {word}
            </span>
          );
        })}
      </p>
    </div>
  );
}

export default Splash;
