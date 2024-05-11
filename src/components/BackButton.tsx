import { ButtonProps } from "../types"

const BackButton = ({ onClick, text = "Back", className } : ButtonProps) => {
  return (
    <button onClick={onClick} className={`absolute top-4 right-4`}>{text}</button>
  )
}

export default BackButton