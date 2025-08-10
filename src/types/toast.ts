export interface ToastProps {
  position?: string;
  text: string;
  id?: number;
  onHide?: () => void;
}

export interface ToastContextType {
  showToast: (props: ToastProps) => void;
  hideToast: () => void;
}
