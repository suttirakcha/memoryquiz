import { useState } from "react"
import Button from "../components/Button"
import { useNavigate } from "react-router-dom"
import { CountdownCircleTimer } from "react-countdown-circle-timer"
import NumFloat from "../components/NumFloat"
import { Smile } from "lucide-react"
import BackButton from "../components/BackButton"

const MainPage = () => {

  const navigate = useNavigate()

  const [currentIndex, setCurrentIndex] = useState(0)
  const [animate, setAnimate] = useState(false)
  const [numFloat, setNumFloat] = useState((Math.floor(Math.random() * 20) + 1))
  const [selectedMode, setSelectedMode] = useState("")

  const mainText = [
    "Hmm, I'm thinking about the number or the word in my mind...",
    "Wanna memorise the word, the number, or me? :)",
    "Be happy and enjoy playing my game",
    "Are you serious about anything? Playing my game can help you relax.",
    "You know what, I'm thinking of you when you are playing my game.",
  ]
  const [randomMainText, setRandomMainText] = useState(mainText[Math.floor(Math.random() * mainText.length)])

  const showNumFloat = () => {
    const comp = []
    for (let i = 0; i < numFloat; i++){
      comp.push(<NumFloat />)
    }

    return comp
  }

  const changeIndex = (index: number) => {
    setAnimate(true)
    setTimeout(() => {
      setAnimate(false)
      setCurrentIndex(index)
      setRandomMainText(mainText[Math.floor(Math.random() * mainText.length)])
    }, 300)
  }

  const changeLink = (mode: string) => {
    setAnimate(true)
    setTimeout(() => {
      navigate(`/game/${mode}`)
    }, 500)
  }

  const selectMode = (mode: string) => {
    changeIndex(3)
    setSelectedMode(mode)
  }

  return (
    <div className="flex flex-col gap-y-10 items-center justify-center p-6 pt-20 md:p-10 md:h-[75vh]">
      {currentIndex === 3 ? (
        <div className={animate ? "fade-out-number" : "fade-in-number"}>
          <CountdownCircleTimer
            isPlaying={true}
            duration={2}
            onComplete={() => changeLink(selectedMode)}
            colors="#db2777"
            size={240}
          >
            {() => <h2 className="w-[140px] text-2xl font-semibold text-center">Preparing the {selectedMode} for you...</h2>}
          </CountdownCircleTimer>
        </div>
      ) : currentIndex === 2 ? (
        <>
          <BackButton onClick={() => changeIndex(0)} className={animate ? "fade-out-number" : "fade-in-number"}/>
          <h1 className={`text-5xl md:text-6xl font-bold z-50 ${animate ? "fade-out" : "fade-in-two"}`}>Select mode</h1>

          <div className={`flex flex-col gap-y-4 items-center w-full z-50 ${animate ? "fade-out-number" : "fade-in-number"}`}>
            <Button className="max-w-[300px] w-full" onClick={() => {selectMode("number")}} text="Number"/>
            <Button className="max-w-[300px] w-full" onClick={() => {selectMode("word")}} text="Word"/>
          </div>
        </>
      ) : currentIndex === 1 ? (
        <div className="flex flex-col gap-y-10 max-w-2xl items-center">
          <BackButton onClick={() => changeIndex(0)} className={animate ? "fade-out-number" : "fade-in-number"}/>
          <h1 className={`text-5xl md:text-6xl font-bold z-50 ${animate ? "fade-out" : "fade-in-two"}`}>How to play</h1>
          <p className={`text-xl md:text-2xl ${animate ? "fade-out-number" : "fade-in-number"}`}>
            You need to memorise the number or the word that I showed for you for just 3 seconds, then you have 10 seconds to answer what number or word you saw. If you did not see the number or the word, you can click 'Didn't see the number', (for the word version, 'Didn't see the word') to show the number or the word again, but you will lose 3 seconds.
            If you answer incorrectly or the time is up, the game is over!

            <span className="flex items-center gap-x-2 justify-center mt-4">Hope you can enjoy the game (and your memorisation). <Smile className="inline"/></span>
          </p>
        </div>
      ) : (
        <>
          <h1 className={`text-5xl md:text-6xl font-bold z-50 ${animate ? "fade-out" : "fade-in-two"}`}>Memoryquiz</h1>
          <p className={`text-xl md:text-2xl z-50 ${animate ? "fade-out" : "fade-in-two"}`}>{randomMainText}</p>

          <div className={`flex flex-col gap-y-4 items-center w-full z-50 ${animate ? "fade-out-number" : "fade-in-number"}`}>
            <Button className="max-w-[300px] w-full" onClick={() => {changeIndex(2)}} text="Let's play"/>
            <Button className="max-w-[300px] w-full" onClick={() => {changeIndex(1)}} text="How to play"/>
          </div>
        </>
      )}


      <div className="fade-in">
        {showNumFloat()}
      </div>
    </div>
  )
}

export default MainPage