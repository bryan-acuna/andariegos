import { createContext, useContext } from "react";

export type ToastType = "success" | "error" | "info";

export type ToastContextValue = {
  toast: (type: ToastType, title: string, description?: string) => void;
};

export const ToastContext = createContext<ToastContextValue>({
  toast: () => {},
});

export function useToast() {
  return useContext(ToastContext);
}
