import { useEffect } from "react";

const DEFAULT_TITLE = "Andariegos · Clever Acuña — Andinista desde 1986";

/**
 * Sets document.title on mount and restores the default on unmount.
 * Pass `null`/`undefined` to use the default.
 */
export function useDocumentTitle(title?: string | null) {
  useEffect(() => {
    const previous = document.title;
    document.title = title ?? DEFAULT_TITLE;
    return () => {
      document.title = previous;
    };
  }, [title]);
}
