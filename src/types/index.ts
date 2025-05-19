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

export interface ClearGameProps {
  score: number
  lang: string | undefined
}

export interface TimerCircleProps {
  duration: number
  className?: string
  isPlaying?: boolean
  onUpdate?: (val: number) => void
  initialRemainingTime?: number
  updateInterval?: number
  onComplete?: () => void
}