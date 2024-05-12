import { ReactNode } from "react"
import { ModalTextProps } from "../types"

export const MainModalText = ({ children } : { children: ReactNode }) => {
  return (<h1 className="text-5xl md:text-6xl font-bold">{children}</h1>)
}

export const ModalText = ({ text, isOpen } : ModalTextProps) => {
  return (
    <div 
      className={`${isOpen ? 'opacity-1 visible' : 'opacity-0 invisible'} transition-opacity absolute h-full w-full top-0 left-0 bg-pink-950/80 z-50 text-white flex items-center justify-center`}
    >
      <div className="rounded-full bg-pink-400 px-10 py-6">
        {typeof text === "string" ? <MainModalText>{text}</MainModalText> : text}
      </div>
    </div>
  )
}