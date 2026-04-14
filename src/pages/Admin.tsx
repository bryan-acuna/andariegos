import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Link } from "react-router-dom";
import { usePhotos } from "../hooks/usePhotos";
import { useDeletePhoto } from "../hooks/useDeletePhoto";
import { useUpdatePhoto } from "../hooks/useUpdatePhoto";
import Loader from "../components/Loader";
import { useToast } from "../components/Toast";
import "./Admin.css";

type Photo = {
  id: number;
  created_at: string;
  image_url: string;
  Name?: string;
  country?: string;
  description?: string;
};

function AdminCard({ photo }: { photo: Photo }) {
  const [name, setName] = useState(photo.Name ?? "");
  const [country, setCountry] = useState(photo.country ?? "");
  const [desc, setDesc] = useState(photo.description ?? "");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { toast } = useToast();
  const { mutate: deletePhoto, isPending: deleting } = useDeletePhoto({
    onSuccess: () => toast("success", "Foto eliminada"),
    onError: () => toast("error", "Error al eliminar", "Inténtalo de nuevo."),
  });
  const { mutate: updatePhoto, isPending: saving } = useUpdatePhoto({
    onSuccess: () => toast("success", "Cambios guardados"),
    onError: () => toast("error", "Error al guardar", "Inténtalo de nuevo."),
  });

  const isDirty =
    name !== (photo.Name ?? "") ||
    country !== (photo.country ?? "") ||
    desc !== (photo.description ?? "");

  return (
    <>
      <div className="admin-card">
        <img src={photo.image_url} alt={photo.Name ?? photo.description} className="admin-card-img" />
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
              onClick={() => updatePhoto({ id: photo.id, Name: name, country, description: desc })}
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

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Gestionar fotos</h1>
        <Link to="/newadventure" className="btn-add">+ Agregar</Link>
      </div>

      {isLoading && <Loader />}
      {isError && <p style={{ color: "#e53e3e" }}>Error al cargar fotos.</p>}
      {photos && (
        <div className="admin-grid">
          {photos.map((photo) => (
            <AdminCard key={photo.id} photo={photo as Photo} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Admin;
