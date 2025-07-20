export interface TabProps {
  children: string;
  isActive?: boolean;
  onClick?: () => void;
  refFn: (node: HTMLButtonElement) => void;
  ariaControls: string;
}
