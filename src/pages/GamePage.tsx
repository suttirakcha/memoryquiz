import { ChangeEvent, KeyboardEvent, ReactNode, useEffect, useState } from "react"
import TimerCircle from "../components/Timer"
import { MainModalText, ModalText } from "../components/ModalText"
import ClearGame from "../components/ClearGame"
import Button from "../components/Button"
import { WORDS } from "../data/words"
import { useNavigate, useParams } from "react-router-dom"
import BackButton from "../components/BackButton"

interface GameOver {
  open: boolean
  text: string | ReactNode
}

const GamePage = () => {

  const { mode } = useParams()
  const navigate = useNavigate()

  const [score, setScore] = useState(0)

  const [numRange, setNumRange] = useState(100)
  const [wordRange, setWordRange] = useState({
    min: 0,
    max: 5
  })

  const wordList = WORDS.filter(word => word.length <= wordRange.max && word.length >= wordRange.min)

  const [num, setNum] = useState(Math.floor(Math.random() * numRange) + 1)
  const [word, setWord] = useState(wordList[Math.floor(Math.random() * wordList.length)])
  const [numValue, setNumValue] = useState<number>(0)
  const [wordValue, setWordValue] = useState<string>("")
  const [enteredValue, setEnteredValue] = useState<number | string>()
  const [hideAnswer, setHideAnswer] = useState(false)
  const [gameOver, setGameOver] = useState<GameOver>({
    open: false,
    text: ""
  })
  const [showResult, setShowResult] = useState(false)
  const [didntSeeAnswer, setDidntSeeAnswer] = useState(false)
  const [timer, setTimer] = useState(10)
  const [quit, setQuit] = useState(false)

  const [changingSection, setChangingSection] = useState(false)

  const handleSetValue = (e: ChangeEvent<HTMLInputElement>) => {
    if (mode === "number"){
      setNumValue(Number(e.target.value))
    } else {
      setWordValue(String(e.target.value))
    }
  }

  const startGame = () => {
    setChangingSection(true)
    setTimeout(() => {
      setChangingSection(false)
      setHideAnswer(true)
    }, 300)
  }

  const nextNumberOrWord = () => {
    setTimeout(() => {
      setChangingSection(true);
    }, 1000)
    setTimeout(() => {
      setScore(score + 1)
      setTimer(10)
      setChangingSection(false);
      setHideAnswer(false)
      setEnteredValue(undefined)

      if (mode === "number"){
        setNumValue(0)
        setNum(Math.floor(Math.random() * numRange) + 1);
      } else {
        setWordValue("")
        setWord(wordList[Math.floor(Math.random() * wordList.length)]);
      }
    }, 1300)
  }

  useEffect(() => {
    if (mode === "number"){
      score >= 5 && setNumRange(1000)
      score >= 10 && setNumRange(10000)
      score >= 20 && setNumRange(100000)
      score >= 50 && setNumRange(1000000)
      score >= 100 && setNumRange(10000000)
      score >= 150 && setNumRange(100000000)
      score >= 200 && setNumRange(1000000000)
    } else {
      score >= 5 && setWordRange({ min:0, max:6 })
      score >= 10 && setWordRange({ min:5, max:8 })
      score >= 20 && setWordRange({ min:6, max:10 })
      score >= 30 && setWordRange({ min:8, max:12 })
      score >= 40 && setWordRange({ min:10, max:15 })
      score >= 50 && setWordRange({ min:12, max:30 })
    }
  }, [score, enteredValue, setEnteredValue])

  const checkIfGameOver = (text: string | ReactNode) => {
    setGameOver({
      open: true,
      text: text
    })
    setTimeout(() => {
      setGameOver({
        open: false,
        text: text
      })
      setChangingSection(true)
    }, 2000)
    setTimeout(() => {
      setChangingSection(false)
      setShowResult(true)
    }, 2300)
  }

  const handleEnter = () => {
    mode === "number" ? setEnteredValue(numValue) : setEnteredValue(wordValue)
    if (numValue == num || wordValue == word){
      nextNumberOrWord()
    } else {
      setTimeout(() => {
        checkIfGameOver(
          <>
            <MainModalText>Game over</MainModalText>
            <p className="text-2xl text-center">
              {mode === "number" ? `The number was ${num}` :  `The word was ${word}`}
            </p>
          </>
        )
      }, 500)
    }
  }

  const clickDidntSeeNum = () => {
    setDidntSeeAnswer(true)
    setTimeout(() => {
      setDidntSeeAnswer(false)
    }, 500)
    setTimer(timer - 3)
  }

  const textClassName = 
    numRange >= 1000000 || word.length >= 7 ? 'text-[90px] md:text-[108px]' 
    : word.length >= 10 ? 'text-[72px] md:text-[108px]' 
    : word.length >= 13 ? 'text-[54px] md:text-[108px]'
    : 'text-[108px]'

  const clickToHomePage = () => {
    setQuit(false)
    setChangingSection(true)
    setTimeout(() => {
      navigate("/")
    }, 800)
  }

  return (
    <div className={`p-6 md:p-10 flex flex-col gap-y-8 items-center ${changingSection ? 'fade-out-number' : 'fade-in-number'}`}>
      {showResult ? (
        <ClearGame score={score}/>
      ) : (
        <>
          {hideAnswer && (
            <div className={`${changingSection ? 'fade-out-number' : 'fade-in-number'}`}>
              <BackButton text="Quit" onClick={() => setQuit(true)}/>
            </div>
          )}

          <h1 className="text-4xl font-bold">Score: {score}</h1>
            {!hideAnswer && (
              <TimerCircle 
                isPlaying={true}
                duration={3} 
                className={`${changingSection ? 'fade-out-number' : 'fade-in-number'} flex justify-center`}
                onComplete={startGame}
              />
            )}
            {hideAnswer && (
              <div className="relative flex">
                <TimerCircle 
                  isPlaying={enteredValue === undefined} 
                  duration={timer} 
                  className={`${changingSection ? 'fade-out-number' : 'fade-in-number'} flex justify-center`}
                  onComplete={() => checkIfGameOver("Time's up")}
                />
                <p className={`absolute font-semibold text-2xl -right-16 top-8 ${didntSeeAnswer ? 'timer-anim' : 'opacity-0 invisible'}`}>Timer -3</p>
              </div>
            )}

            {hideAnswer && !didntSeeAnswer ? (
              <section className={`flex flex-col gap-y-6 items-center justify-center`}>
                <h2 className={`text-2xl font-semibold md:text-3xl text-center ${hideAnswer ? 'fade-in' : ''}`}>
                  {mode === "number" ? "What number did you see?" : "What word did you see?"}
                </h2>
                <input 
                  onChange={handleSetValue} 
                  onKeyDown={(e) => {(e.key === "Enter" && (numValue || wordValue)) && handleEnter()}}
                  value={mode === "number" ? numValue || "" : wordValue || ""} 
                  className={`w-full max-w-lg h-[60px] border outline-none text-black ${hideAnswer ? 'fade-in-input opacity-0' : ''} text-center ${enteredValue == num || enteredValue == word ? "bg-green-600 border-green-700 text-white" : enteredValue === undefined ? "bg-pink-200 border-pink-400" : "bg-red-600 border-red-700 text-white"} border-2 px-3 text-4xl rounded-full`}
                  disabled={enteredValue !== undefined || gameOver.open}
                />
                <div className={`${hideAnswer ? 'fade-in-input opacity-0' : ''} flex flex-col gap-y-4`}>
                  <Button onClick={() => {(numValue || wordValue) && handleEnter()}} text="Enter"/>
                  <button className="text-pink-600 text-xl" onClick={clickDidntSeeNum}>
                    {mode === "number" ? "Didn't see the number?" : "Didn't see the word?"}
                  </button>
                </div>
              </section>
            ) : (
              <h1 className={`${textClassName} font-bold select-none text-center ${changingSection ? 'fade-out-number' : 'fade-in-number'}`}>
                {mode === "number" ? num : word}
              </h1>
            )}
        </>
      )}

      <ModalText text={gameOver.text} isOpen={gameOver.open}/>
      <ModalText text={
        <div className="flex flex-col gap-y-6">
          <MainModalText>Quitting game in...</MainModalText>
          <TimerCircle 
            isPlaying={quit}
            duration={3} 
            className={`${changingSection ? 'fade-out-number' : 'fade-in-number'} flex justify-center`}
            onComplete={clickToHomePage}
          />
          <p className="cursor-pointer text-2xl text-center" onClick={() => setQuit(false)}>Click me to cancel</p>
        </div>
      } isOpen={quit}/>
    </div>
  )
}

export default GamePage