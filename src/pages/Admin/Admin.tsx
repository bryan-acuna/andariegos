import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Link, useNavigate } from "react-router-dom"; // ← added useNavigate

import "./Admin.css";
import { useToast, Loader } from "../../components";
import { useDeletePhoto } from "../../hooks/useDeletePhoto";
import { useUpdatePhoto } from "../../hooks/useUpdatePhoto";
import { usePhotos } from "../../hooks/usePhotos";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { useAuth } from "../../hooks/useAuth"; // ← added
import { COUNTRIES } from "../../lib/countries";
import type { Photo } from "../../types/photo.types";

function AdminCard({ photo }: { photo: Photo }) {
  const [editing, setEditing] = useState(false);
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
    onSuccess: () => {
      toast("success", "Cambios guardados");
      setEditing(false);
    },
    onError: () => toast("error", "Error al guardar", "Inténtalo de nuevo."),
  });

  const handleCancel = () => {
    setName(photo.Name ?? "");
    setCountry(photo.country ?? "");
    setDesc(photo.description ?? "");
    setEditing(false);
  };

  return (
    <>
      <div className="admin-card">
        <img
          src={photo.image_url}
          alt={photo.Name ?? photo.description ?? ""}
          className="admin-card-img"
        />
        <div className="admin-card-body">
          {editing ? (
            <>
              <div className="admin-field">
                <label className="admin-field-label">Nombre</label>
                <input
                  className="admin-desc-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nombre..."
                  autoFocus
                />
              </div>
              <div className="admin-field">
                <label className="admin-field-label">País</label>
                <select
                  className="admin-desc-input admin-select"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option value="">Seleccionar país...</option>
                  {COUNTRIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div className="admin-field">
                <label className="admin-field-label">Descripción</label>
                <textarea
                  className="admin-desc-input"
                  rows={2}
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Descripción..."
                />
              </div>
              <div className="admin-card-actions">
                <button
                  className="btn-save"
                  disabled={saving}
                  onClick={() =>
                    updatePhoto({
                      id: photo.id,
                      Name: name,
                      country,
                      description: desc,
                    })
                  }
                >
                  {saving ? "Guardando..." : "Guardar"}
                </button>
                <button
                  className="btn-cancel-edit"
                  disabled={saving}
                  onClick={handleCancel}
                >
                  Cancelar
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="admin-card-meta">
                <p className="admin-meta-name">
                  {name || <em className="admin-meta-empty">Sin nombre</em>}
                </p>
                <p className="admin-meta-country">
                  {country || <em className="admin-meta-empty">Sin país</em>}
                </p>
                {desc && <p className="admin-meta-desc">{desc}</p>}
              </div>
              <div className="admin-card-actions">
                <button className="btn-edit" onClick={() => setEditing(true)}>
                  Editar
                </button>
                <button
                  className="btn-delete"
                  disabled={deleting}
                  onClick={() => setConfirmOpen(true)}
                >
                  {deleting ? "..." : "Eliminar"}
                </button>
              </div>
            </>
          )}
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
  useDocumentTitle("Gestionar fotos · Andariegos");
  const { data: photos, isLoading, isError } = usePhotos();
  const { signOut } = useAuth(); // ← added
  const navigate = useNavigate(); // ← added

  const handleLogout = async () => {
    // ← added
    await signOut();
    navigate("/login");
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Gestionar fotos</h1>
        <div className="admin-header-actions">
          {" "}
          {/* ← added wrapper */}
          <Link to="/newadventure" className="btn-add">
            + Agregar
          </Link>
          <button className="btn-logout" onClick={handleLogout}>
            {" "}
            {/* ← added */}
            Cerrar sesión
          </button>
        </div>
      </div>

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
