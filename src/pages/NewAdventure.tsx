import { useState } from "react";
import * as Form from "@radix-ui/react-form";
import * as Progress from "@radix-ui/react-progress";
import { useNavigate } from "react-router-dom";
import { uploadImage } from "../lib/uploadImage";
import { supabase } from "../lib/supabase";
import "./NewAdventure.css";

function NewAdventure() {
  const navigate = useNavigate();
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
    if (photos.length === 0) {
      setError("Por favor sube al menos una foto.");
      return;
    }
    setError(null);
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const Name = formData.get("nombre") as string;
    const country = formData.get("pais") as string;
    const description = formData.get("descripcion") as string;

    try {
      for (const photo of photos) {
        const image_url = await uploadImage(photo.file, "andariegos");
        const { error: dbError } = await supabase
          .from("Images")
          .insert([{ Name, country, description, image_url }]);
        if (dbError) throw new Error(dbError.message);
      }
      navigate("/admin");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error al guardar.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="new-adventure-page">
      <h1>Nueva Aventura</h1>
      <Form.Root className="adventure-form" onSubmit={handleSubmit}>

        <Form.Field className="form-field" name="nombre">
          <div className="form-label-row">
            <Form.Label className="form-label">Nombre</Form.Label>
            <Form.Message className="form-message" match="valueMissing">
              Por favor ingresa un nombre
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input className="form-input" type="text" placeholder="Nombre de la aventura" required />
          </Form.Control>
        </Form.Field>

        <Form.Field className="form-field" name="pais">
          <div className="form-label-row">
            <Form.Label className="form-label">País</Form.Label>
            <Form.Message className="form-message" match="valueMissing">
              Por favor ingresa el país
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input className="form-input" type="text" placeholder="Ej. Perú" required />
          </Form.Control>
        </Form.Field>

        <Form.Field className="form-field" name="descripcion">
          <div className="form-label-row">
            <Form.Label className="form-label">Descripción</Form.Label>
          </div>
          <Form.Control asChild>
            <textarea className="form-input form-textarea" placeholder="Descripción de la aventura..." rows={3} />
          </Form.Control>
        </Form.Field>

        <div className="form-field">
          <span className="form-label">Fotos</span>
          <label className="photo-upload-area">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleFiles(e.target.files)}
            />
            <svg className="upload-icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="17 8 12 3 7 8"/>
              <line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
            <span className="upload-label">Haz clic para subir fotos</span>
            <span className="upload-hint">PNG, JPG, WEBP — múltiples archivos permitidos</span>
          </label>

          {photos.length > 0 && (
            <div className="photo-previews">
              {photos.map((p, i) => (
                <div key={i} className="photo-preview-wrap">
                  <img src={p.preview} alt={`preview-${i}`} className="photo-preview" />
                  <button type="button" className="photo-remove" onClick={() => removePhoto(i)}>✕</button>
                </div>
              ))}
            </div>
          )}
        </div>

        {error && <p style={{ color: "#e53e3e", fontSize: "0.9rem" }}>{error}</p>}

        {submitting && (
          <Progress.Root style={{ height: 4, borderRadius: 99, background: "#e5e5e5", overflow: "hidden" }} value={null}>
            <Progress.Indicator style={{ height: "100%", width: "40%", background: "#646cff", borderRadius: 99, animation: "slide 1.2s ease-in-out infinite" }} />
          </Progress.Root>
        )}

        <Form.Submit className="form-submit" disabled={submitting}>
          {submitting ? "Guardando..." : "Guardar Aventura"}
        </Form.Submit>
      </Form.Root>
    </div>
  );
}

export default NewAdventure;
