import { ButtonProps } from "../types"

const Button = ({ onClick, text, className, disabled } : ButtonProps) => {
  return (
    <button 
      onClick={onClick} 
      disabled={disabled} 
      className={`bg-pink-600 ${disabled ? "" : "hover:bg-pink-700"} main-btn ${className}`}
    >
      {text}
    </button>
  )
}

export default Button