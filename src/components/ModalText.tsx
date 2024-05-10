interface ModalTextProps {
  text: string
  isOpen: boolean
}

const ModalText = ({ text, isOpen } : ModalTextProps) => {
  return (
    <div 
      className={`${isOpen ? 'opacity-1 visible' : 'opacity-0 invisible'} transition-opacity absolute h-full w-full top-0 left-0 bg-black/75 z-50 text-white flex items-center justify-center`}
    >
      <div className="rounded-full bg-pink-400 px-10 py-6">
        <h1 className="text-5xl md:text-6xl font-bold">{text}</h1>
      </div>
    </div>
  )
}

export default ModalText