import { ChevronLeft } from "lucide-react"
import { ButtonProps } from "../types"

const BackButton = ({ onClick, text = "Back", className } : ButtonProps) => {
  return (
    <button onClick={onClick} 
      className={`font-semibold flex items-center gap-x-2 absolute top-4 left-4 text-xl md:top-6 md:left-6 md:text-2xl ${className}`}
    >
      <ChevronLeft />
      {text}
    </button>
  )
}

export default BackButton