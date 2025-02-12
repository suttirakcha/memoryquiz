import { ButtonProps } from "../types"

const Button = ({ onClick, text, className, disabled } : ButtonProps) => {
  return (
    <button onClick={onClick} disabled={disabled} className={`bg-pink-600 ${disabled ? "" : "hover:bg-pink-700"} transition-background rounded-full text-white px-6 py-4 text-2xl ${className}`}>{text}</button>
  )
}

export default Button