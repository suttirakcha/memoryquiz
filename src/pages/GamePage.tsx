import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react"
import TimerCircle from "../components/Timer"
import ModalText from "../components/ModalText"
import ClearGame from "../components/ClearGame"
import Button from "../components/Button"

interface GameOver {
  open: boolean
  text: string
}

const GamePage = () => {

  const [score, setScore] = useState(0)

  const [numRange, setNumRange] = useState(20)

  const [num, setNum] = useState(Math.floor(Math.random() * numRange) + 1)
  const [numValue, setNumValue] = useState<number>(0)
  const [enteredNum, setEnteredNum] = useState<number>()
  const [hideNumber, setHideNumber] = useState(false)
  const [gameOver, setGameOver] = useState<GameOver>({
    open: false,
    text: ""
  })
  const [showResult, setShowResult] = useState(false)
  const [didntSeeNumber, setDidntSeeNumber] = useState(false)
  const [timer, setTimer] = useState(10)

  const [changingSection, setChangingSection] = useState(false)

  const handleSetValue = (e: ChangeEvent<HTMLInputElement>) => {
    setNumValue(Number(e.target.value))
  }

  const startGame = () => {
    setChangingSection(true)
    setTimeout(() => {
      setChangingSection(false)
      setHideNumber(true)
    }, 300)
  }

  const nextNumber = () => {
    setTimeout(() => {
      setChangingSection(true);
    }, 1000)
    setTimeout(() => {
      setScore(score + 1)
      setTimer(10)
      setNum(Math.floor(Math.random() * numRange) + 1);
      setChangingSection(false);
      setHideNumber(false)
      setNumValue(0)
      setEnteredNum(undefined)
    }, 1300)
  }

  useEffect(() => {
    score > 5 && setNumRange(100)
    score > 10 && setNumRange(1000)
    score > 20 && setNumRange(10000)
    score > 50 && setNumRange(100000)
    score > 100 && setNumRange(1000000)
    score > 150 && setNumRange(10000000)
    score > 200 && setNumRange(100000000)
  }, [score, enteredNum, setEnteredNum])

  const checkIfTimesUp = () => {
    setGameOver({
      open: true,
      text: "Time's up"
    })
    setTimeout(() => {
      setGameOver({
        open: false,
        text: "Time's up"
      })
      setChangingSection(true)
    }, 2000)
    setTimeout(() => {
      setChangingSection(false)
      setShowResult(true)
    }, 2300)
  }

  const checkIfGameIsOver = () => {
    setGameOver({
      open: true,
      text: "Game Over!"
    })
    setTimeout(() => {
      setGameOver({
        open: false,
        text: "Game Over!"
      })
      setChangingSection(true)
    }, 2000)
    setTimeout(() => {
      setChangingSection(false)
      setShowResult(true)
    }, 2300)
  }

  const handleEnter = () => {
    setEnteredNum(numValue)
    if (numValue == num){
      nextNumber()
    } else {
      setTimeout(() => {
        checkIfGameIsOver()
      }, 500)
    }
  }

  const clickDidntSeeNum = () => {
    setDidntSeeNumber(true)
    setTimeout(() => {
      setDidntSeeNumber(false)
    }, 500)
    setTimer(timer - 3)
  }

  return (
    <div className={`p-6 md:p-10 flex flex-col gap-y-8 items-center ${changingSection ? 'fade-out-number' : 'fade-in-number'}`}>
      {showResult ? (
        <ClearGame score={score}/>
      ) : (
        <>
          <h1 className="text-4xl font-bold">Score: {score}</h1>
            {!hideNumber && (
              <TimerCircle 
                isPlaying={true}
                duration={3} 
                className={`${changingSection ? 'fade-out-number' : 'fade-in-number'} flex justify-center`}
                onComplete={startGame}
              />
            )}
            {hideNumber && (
              <div className="relative flex">
                <TimerCircle 
                  isPlaying={enteredNum === undefined} 
                  duration={timer} 
                  className={`${changingSection ? 'fade-out-number' : 'fade-in-number'} flex justify-center`}
                  onComplete={checkIfTimesUp}
                />
                <p className={`absolute font-semibold text-2xl -right-12 top-8 ${didntSeeNumber ? 'timer-anim' : 'opacity-0 invisible'}`}>Timer - 3</p>
              </div>
            )}

            {hideNumber && !didntSeeNumber ? (
              <section className={`flex flex-col gap-y-6 items-center justify-center`}>
                <h2 className={`text-2xl font-semibold md:text-3xl text-center ${hideNumber ? 'fade-in' : ''}`}>What number did you see?</h2>
                <input 
                  onChange={handleSetValue} 
                  onKeyDown={(e) => {(e.key === "Enter" && numValue) && handleEnter()}}
                  value={numValue || ""} 
                  className={`w-full max-w-lg border outline-none text-black ${hideNumber ? 'fade-in-input opacity-0' : ''} text-center ${enteredNum == num ? "bg-green-600 border-green-700 text-white" : enteredNum === undefined ? "bg-pink-200 border-pink-400" : "bg-red-600 border-red-700 text-white"} border-2 p-3 text-4xl rounded-full`}
                  disabled={enteredNum !== undefined}
                />
                <div className={`${hideNumber ? 'fade-in-input opacity-0' : ''} flex flex-col gap-y-4`}>
                  <Button onClick={() => {numValue && handleEnter()}} text="Enter"/>
                  <button className="text-pink-600" onClick={clickDidntSeeNum}>Didn't see the number?</button>
                </div>
              </section>
            ) : (
              <h1 className={`text-[120px] font-bold text-center ${changingSection ? 'fade-out-number' : 'fade-in-number'}`}>{num}</h1>
            )}
        </>
      )}

      <ModalText text={gameOver.text} isOpen={gameOver.open}/>
    </div>
  )
}

export default GamePage