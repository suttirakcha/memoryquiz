import { ButtonProps } from "../types"

const Button = ({ 
  onClick, 
  text, 
  className, 
  disabled 
} : ButtonProps) => {
  return (
    <button 
      onClick={onClick} 
      disabled={disabled} 
      className={`${disabled ? "" : "hover:bg-pink-700 dark:hover:bg-pink-200"} main-btn ${className}`}
    >
      {text}
    </button>
  )
}

export default Button