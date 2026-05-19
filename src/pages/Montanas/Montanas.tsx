import "./Montanas.css";
import { useState, useEffect, useRef, useMemo } from "react";
import { useInfinitePhotos } from "../../hooks/usePhotos";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import * as Dialog from "@radix-ui/react-dialog";
import { Loader } from "../../components";
import type { Photo } from "../../types/photo.types";

function Montanas() {
  useDocumentTitle("Montañas · Andariegos");
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfinitePhotos(10);
  const [selected, setSelected] = useState<Photo | null>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const photos = useMemo(
    () => data?.pages.flat() ?? [],
    [data]
  );

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading) return <Loader />;
  if (isError) return <p className="grid-status">Error al cargar fotos.</p>;

  return (
    <>
      <div className="montanas-grid">
        {photos.map((photo) => (
          <img
            key={photo.id}
            src={photo.image_url}
            alt={photo.description ?? ""}
            className="grid-photo"
            loading="lazy"
            decoding="async"
            onClick={() => setSelected(photo)}
          />
        ))}
      </div>

      {hasNextPage && (
        <div ref={sentinelRef} className="grid-sentinel">
          {isFetchingNextPage && <div className="grid-load-more" aria-label="Cargando más" />}
        </div>
      )}

      <Dialog.Root open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="dialog-overlay" />
          <Dialog.Content className="dialog-content">
            <Dialog.Title className="dialog-title">
              {selected?.Name || selected?.description || "Foto"}
            </Dialog.Title>
            <img
              src={selected?.image_url}
              alt={selected?.Name ?? ""}
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
