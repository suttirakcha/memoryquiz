import { useState } from "react"
import Button from "../components/Button"
import TimerCircle from "../components/Timer"
import { useNavigate } from "react-router-dom"
import { CountdownCircleTimer } from "react-countdown-circle-timer"

const MainPage = () => {

  const navigate = useNavigate()

  const [currentIndex, setCurrentIndex] = useState(0)
  const [animate, setAnimate] = useState(false)

  const changeIndex = (index: number) => {
    setAnimate(true)
    setTimeout(() => {
      setAnimate(false)
      setCurrentIndex(index)
    }, 300)
  }

  const changeLink = () => {
    setAnimate(true)
    setTimeout(() => {
      navigate("/game")
    }, 500)
  }

  return (
    <div className="flex flex-col gap-y-10 items-center justify-center h-[75vh]">
      {currentIndex === 2 ? (
        <div className={animate ? "fade-out-number" : "fade-in-number"}>
          <CountdownCircleTimer
            isPlaying={true}
            duration={3}
            onComplete={changeLink}
            colors="#db2777"
          >
            {() => <h2 className="w-[100px] text-lg font-semibold text-center">Preparing the number for you...</h2>}
          </CountdownCircleTimer>
        </div>
      ) : (
        <>
          <h1 className={`text-5xl md:text-6xl font-bold ${animate ? "fade-out" : "fade-in-two"}`}>Memoryquiz</h1>

          <div className={`flex flex-col gap-y-4 items-center w-full ${animate ? "fade-out-number" : "fade-in-number"}`}>
            <Button className="max-w-[300px] w-full" onClick={() => {changeIndex(2)}} text="Play game"/>
            <Button className="max-w-[300px] w-full" onClick={() => {}} text="How to play"/>
          </div>
        </>
      )}
    </div>
  )
}

export default MainPage