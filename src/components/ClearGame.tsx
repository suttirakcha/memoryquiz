import { useNavigate } from "react-router-dom"
import Button from "./Button"
import { useState } from "react"

interface ClearGameProps {
  score: number
}

const ClearGame = ({ score } : ClearGameProps) => {

  const navigate = useNavigate()

  const [animate, setAnimate] = useState(false)

  const handleClickLink = (link: string, refresh?: boolean) => {
    setAnimate(true)
    setTimeout(() => {
      refresh ? window.location.reload() : navigate(link, {replace: true})
    }, 1000)
  }

  return (
    <div className="flex flex-col gap-y-10 items-center justify-center h-[75vh]">
      <div className={`flex flex-col gap-y-6 items-center ${animate ? "fade-out" : ""}`}>
        <h2 className="text-4xl font-bold">Result</h2>
        <h1 className="text-6xl font-bold">Score: {score}</h1>
      </div>

      <div className={`flex flex-col gap-y-4 w-full ${animate ? "fade-out-number" : ""}`}>
        <Button className="" onClick={() => handleClickLink("", true)} text="Play again"/>
        <Button className="" onClick={() => handleClickLink("/")} text="Go back"/>
      </div>
    </div>
  )
}

export default ClearGame