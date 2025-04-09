import { ChevronLeft } from "lucide-react"
import { ButtonProps } from "../types"

const BackButton = ({ onClick, text, className } : ButtonProps) => {
  return (
    <button onClick={onClick} className={`back-btn ${className}`}>
      <ChevronLeft />
      {text}
    </button>
  )
}

export default BackButton