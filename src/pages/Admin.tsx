import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Progress from "@radix-ui/react-progress";
import { usePhotos } from "../hooks/usePhotos";

type Photo = {
  id: string;
  created_at: string;
  image_url: string;
  name?: string;
  country?: string;
  description?: string;
};
import { useDeletePhoto } from "../hooks/useDeletePhoto";
import { useUpdatePhoto } from "../hooks/useUpdatePhoto";
import { uploadImage } from "../lib/uploadImage";
import { supabase } from "../lib/supabase";
import { useQueryClient } from "@tanstack/react-query";
import Loader from "../components/Loader";
import "./Admin.css";

function AdminCard({ photo }: { photo: Photo }) {
  const [name, setName] = useState(photo.name ?? "");
  const [country, setCountry] = useState(photo.country ?? "");
  const [desc, setDesc] = useState(photo.description ?? "");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { mutate: deletePhoto, isPending: deleting } = useDeletePhoto();
  const { mutate: updatePhoto, isPending: saving } = useUpdatePhoto();

  const isDirty =
    name !== (photo.name ?? "") ||
    country !== (photo.country ?? "") ||
    desc !== (photo.description ?? "");

  return (
    <>
      <div className="admin-card">
        <img src={photo.image_url} alt={photo.name ?? photo.description} className="admin-card-img" />
        <div className="admin-card-body">
          <input
            className="admin-desc-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre..."
          />
          <input
            className="admin-desc-input"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="País..."
          />
          <textarea
            className="admin-desc-input"
            rows={2}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Descripción..."
          />
          <div className="admin-card-actions">
            <button
              className="btn-save"
              disabled={saving || !isDirty}
              onClick={() => updatePhoto({ id: photo.id, name, country, description: desc })}
            >
              {saving ? "Guardando..." : "Guardar"}
            </button>
            <button
              className="btn-delete"
              disabled={deleting}
              onClick={() => setConfirmOpen(true)}
            >
              {deleting ? "..." : "Eliminar"}
            </button>
          </div>
        </div>
      </div>

      {/* Confirm delete dialog */}
      <Dialog.Root open={confirmOpen} onOpenChange={setConfirmOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="confirm-overlay" />
          <Dialog.Content className="confirm-content">
            <Dialog.Title asChild>
              <h3>¿Eliminar foto?</h3>
            </Dialog.Title>
            <Dialog.Description asChild>
              <p>Esta acción no se puede deshacer.</p>
            </Dialog.Description>
            <div className="confirm-actions">
              <Dialog.Close className="btn-cancel">Cancelar</Dialog.Close>
              <button
                className="btn-confirm-delete"
                onClick={() => {
                  deletePhoto({ id: photo.id, imageUrl: photo.image_url });
                  setConfirmOpen(false);
                }}
              >
                Eliminar
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}

function Admin() {
  const { data: photos, isLoading, isError } = usePhotos();
  const [uploading, setUploading] = useState(false);
  const queryClient = useQueryClient();

  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const publicUrl = await uploadImage(file, "andariegos");
        await supabase.from("Images").insert([{ image_url: publicUrl, name: "", country: "", description: "" }]);
      }
      queryClient.invalidateQueries({ queryKey: ["training_photos"] });
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="admin-page">
      <h1>Gestionar fotos</h1>

      {/* Upload */}
      <div className="admin-upload">
        <h2>Subir nuevas fotos</h2>
        <label className="admin-upload-area">
          <input
            type="file"
            accept="image/*"
            multiple
            disabled={uploading}
            onChange={(e) => handleUpload(e.target.files)}
          />
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="17 8 12 3 7 8"/>
            <line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
          <span>{uploading ? "Subiendo..." : "Haz clic para subir fotos"}</span>
          <span className="upload-hint">PNG, JPG, WEBP — múltiples archivos</span>
        </label>

        {uploading && (
          <div className="upload-progress">
            <Progress.Root className="upload-progress-root" value={null}>
              <Progress.Indicator className="upload-progress-indicator" />
            </Progress.Root>
          </div>
        )}
      </div>

      {/* Grid */}
      {isLoading && <Loader />}
      {isError && <p style={{ color: "#e53e3e" }}>Error al cargar fotos.</p>}
      {photos && (
        <div className="admin-grid">
          {photos.map((photo) => (
            <AdminCard key={photo.id} photo={photo} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Admin;
