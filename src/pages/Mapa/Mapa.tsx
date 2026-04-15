import { useState, useMemo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import * as Dialog from "@radix-ui/react-dialog";

import type { Geography as GeoType } from "react-simple-maps";
import "./Mapa.css";
import { usePhotos, type Photo } from "../../hooks/usePhotos";

const GEO_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Color palette — cycles through for as many countries as needed
const PALETTE = [
  "#3b82f6",
  "#ef4444",
  "#10b981",
  "#f59e0b",
  "#8b5cf6",
  "#f97316",
  "#06b6d4",
  "#ec4899",
  "#84cc16",
  "#6366f1",
];

// Country name (as stored in DB) → { iso, coords, canonical display name, aliases }
type CountryMeta = {
  iso: number;
  coords: [number, number];
  label: string;
  aliases: string[];
};

const COUNTRY_META: Record<string, CountryMeta> = {
  Argentina: {
    iso: 32,
    coords: [-63.6167, -38.4161],
    label: "Argentina",
    aliases: ["Argentina"],
  },
  Chile: {
    iso: 152,
    coords: [-71.543, -35.6751],
    label: "Chile",
    aliases: ["Chile"],
  },
  Ecuador: {
    iso: 218,
    coords: [-78.4678, -1.8312],
    label: "Ecuador",
    aliases: ["Ecuador"],
  },
  Perú: {
    iso: 604,
    coords: [-75.0152, -9.19],
    label: "Perú",
    aliases: ["Perú", "Peru"],
  },
  Peru: {
    iso: 604,
    coords: [-75.0152, -9.19],
    label: "Perú",
    aliases: ["Perú", "Peru"],
  },
  USA: {
    iso: 840,
    coords: [-95.7129, 37.0902],
    label: "USA",
    aliases: ["USA", "United States", "Estados Unidos"],
  },
  "United States": {
    iso: 840,
    coords: [-95.7129, 37.0902],
    label: "USA",
    aliases: ["USA", "United States", "Estados Unidos"],
  },
  "Estados Unidos": {
    iso: 840,
    coords: [-95.7129, 37.0902],
    label: "USA",
    aliases: ["USA", "United States", "Estados Unidos"],
  },
  "Costa Rica": {
    iso: 188,
    coords: [-83.7534, 9.7489],
    label: "Costa Rica",
    aliases: ["Costa Rica"],
  },
  Colombia: {
    iso: 170,
    coords: [-74.2973, 4.5709],
    label: "Colombia",
    aliases: ["Colombia"],
  },
  Bolivia: {
    iso: 68,
    coords: [-64.9631, -16.2902],
    label: "Bolivia",
    aliases: ["Bolivia"],
  },
  Venezuela: {
    iso: 862,
    coords: [-66.5897, 6.4238],
    label: "Venezuela",
    aliases: ["Venezuela"],
  },
  Brasil: {
    iso: 76,
    coords: [-51.9253, -14.235],
    label: "Brasil",
    aliases: ["Brasil", "Brazil"],
  },
  Brazil: {
    iso: 76,
    coords: [-51.9253, -14.235],
    label: "Brasil",
    aliases: ["Brasil", "Brazil"],
  },
  México: {
    iso: 484,
    coords: [-102.5528, 23.6345],
    label: "México",
    aliases: ["México", "Mexico"],
  },
  Mexico: {
    iso: 484,
    coords: [-102.5528, 23.6345],
    label: "México",
    aliases: ["México", "Mexico"],
  },
  España: {
    iso: 724,
    coords: [-3.7492, 40.4637],
    label: "España",
    aliases: ["España", "Spain"],
  },
  Spain: {
    iso: 724,
    coords: [-3.7492, 40.4637],
    label: "España",
    aliases: ["España", "Spain"],
  },
  Francia: {
    iso: 250,
    coords: [2.3522, 48.8566],
    label: "Francia",
    aliases: ["Francia", "France"],
  },
  France: {
    iso: 250,
    coords: [2.3522, 48.8566],
    label: "Francia",
    aliases: ["Francia", "France"],
  },
  Italia: {
    iso: 380,
    coords: [12.5674, 41.8719],
    label: "Italia",
    aliases: ["Italia", "Italy"],
  },
  Italy: {
    iso: 380,
    coords: [12.5674, 41.8719],
    label: "Italia",
    aliases: ["Italia", "Italy"],
  },
  Alemania: {
    iso: 276,
    coords: [10.4515, 51.1657],
    label: "Alemania",
    aliases: ["Alemania", "Germany"],
  },
  Germany: {
    iso: 276,
    coords: [10.4515, 51.1657],
    label: "Alemania",
    aliases: ["Alemania", "Germany"],
  },
  Canadá: {
    iso: 124,
    coords: [-96.8165, 56.1304],
    label: "Canadá",
    aliases: ["Canadá", "Canada"],
  },
  Canada: {
    iso: 124,
    coords: [-96.8165, 56.1304],
    label: "Canadá",
    aliases: ["Canadá", "Canada"],
  },
  Nepal: {
    iso: 524,
    coords: [84.124, 28.3949],
    label: "Nepal",
    aliases: ["Nepal"],
  },
  Tanzania: {
    iso: 834,
    coords: [34.8888, -6.369],
    label: "Tanzania",
    aliases: ["Tanzania"],
  },
  Kenia: {
    iso: 404,
    coords: [37.9062, -0.0236],
    label: "Kenia",
    aliases: ["Kenia", "Kenya"],
  },
  Kenya: {
    iso: 404,
    coords: [37.9062, -0.0236],
    label: "Kenia",
    aliases: ["Kenia", "Kenya"],
  },
  Japón: {
    iso: 392,
    coords: [138.2529, 36.2048],
    label: "Japón",
    aliases: ["Japón", "Japan"],
  },
  Japan: {
    iso: 392,
    coords: [138.2529, 36.2048],
    label: "Japón",
    aliases: ["Japón", "Japan"],
  },
  Australia: {
    iso: 36,
    coords: [133.7751, -25.2744],
    label: "Australia",
    aliases: ["Australia"],
  },
  Suiza: {
    iso: 756,
    coords: [8.2275, 46.8182],
    label: "Suiza",
    aliases: ["Suiza", "Switzerland"],
  },
  Switzerland: {
    iso: 756,
    coords: [8.2275, 46.8182],
    label: "Suiza",
    aliases: ["Suiza", "Switzerland"],
  },
  Noruega: {
    iso: 578,
    coords: [8.4689, 60.472],
    label: "Noruega",
    aliases: ["Noruega", "Norway"],
  },
  Norway: {
    iso: 578,
    coords: [8.4689, 60.472],
    label: "Noruega",
    aliases: ["Noruega", "Norway"],
  },
};

type Pin = {
  name: string;
  label: string;
  coords: [number, number];
  iso: number;
  color: string;
  aliases: string[];
};
type TooltipState = { x: number; y: number; name: string } | null;

export default function Mapa() {
  const { data: photos } = usePhotos();
  const [tooltip, setTooltip] = useState<TooltipState>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<Photo | null>(null);
  const [position, setPosition] = useState<{
    center: [number, number];
    zoom: number;
  }>({
    center: [0, 0],
    zoom: 1,
  });

  // Derive unique pins from DB countries
  const pins = useMemo<Pin[]>(() => {
    const seen = new Set<number>(); // deduplicate by ISO
    const result: Pin[] = [];
    let colorIdx = 0;

    photos?.forEach((p) => {
      if (!p.country) return;
      const meta = COUNTRY_META[p.country];
      if (!meta || seen.has(meta.iso)) return;
      seen.add(meta.iso);
      result.push({
        name: meta.label,
        label: meta.label,
        coords: meta.coords,
        iso: meta.iso,
        color: PALETTE[colorIdx++ % PALETTE.length],
        aliases: meta.aliases,
      });
    });

    return result;
  }, [photos]);

  const isoColorMap = useMemo<Record<number, string>>(
    () => Object.fromEntries(pins.map((p) => [p.iso, p.color])),
    [pins],
  );

  const highlightedIso = useMemo(() => new Set(pins.map((p) => p.iso)), [pins]);

  const selectedPin = pins.find((p) => p.name === selected);

  const countryPhotos = useMemo(() => {
    if (!selectedPin || !photos) return [];
    return photos.filter(
      (p) => p.country && selectedPin.aliases.includes(p.country),
    );
  }, [selectedPin, photos]);

  const handleSelect = (pin: Pin) => {
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

  return (
    <div className="mapa-page">
      <h1>Mis destinos</h1>
      <p className="mapa-subtitle">
        {pins.length} {pins.length === 1 ? "país visitado" : "países visitados"}
      </p>

      <div className={`mapa-layout ${selected ? "mapa-layout--split" : ""}`}>
        <div className="mapa-container">
          {position.zoom > 1 && (
            <button className="mapa-reset" onClick={handleReset}>
              ← Ver todo
            </button>
          )}
          <ComposableMap projectionConfig={{ scale: 147 }}>
            <ZoomableGroup
              center={position.center}
              zoom={position.zoom}
              onMoveEnd={({
                coordinates,
                zoom,
              }: {
                coordinates: [number, number];
                zoom: number;
              }) => setPosition({ center: coordinates, zoom })}
            >
              <Geographies geography={GEO_URL}>
                {({ geographies }: { geographies: GeoType[] }) =>
                  geographies.map((geo: GeoType) => {
                    const isoNum = Number(geo.id);
                    const isVisited = highlightedIso.has(isoNum);
                    const color = isoColorMap[isoNum];
                    const isSelected = selectedPin?.iso === isoNum;
                    const isDimmed = selected !== null && !isSelected;

                    let fill = "#c8dff0";
                    if (isVisited && color)
                      fill = isDimmed ? `${color}44` : color;

                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        style={{
                          default: {
                            fill,
                            stroke: "#fff",
                            strokeWidth: 0.5,
                            outline: "none",
                            transition: "fill 0.3s",
                          },
                          hover: {
                            fill,
                            stroke: "#fff",
                            strokeWidth: 0.5,
                            outline: "none",
                          },
                          pressed: {
                            fill,
                            stroke: "#fff",
                            strokeWidth: 0.5,
                            outline: "none",
                          },
                        }}
                      />
                    );
                  })
                }
              </Geographies>

              {pins.map((pin) => {
                const isDimmed = selected !== null && selected !== pin.name;
                return (
                  <Marker
                    key={pin.name}
                    coordinates={pin.coords}
                    onClick={() => handleSelect(pin)}
                    onMouseEnter={(e) =>
                      setTooltip({
                        x: e.clientX,
                        y: e.clientY,
                        name: pin.label,
                      })
                    }
                    onMouseMove={(e) =>
                      setTooltip({
                        x: e.clientX,
                        y: e.clientY,
                        name: pin.label,
                      })
                    }
                    onMouseLeave={() => setTooltip(null)}
                  >
                    <g
                      className="map-pin"
                      transform={`translate(-10, -22) scale(${1 / position.zoom})`}
                      style={{
                        transformOrigin: "10px 20px",
                        opacity: isDimmed ? 0.3 : 1,
                        transition: "opacity 0.3s",
                      }}
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

        {selected && selectedPin && (
          <div
            className="mapa-panel"
            style={
              { "--panel-color": selectedPin.color } as React.CSSProperties
            }
          >
            <div
              className="mapa-panel-header"
              style={{ borderColor: selectedPin.color }}
            >
              <div>
                <h2 style={{ color: selectedPin.color }}>
                  {selectedPin.label}
                </h2>
                <p className="mapa-panel-count">
                  {countryPhotos.length}{" "}
                  {countryPhotos.length === 1 ? "foto" : "fotos"}
                </p>
              </div>
              <button className="mapa-panel-close" onClick={handleReset}>
                ✕
              </button>
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
                    {photo.Name && (
                      <span className="mapa-thumb-label">{photo.Name}</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {tooltip && (
        <div
          className="mapa-tooltip"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          {tooltip.name}
        </div>
      )}

      <div className="mapa-legend">
        <h2>Países visitados</h2>
        <div className="mapa-country-list">
          {pins.map((pin) => {
            const isActive = selected === pin.name;
            return (
              <button
                key={pin.name}
                className="mapa-country-chip"
                style={{
                  borderColor: pin.color,
                  background: isActive ? pin.color : "transparent",
                  color: isActive ? "#fff" : pin.color,
                  boxShadow: isActive ? `0 4px 14px ${pin.color}55` : undefined,
                }}
                onClick={() => handleSelect(pin)}
              >
                📍 {pin.label}
              </button>
            );
          })}
          {pins.length === 0 && (
            <p style={{ color: "#888", fontSize: "0.9rem" }}>
              Agrega aventuras con país para ver destinos aquí.
            </p>
          )}
        </div>
      </div>

      <Dialog.Root
        open={!!lightbox}
        onOpenChange={(open) => !open && setLightbox(null)}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="dialog-overlay" />
          <Dialog.Content className="dialog-content">
            <Dialog.Title className="dialog-title">
              {lightbox?.Name || lightbox?.description || "Foto"}
            </Dialog.Title>
            <img
              src={lightbox?.image_url}
              alt={lightbox?.Name ?? ""}
              className="dialog-image"
            />
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
