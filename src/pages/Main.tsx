import { useState } from "react"
import Button from "../components/Button"
import TimerCircle from "../components/Timer"
import { useNavigate } from "react-router-dom"
import { CountdownCircleTimer } from "react-countdown-circle-timer"
import NumFloat from "../components/NumFloat"
import { Smile } from "lucide-react"

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
    <div className="flex flex-col gap-y-10 items-center justify-center h-[75vh] p-6 md:p-10">
      {currentIndex === 2 ? (
        <div className={animate ? "fade-out-number" : "fade-in-number"}>
          <CountdownCircleTimer
            isPlaying={true}
            duration={2}
            onComplete={changeLink}
            colors="#db2777"
          >
            {() => <h2 className="w-[100px] text-lg font-semibold text-center">Preparing the number for you...</h2>}
          </CountdownCircleTimer>
        </div>
      ) : currentIndex === 1 ? (
        <div className="flex flex-col gap-y-10 max-w-2xl items-center">
          <h1 className={`text-5xl md:text-6xl font-bold z-50 ${animate ? "fade-out" : "fade-in-two"}`}>How to play</h1>
          <p className="text-lg">
            You need to memorise the number that I showed for you for just 3 seconds, then you have 10 seconds to answer what number you saw. If you did not see the number, you can click 'Didn't see the number' to show the number again, but you will lose 3 seconds.
            If you answer incorrectly or the time is up, the game is over!

            <span className="inline-flex items-center gap-x-2 text-center mt-4">Hope you can enjoy the game (and your memorisation) <Smile /></span>
          </p>
        </div>
      ) : (
        <>
          <h1 className={`text-5xl md:text-6xl font-bold z-50 ${animate ? "fade-out" : "fade-in-two"}`}>Memoryquiz</h1>

          <div className={`flex flex-col gap-y-4 items-center w-full z-50 ${animate ? "fade-out-number" : "fade-in-number"}`}>
            <Button className="max-w-[300px] w-full" onClick={() => {changeIndex(2)}} text="Play game"/>
            <Button className="max-w-[300px] w-full" onClick={() => {changeIndex(1)}} text="How to play"/>
          </div>
        </>
      )}


      <NumFloat />
      <NumFloat />
      <NumFloat />
    </div>
  )
}

export default MainPage