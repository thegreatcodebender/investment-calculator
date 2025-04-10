import { ReactNode } from "react";

export interface AccordionProps {
  title: string;
  content: ReactNode | string;
  isOpen?: boolean;
}
