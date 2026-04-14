import { useState, useMemo } from "react";
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps";
import { usePhotos } from "../hooks/usePhotos";
import "./Mapa.css";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const FIXED_PINS: { name: string; coords: [number, number]; iso: number; color: string }[] = [
  { name: "Argentina",  coords: [-63.6167, -38.4161], iso: 32,  color: "#3b82f6" },
  { name: "Chile",      coords: [-71.5430, -35.6751], iso: 152, color: "#f59e0b" },
  { name: "Ecuador",    coords: [-78.4678,  -1.8312], iso: 218, color: "#10b981" },
  { name: "Perú",       coords: [-75.0152,  -9.1900], iso: 604, color: "#ef4444" },
  { name: "USA",        coords: [-95.7129,  37.0902], iso: 840, color: "#8b5cf6" },
  { name: "Costa Rica", coords: [-83.7534,   9.7489], iso: 188, color: "#f97316" },
];

// iso → color for fast lookup
const ISO_COLOR: Record<number, string> = Object.fromEntries(
  FIXED_PINS.map((p) => [p.iso, p.color])
);

const COUNTRY_TO_ISO: Record<string, number> = {
  "Ecuador": 218, "Perú": 604, "Peru": 604, "Colombia": 170,
  "Bolivia": 68, "Chile": 152, "Argentina": 32, "Venezuela": 862,
  "Brasil": 76, "Brazil": 76, "México": 484, "Mexico": 484,
  "Estados Unidos": 840, "United States": 840, "USA": 840,
  "Costa Rica": 188, "España": 724, "Spain": 724, "Francia": 250,
  "France": 250, "Italia": 380, "Italy": 380, "Alemania": 276,
  "Germany": 276, "Canadá": 124, "Canada": 124, "Nepal": 524,
  "Tanzania": 834, "Kenia": 404, "Kenya": 404, "Rusia": 643,
  "Russia": 643, "China": 156, "Japón": 392, "Japan": 392,
  "Australia": 36, "Nueva Zelanda": 554, "New Zealand": 554,
  "Suiza": 756, "Switzerland": 756, "Austria": 40, "Noruega": 578, "Norway": 578,
};

type TooltipState = { x: number; y: number; name: string } | null;

export default function Mapa() {
  const { data: photos } = usePhotos();
  const [tooltip, setTooltip] = useState<TooltipState>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [position, setPosition] = useState<{ center: [number, number]; zoom: number }>({
    center: [0, 0],
    zoom: 1,
  });

  const handleSelect = (pin: typeof FIXED_PINS[0]) => {
    if (selected === pin.name) {
      setSelected(null);
      setPosition({ center: [0, 0], zoom: 1 });
    } else {
      setSelected(pin.name);
      setPosition({ center: pin.coords, zoom: 4 });
    }
  };

  const visitedMap = useMemo(() => {
    const map: Record<number, { name: string; count: number }> = {};
    photos?.forEach((p) => {
      if (!p.country) return;
      const iso = COUNTRY_TO_ISO[p.country];
      if (!iso) return;
      if (map[iso]) map[iso].count++;
      else map[iso] = { name: p.country, count: 1 };
    });
    return map;
  }, [photos]);

  const visitedCountries = useMemo(() => Object.values(visitedMap), [visitedMap]);

  const highlightedIso = useMemo(() => {
    const set = new Set(FIXED_PINS.map((p) => p.iso));
    Object.keys(visitedMap).forEach((k) => set.add(Number(k)));
    return set;
  }, [visitedMap]);

  const selectedPin = FIXED_PINS.find((p) => p.name === selected);

  return (
    <div className="mapa-page">
      <h1>Mis destinos</h1>
      <p className="mapa-subtitle">{FIXED_PINS.length} países visitados</p>

      <div className="mapa-container" style={{ position: "relative" }}>
        {position.zoom > 1 && (
          <button
            className="mapa-reset"
            onClick={() => { setSelected(null); setPosition({ center: [0, 0], zoom: 1 }); }}
          >
            ← Ver todo
          </button>
        )}

        <ComposableMap projectionConfig={{ scale: 147 }}>
          <ZoomableGroup
            center={position.center}
            zoom={position.zoom}
            onMoveEnd={({ coordinates, zoom }) =>
              setPosition({ center: coordinates as [number, number], zoom })
            }
          >
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const isoNum = Number(geo.id);
                  const isVisited = highlightedIso.has(isoNum);
                  const color = ISO_COLOR[isoNum];
                  const isSelected = selectedPin?.iso === isoNum;
                  const isDimmed = selected !== null && !isSelected;

                  let fill = "#c8dff0";
                  if (isVisited && color) {
                    fill = isDimmed ? `${color}44` : color;
                  }

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      style={{
                        default: { fill, stroke: "#fff", strokeWidth: 0.5, outline: "none", transition: "fill 0.3s" },
                        hover:   { fill, stroke: "#fff", strokeWidth: 0.5, outline: "none" },
                        pressed: { fill, stroke: "#fff", strokeWidth: 0.5, outline: "none" },
                      }}
                    />
                  );
                })
              }
            </Geographies>

            {FIXED_PINS.map((pin) => {
              const isDimmed = selected !== null && selected !== pin.name;
              return (
                <Marker
                  key={pin.name}
                  coordinates={pin.coords}
                  onClick={() => handleSelect(pin)}
                  onMouseEnter={(e) =>
                    setTooltip({ x: (e as MouseEvent).clientX, y: (e as MouseEvent).clientY, name: pin.name })
                  }
                  onMouseMove={(e) =>
                    setTooltip({ x: (e as MouseEvent).clientX, y: (e as MouseEvent).clientY, name: pin.name })
                  }
                  onMouseLeave={() => setTooltip(null)}
                >
                  <g
                    className="map-pin"
                    transform={`translate(-10, -22) scale(${1 / position.zoom})`}
                    style={{ transformOrigin: "10px 20px", opacity: isDimmed ? 0.3 : 1, transition: "opacity 0.3s" }}
                  >
                    <path
                      d="M10 0C6.13 0 3 3.13 3 7c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                      fill={pin.color}
                      stroke="#fff"
                      strokeWidth="1.5"
                    />
                    <circle cx="10" cy="7" r="3" fill="#fff" />
                  </g>
                </Marker>
              );
            })}
          </ZoomableGroup>
        </ComposableMap>
      </div>

      {tooltip && (
        <div className="mapa-tooltip" style={{ left: tooltip.x, top: tooltip.y }}>
          {tooltip.name}
        </div>
      )}

      <div className="mapa-legend">
        <h2>Países visitados</h2>
        <div className="mapa-country-list">
          {FIXED_PINS.map((pin) => {
            const isActive = selected === pin.name;
            return (
              <button
                key={pin.name}
                className="mapa-country-chip"
                style={{
                  borderColor: isActive ? pin.color : undefined,
                  background: isActive ? pin.color : undefined,
                  color: isActive ? "#fff" : pin.color,
                  boxShadow: isActive ? `0 4px 14px ${pin.color}55` : undefined,
                }}
                onClick={() => handleSelect(pin)}
              >
                📍 {pin.name}
              </button>
            );
          })}
          {visitedCountries
            .filter((c) => !FIXED_PINS.some((p) => p.name === c.name))
            .map((c) => (
              <div key={c.name} className="mapa-country-chip">
                {c.name}
                <span>{c.count}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
