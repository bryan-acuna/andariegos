import { useState } from "react";
import * as Progress from "@radix-ui/react-progress";
import { useNavigate } from "react-router-dom";
import { uploadImage } from "../../lib/uploadImage";
import { supabase } from "../../lib/supabase";
import { useToast } from "../../components";
import "./NewAdventure.css";

function NewAdventure() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState<{ file: File; preview: string }[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const newPhotos = Array.from(files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setPhotos((prev) => [...prev, ...newPhotos]);
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => {
      URL.revokeObjectURL(prev[index].preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Por favor ingresa un nombre.");
      return;
    }
    if (!country.trim()) {
      setError("Por favor ingresa el país.");
      return;
    }
    if (photos.length === 0) {
      setError("Por favor sube al menos una foto.");
      return;
    }

    setSubmitting(true);
    try {
      for (const photo of photos) {
        const image_url = await uploadImage(photo.file, "andariegos");
        const { error: dbError } = await supabase
          .from("Images")
          .insert([
            {
              Name: name.trim(),
              country: country.trim(),
              description: description.trim(),
              image_url,
            },
          ]);
        if (dbError) throw new Error(dbError.message);
      }
      toast(
        "success",
        "Aventura guardada",
        "La aventura fue creada correctamente.",
      );
      navigate("/admin");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error al guardar.";
      setError(msg);
      toast("error", "Error al guardar", msg);
      setSubmitting(false);
    }
  };

  return (
    <div className="new-adventure-page">
      <h1>Nueva Aventura</h1>
      <form className="adventure-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label className="form-label" htmlFor="nombre">
            Nombre
          </label>
          <input
            id="nombre"
            className="form-input"
            type="text"
            placeholder="Nombre de la aventura"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="pais">
            País
          </label>
          <input
            id="pais"
            className="form-input"
            type="text"
            placeholder="Ej. Perú"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="descripcion">
            Descripción
          </label>
          <textarea
            id="descripcion"
            className="form-input form-textarea"
            placeholder="Descripción de la aventura..."
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="form-field">
          <span className="form-label">Fotos</span>
          <label className="photo-upload-area">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleFiles(e.target.files)}
            />
            <svg
              className="upload-icon"
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
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <span className="upload-label">Haz clic para subir fotos</span>
            <span className="upload-hint">
              PNG, JPG, WEBP — múltiples archivos permitidos
            </span>
          </label>

          {photos.length > 0 && (
            <div className="photo-previews">
              {photos.map((p, i) => (
                <div key={i} className="photo-preview-wrap">
                  <img
                    src={p.preview}
                    alt={`preview-${i}`}
                    className="photo-preview"
                  />
                  <button
                    type="button"
                    className="photo-remove"
                    onClick={() => removePhoto(i)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {error && (
          <p style={{ color: "#e53e3e", fontSize: "0.9rem", margin: 0 }}>
            {error}
          </p>
        )}

        {submitting && (
          <Progress.Root
            style={{
              height: 4,
              borderRadius: 99,
              background: "#e5e5e5",
              overflow: "hidden",
            }}
            value={null}
          >
            <Progress.Indicator
              style={{
                height: "100%",
                width: "40%",
                background: "#646cff",
                borderRadius: 99,
                animation: "slide 1.2s ease-in-out infinite",
              }}
            />
          </Progress.Root>
        )}

        <button className="form-submit" type="submit" disabled={submitting}>
          {submitting ? "Guardando..." : "Guardar Aventura"}
        </button>
      </form>
    </div>
  );
}

export default NewAdventure;
