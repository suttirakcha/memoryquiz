import { useNavigate } from "react-router-dom"
import Button from "./Button"
import { useState } from "react"
import useLanguage from "../hooks/useLanguage"

interface ClearGameProps {
  score: number
  lang: string | undefined
}

const ClearGame = ({ score, lang } : ClearGameProps) => {

  const { mainLang } = useLanguage(lang)
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
        <h2 className="text-4xl font-bold">{mainLang.result}</h2>
        <h1 className="text-6xl font-bold">{mainLang.score}: {score}</h1>
      </div>

      <div className={`flex flex-col gap-y-4 w-full items-center ${animate ? "fade-out-number" : ""}`}>
        <Button className="max-w-[200px] w-full" onClick={() => handleClickLink("", true)} text={mainLang.play_again}/>
        <Button className="max-w-[200px] w-full" onClick={() => handleClickLink(lang === "th" ? "/th" : "/")} text={mainLang.go_back}/>
      </div>
    </div>
  )
}

export default ClearGame