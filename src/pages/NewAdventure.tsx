import { useState } from "react";
import * as Form from "@radix-ui/react-form";
import "./NewAdventure.css";

function NewAdventure() {
  const [photos, setPhotos] = useState<{ file: File; preview: string }[]>([]);

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    console.log({ ...data, photos: photos.map((p) => p.file) });
  };

  return (
    <div className="new-adventure-page">
      <h1>Nueva Aventura</h1>
      <Form.Root className="adventure-form" onSubmit={handleSubmit}>

        {/* Name */}
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

        {/* Country */}
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

        {/* Altitude + Days side by side */}
        <div className="form-row">
          <Form.Field className="form-field" name="altitud">
            <div className="form-label-row">
              <Form.Label className="form-label">Altitud (m)</Form.Label>
              <Form.Message className="form-message" match="valueMissing">
                Requerido
              </Form.Message>
            </div>
            <Form.Control asChild>
              <input className="form-input" type="number" placeholder="Ej. 4200" min={0} required />
            </Form.Control>
          </Form.Field>

          <Form.Field className="form-field" name="dias">
            <div className="form-label-row">
              <Form.Label className="form-label">Días</Form.Label>
              <Form.Message className="form-message" match="valueMissing">
                Requerido
              </Form.Message>
            </div>
            <Form.Control asChild>
              <input className="form-input" type="number" placeholder="Ej. 5" min={1} required />
            </Form.Control>
          </Form.Field>
        </div>

        {/* Cost */}
        <Form.Field className="form-field" name="costo">
          <div className="form-label-row">
            <Form.Label className="form-label">Costo (USD)</Form.Label>
            <Form.Message className="form-message" match="valueMissing">
              Por favor ingresa el costo
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input className="form-input" type="number" placeholder="Ej. 500" min={0} required />
          </Form.Control>
        </Form.Field>

        {/* Photos */}
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

        <Form.Submit className="form-submit">Guardar Aventura</Form.Submit>
      </Form.Root>
    </div>
  );
}

export default NewAdventure;
