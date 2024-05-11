import { ButtonProps } from "../types"

const Button = ({ onClick, text, className } : ButtonProps) => {
  return (
    <button onClick={onClick} className={`bg-pink-600 hover:bg-pink-700 rounded-full text-white px-6 py-4 text-xl ${className}`}>{text}</button>
  )
}

export default Button