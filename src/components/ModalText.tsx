import { PropsWithChildren } from "react"
import { ModalTextProps } from "../types"

export const MainModalText = ({ children } : PropsWithChildren) => {
  return (<h1 className="heading">{children}</h1>)
}

export const ModalText = ({ text, isOpen, isRounded } : ModalTextProps) => {
  const visibleClassName = isOpen ? 'opacity-1 visible' : 'opacity-0 invisible';
  const roundedClassName = isRounded ? "rounded-full" : "rounded-2xl";
  return (
    <div className={`${visibleClassName} modal`}>
      <div className={`${roundedClassName} bg-pink-400 px-10 py-6 max-w-[90%]`}>
        {typeof text === "string" ? <MainModalText>{text}</MainModalText> : text}
      </div>
    </div>
  )
}