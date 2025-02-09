import { ReactNode } from "react"

export interface ButtonProps {
  onClick: () => void;
  text?: string;
  className?: string;
  disabled?: boolean
}

export interface ModalTextProps {
  text: string | ReactNode;
  isOpen: boolean;
  isRounded?: boolean;
}