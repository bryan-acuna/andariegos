import { useState, useCallback } from "react";
import type { ReactNode } from "react";
import * as RadixToast from "@radix-ui/react-toast";
import { ToastContext } from "./useToast";
import type { ToastType } from "./useToast";
import "./Toast.css";

type ToastItem = {
  id: number;
  type: ToastType;
  title: string;
  description?: string;
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const toast = useCallback(
    (type: ToastType, title: string, description?: string) => {
      const id = Date.now();
      setToasts((prev) => [...prev, { id, type, title, description }]);
    },
    [],
  );

  const remove = (id: number) =>
    setToasts((prev) => prev.filter((t) => t.id !== id));

  return (
    <ToastContext.Provider value={{ toast }}>
      <RadixToast.Provider swipeDirection="right" duration={4000}>
        {children}

        {toasts.map((t) => (
          <RadixToast.Root
            key={t.id}
            className="toast-root"
            data-type={t.type}
            onOpenChange={(open) => {
              if (!open) remove(t.id);
            }}
          >
            <div className="toast-body">
              <RadixToast.Title className="toast-title">
                {t.title}
              </RadixToast.Title>
              {t.description && (
                <RadixToast.Description className="toast-description">
                  {t.description}
                </RadixToast.Description>
              )}
            </div>
            <RadixToast.Close className="toast-close">✕</RadixToast.Close>
          </RadixToast.Root>
        ))}

        <RadixToast.Viewport className="toast-viewport" />
      </RadixToast.Provider>
    </ToastContext.Provider>
  );
}
