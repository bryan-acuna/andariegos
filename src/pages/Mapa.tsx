import { useState, useMemo } from "react";
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps";
import * as Dialog from "@radix-ui/react-dialog";
import { usePhotos } from "../hooks/usePhotos";
import type { Photo } from "../hooks/usePhotos";
import "./Mapa.css";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const FIXED_PINS: {
  name: string;
  coords: [number, number];
  iso: number;
  color: string;
  aliases: string[];
}[] = [
  { name: "Argentina",  coords: [-63.6167, -38.4161], iso: 32,  color: "#3b82f6", aliases: ["Argentina"] },
  { name: "Chile",      coords: [-71.5430, -35.6751], iso: 152, color: "#f59e0b", aliases: ["Chile"] },
  { name: "Ecuador",    coords: [-78.4678,  -1.8312], iso: 218, color: "#10b981", aliases: ["Ecuador"] },
  { name: "Perú",       coords: [-75.0152,  -9.1900], iso: 604, color: "#ef4444", aliases: ["Perú", "Peru"] },
  { name: "USA",        coords: [-95.7129,  37.0902], iso: 840, color: "#8b5cf6", aliases: ["USA", "United States", "Estados Unidos"] },
  { name: "Costa Rica", coords: [-83.7534,   9.7489], iso: 188, color: "#f97316", aliases: ["Costa Rica"] },
];

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
  const [tooltip, setTooltip]   = useState<TooltipState>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<Photo | null>(null);
  const [position, setPosition] = useState<{ center: [number, number]; zoom: number }>({
    center: [0, 0],
    zoom: 1,
  });

  const selectedPin = FIXED_PINS.find((p) => p.name === selected);

  const handleSelect = (pin: typeof FIXED_PINS[0]) => {
    if (selected === pin.name) {
      setSelected(null);
      setPosition({ center: [0, 0], zoom: 1 });
    } else {
      setSelected(pin.name);
      setPosition({ center: pin.coords, zoom: 4 });
    }
  };

  const handleReset = () => {
    setSelected(null);
    setPosition({ center: [0, 0], zoom: 1 });
  };

  // Photos for selected country
  const countryPhotos = useMemo(() => {
    if (!selectedPin || !photos) return [];
    return photos.filter(
      (p) => p.country && selectedPin.aliases.includes(p.country)
    );
  }, [selectedPin, photos]);

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

  const highlightedIso = useMemo(() => {
    const set = new Set(FIXED_PINS.map((p) => p.iso));
    Object.keys(visitedMap).forEach((k) => set.add(Number(k)));
    return set;
  }, [visitedMap]);

  return (
    <div className="mapa-page">
      <h1>Mis destinos</h1>
      <p className="mapa-subtitle">{FIXED_PINS.length} países visitados</p>

      {/* Map + panel side by side when selected */}
      <div className={`mapa-layout ${selected ? "mapa-layout--split" : ""}`}>
        <div className="mapa-container">
          {position.zoom > 1 && (
            <button className="mapa-reset" onClick={handleReset}>← Ver todo</button>
          )}
          <ComposableMap projectionConfig={{ scale: 147 }}>
            <ZoomableGroup
              center={position.center}
              zoom={position.zoom}
              onMoveEnd={({ coordinates, zoom }: { coordinates: [number, number]; zoom: number }) =>
                setPosition({ center: coordinates, zoom })
              }
            >
              <Geographies geography={GEO_URL}>
                {({ geographies }: { geographies: import("react-simple-maps").Geography[] }) =>
                  geographies.map((geo: import("react-simple-maps").Geography) => {
                    const isoNum   = Number(geo.id);
                    const isVisited = highlightedIso.has(isoNum);
                    const color     = ISO_COLOR[isoNum];
                    const isSelected = selectedPin?.iso === isoNum;
                    const isDimmed   = selected !== null && !isSelected;

                    let fill = "#c8dff0";
                    if (isVisited && color) fill = isDimmed ? `${color}44` : color;

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
                    onMouseEnter={(e) => setTooltip({ x: e.clientX, y: e.clientY, name: pin.name })}
                    onMouseMove={(e)  => setTooltip({ x: e.clientX, y: e.clientY, name: pin.name })}
                    onMouseLeave={() => setTooltip(null)}
                  >
                    <g
                      className="map-pin"
                      transform={`translate(-10, -22) scale(${1 / position.zoom})`}
                      style={{ transformOrigin: "10px 20px", opacity: isDimmed ? 0.3 : 1, transition: "opacity 0.3s" }}
                    >
                      <path
                        d="M10 0C6.13 0 3 3.13 3 7c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                        fill={pin.color} stroke="#fff" strokeWidth="1.5"
                      />
                      <circle cx="10" cy="7" r="3" fill="#fff" />
                    </g>
                  </Marker>
                );
              })}
            </ZoomableGroup>
          </ComposableMap>
        </div>

        {/* Photo panel */}
        {selected && selectedPin && (
          <div className="mapa-panel" style={{ "--panel-color": selectedPin.color } as React.CSSProperties}>
            <div className="mapa-panel-header" style={{ borderColor: selectedPin.color }}>
              <div>
                <h2 style={{ color: selectedPin.color }}>{selectedPin.name}</h2>
                <p className="mapa-panel-count">
                  {countryPhotos.length} {countryPhotos.length === 1 ? "foto" : "fotos"}
                </p>
              </div>
              <button className="mapa-panel-close" onClick={handleReset}>✕</button>
            </div>

            {countryPhotos.length === 0 ? (
              <p className="mapa-panel-empty">No hay fotos de este país aún.</p>
            ) : (
              <div className="mapa-panel-grid">
                {countryPhotos.map((photo) => (
                  <div
                    key={photo.id}
                    className="mapa-panel-thumb"
                    onClick={() => setLightbox(photo)}
                  >
                    <img src={photo.image_url} alt={photo.Name ?? ""} />
                    {photo.Name && <span className="mapa-thumb-label">{photo.Name}</span>}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {tooltip && (
        <div className="mapa-tooltip" style={{ left: tooltip.x, top: tooltip.y }}>
          {tooltip.name}
        </div>
      )}

      {/* Chips */}
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
                  borderColor: pin.color,
                  background:  isActive ? pin.color : "transparent",
                  color:       isActive ? "#fff" : pin.color,
                  boxShadow:   isActive ? `0 4px 14px ${pin.color}55` : undefined,
                }}
                onClick={() => handleSelect(pin)}
              >
                📍 {pin.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      <Dialog.Root open={!!lightbox} onOpenChange={(open) => !open && setLightbox(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="dialog-overlay" />
          <Dialog.Content className="dialog-content">
            <Dialog.Title className="dialog-title">
              {lightbox?.Name || lightbox?.description || "Foto"}
            </Dialog.Title>
            <img src={lightbox?.image_url} alt={lightbox?.Name ?? ""} className="dialog-image" />
            <div className="dialog-meta">
              {lightbox?.country && (
                <span className="dialog-meta-item">
                  <span className="dialog-meta-label">País</span>
                  {lightbox.country}
                </span>
              )}
              {lightbox?.description && (
                <span className="dialog-meta-item">
                  <span className="dialog-meta-label">Descripción</span>
                  {lightbox.description}
                </span>
              )}
            </div>
            <Dialog.Close className="dialog-close">✕</Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
