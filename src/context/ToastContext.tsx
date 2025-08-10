import { useState, createContext, PropsWithChildren } from "react";
import { ToastContextType, ToastProps } from "../types/toast";
import Toast from "../components/Toast";

// Toast Context
export const ToastContext = createContext<ToastContextType | null>(null);

// Toast Provider Component
export const ToastProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [toast, setToast] = useState<ToastProps | null>(null);

  const showToast = ({ text, position }: ToastProps) => {
    setToast({ text, position, id: Date.now() });
  };

  const hideToast = () => {
    setToast(null);
  };

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      {toast && <Toast {...toast} onHide={hideToast} />}
    </ToastContext.Provider>
  );
};
