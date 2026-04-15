import "./Montanas.css";
import { useState, useEffect, useRef, useCallback } from "react";
import { usePhotos } from "../../hooks/usePhotos";
import * as Dialog from "@radix-ui/react-dialog";
import { Loader } from "../../components";

type Photo = {
  id: number;
  image_url: string;
  Name?: string;
  country?: string;
  description?: string;
};

const MOBILE_BREAKPOINT = 768;
const MOBILE_PAGE_SIZE = 5;
const DESKTOP_PAGE_SIZE = 10;

function getPageSize() {
  return window.innerWidth <= MOBILE_BREAKPOINT ? MOBILE_PAGE_SIZE : DESKTOP_PAGE_SIZE;
}

function Montanas() {
  const { data: photos, isLoading, isError } = usePhotos();
  const [selected, setSelected] = useState<Photo | null>(null);
  const [visible, setVisible] = useState(() => getPageSize());
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Reset visible count if the window resizes across the breakpoint
  useEffect(() => {
    const onResize = () => setVisible(getPageSize());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const loadMore = useCallback(() => {
    if (!photos) return;
    setVisible((prev) => Math.min(prev + getPageSize(), photos.length));
  }, [photos]);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) loadMore(); },
      { rootMargin: "100px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [loadMore]);

  if (isLoading) return <Loader />;
  if (isError) return <p className="grid-status">Error al cargar fotos.</p>;

  const shown = photos?.slice(0, visible) ?? [];
  const hasMore = photos ? visible < photos.length : false;

  return (
    <>
      <div className="montanas-grid">
        {shown.map((photo) => (
          <img
            key={photo.id}
            src={photo.image_url}
            alt={photo.description}
            className="grid-photo"
            onClick={() => setSelected(photo)}
          />
        ))}
      </div>

      {hasMore && <div ref={sentinelRef} className="grid-sentinel" />}

      <Dialog.Root open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="dialog-overlay" />
          <Dialog.Content className="dialog-content">
            <Dialog.Title className="dialog-title">
              {selected?.Name || selected?.description || "Foto"}
            </Dialog.Title>
            <img
              src={selected?.image_url}
              alt={selected?.Name}
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
