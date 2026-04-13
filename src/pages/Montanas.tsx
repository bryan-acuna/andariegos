import "./Montanas.css";
import { useState } from "react";
import { usePhotos } from "../hooks/usePhotos";
import * as Dialog from "@radix-ui/react-dialog";
import Loader from "../components/Loader";

type Photo = {
  id: string | number;
  image_url: string;
  name?: string;
  country?: string;
  description?: string;
};

function Montanas() {
  const { data: photos, isLoading, isError } = usePhotos();
  const [selected, setSelected] = useState<Photo | null>(null);

  if (isLoading) return <Loader />;
  if (isError) return <p className="grid-status">Error al cargar fotos.</p>;

  return (
    <>
      <div className="montanas-grid">
        {photos?.map((photo) => (
          <img
            key={photo.id}
            src={photo.image_url}
            alt={photo.description}
            className="grid-photo"
            onClick={() => setSelected(photo)}
          />
        ))}
      </div>

      <Dialog.Root open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="dialog-overlay" />
          <Dialog.Content className="dialog-content">
            <Dialog.Title className="dialog-title">
              {selected?.name || selected?.description || "Foto"}
            </Dialog.Title>
            <img
              src={selected?.image_url}
              alt={selected?.name}
              className="dialog-image"
            />
            <div className="dialog-meta">
              {selected?.country && (
                <span className="dialog-meta-item">
                  <span className="dialog-meta-label">País</span>
                  {selected.country}
                </span>
              )}
              {selected?.description && (
                <span className="dialog-meta-item">
                  <span className="dialog-meta-label">Descripción</span>
                  {selected.description}
                </span>
              )}
            </div>
            <Dialog.Close className="dialog-close">✕</Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}

export default Montanas;
