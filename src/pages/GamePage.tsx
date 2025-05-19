import { ChangeEvent, ReactNode, useEffect, useState } from "react"
import TimerCircle from "../components/Timer"
import { MainModalText, ModalText } from "../components/ModalText"
import ClearGame from "../components/ClearGame"
import Button from "../components/Button"
import { THAI_WORDS, WORDS } from "../data/words"
import { useNavigate, useParams } from "react-router-dom"
import BackButton from "../components/BackButton"
import useLanguage from "../hooks/useLanguage"

interface GameOver {
  open: boolean
  text: string | ReactNode
}

interface Limit {
  min: number;
  max: number;
}

const GamePage = () => {
  const navigate = useNavigate();
  const { lang, mode } = useParams();
  const { mainLang } = useLanguage(lang);

  const [score, setScore] = useState(0);
  const [numRange, setNumRange] = useState(100);
  const [wordRange, setWordRange] = useState<Limit>({ min: 0, max: 5 });

  const wordList = (lang === "th" ? THAI_WORDS : WORDS).filter(word => word.length <= wordRange.max && word.length >= wordRange.min);

  const [num, setNum] = useState(Math.floor(Math.random() * numRange) + 1);
  const [word, setWord] = useState(wordList[Math.floor(Math.random() * wordList.length)]);
  const [numValue, setNumValue] = useState<number>(0);
  const [wordValue, setWordValue] = useState<string>("");
  const [enteredValue, setEnteredValue] = useState<number | string>();
  const [hideAnswer, setHideAnswer] = useState(false);
  const [gameOver, setGameOver] = useState<GameOver>({
    open: false,
    text: ""
  });
  const [showResult, setShowResult] = useState(false);
  const [didntSeeAnswer, setDidntSeeAnswer] = useState(false);
  const [timer, setTimer] = useState(10);
  const [quit, setQuit] = useState(false);
  const [changingSection, setChangingSection] = useState(false);

  const handleSetValue = (e: ChangeEvent<HTMLInputElement>) => {
    mode === "number" ?
      setNumValue(Number(e.target.value)) :
      setWordValue(String(e.target.value))
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
      const scoreRanges: number[] = [5, 10, 20, 50, 80, 100, 120, 150, 180, 200, 250];
      for (let range of scoreRanges){
        const index: number = scoreRanges.findIndex(score => score === range);
        score >= range && setNumRange(Number(`1e+${index + 2}`));
      }
    } else {
      const wordRanges = [
        { score: 5, word_range: { min: 0, max: 5 } },
        { score: 10, word_range: { min: 4, max: 6 } },
        { score: 15, word_range: { min: 6, max: 8 } },
        { score: 20, word_range: { min: 8, max: 10 } },
        { score: 25, word_range: { min: 10, max: 12 } },
        { score: 30, word_range: { min: 12, max: 15 } },
        { score: 40, word_range: { min: 15, max: Infinity } },
      ]
      for (let { score: range, word_range } of wordRanges){
        score >= range && setWordRange(word_range)
      }
    }
  }, [score, enteredValue, setEnteredValue])

  const checkIfGameOver = (text: string | ReactNode) => {
    setGameOver({ open: true, text });
    setTimeout(() => {
      setGameOver({ open: false, text });
      setChangingSection(true);
    }, 2000)
    setTimeout(() => {
      setChangingSection(false);
      setShowResult(true);
    }, 2300)
  }

  const handleEnter = () => {
    setEnteredValue(mode === "number" ? numValue : wordValue);
    if (numValue == num || wordValue == word){
      nextNumberOrWord()
    } else {
      setTimeout(() => {
        checkIfGameOver(
          <>
            <MainModalText>{mainLang.game_over}</MainModalText>
            <p className="text-2xl text-center">
              {mode === "number" ? `${mainLang.the_number_was} ${num}` :  `${mainLang.the_word_was} ${word}`}
            </p>
          </>
        )
      }, 500)
    }
  }

  const clickDidntSeeNum = () => {
    setDidntSeeAnswer(true)
    setTimer(prev => prev - 3)
    setTimeout(() => {
      setDidntSeeAnswer(false)
    }, 500)
  }

  const textClassName = 'text-[calc(50px_+_5vw)] md:text-[108px] leading-[20vw]';
  const checkIfCorrect = enteredValue == num || enteredValue == word;

  const clickToHomePage = () => {
    setQuit(false)
    setChangingSection(true)
    setTimeout(() => {
      navigate(lang === "th" ? "/th" : "/");
    }, 800)
  }

  return (
    <div className={`p-6 md:p-10 flex flex-col gap-y-8 items-center ${changingSection ? 'fade-out-number' : 'fade-in-number'}`}>
      {showResult ? (
        <ClearGame score={score} lang={lang}/>
      ) : (
        <>
          {hideAnswer && (
            <div className={`${changingSection ? 'fade-out-number' : 'fade-in-number'}`}>
              <BackButton text={mainLang.quit} onClick={() => setQuit(true)}/>
            </div>
          )}

          <h1 className="text-4xl font-bold">{mainLang.score}: {score}</h1>
            {!hideAnswer ? (
              <TimerCircle 
                isPlaying={true}
                duration={3} 
                className={`${changingSection ? 'fade-out-number' : 'fade-in-number'} flex justify-center`}
                onComplete={startGame}
              />
            ) : (
              <div className="relative flex">
                <TimerCircle 
                  isPlaying={enteredValue === undefined} 
                  duration={timer} 
                  className={`${changingSection ? 'fade-out-number' : 'fade-in-number'} flex justify-center`}
                  onComplete={() => checkIfGameOver(mainLang.times_up)}
                />
                <p className={`absolute font-semibold text-2xl -right-16 top-8 ${didntSeeAnswer ? 'timer-anim' : 'opacity-0 invisible'}`}>{mainLang.timer} -3</p>
              </div>
            )}

            {hideAnswer && !didntSeeAnswer ? (
              <section className={`flex flex-col gap-y-6 items-center justify-center`}>
                <h2 className={`text-2xl font-semibold md:text-3xl text-center ${hideAnswer ? 'fade-in' : ''}`}>
                  {mode === "number" ? mainLang.what_number_did_you_see : mainLang.what_word_did_you_see}
                </h2>
                <input 
                  onChange={handleSetValue} 
                  onKeyDown={(e) => {(e.key === "Enter" && (numValue || wordValue)) && handleEnter()}}
                  value={mode === "number" ? numValue || "" : wordValue || ""} 
                  className={`w-full max-w-lg h-[60px] border outline-none text-black ${hideAnswer ? 'fade-in-input opacity-0' : ''} text-center ${checkIfCorrect ? "bg-green-600 border-green-700 text-white" : enteredValue === undefined ? "bg-pink-200 border-pink-400" : "bg-red-600 border-red-700 text-white"} border-2 px-3 text-4xl rounded-full`}
                  disabled={enteredValue !== undefined || gameOver.open}
                />
                <div className={`${hideAnswer ? 'fade-in-input opacity-0' : ''} flex flex-col gap-y-4 items-center`}>
                  <Button disabled={checkIfCorrect} className="w-[160px]" onClick={() => {(numValue || wordValue) && handleEnter()}} text={mainLang.enter}/>
                  <button className="text-pink-600 text-xl" onClick={clickDidntSeeNum}>
                    {mode === "number" ? mainLang.didnt_see_num : mainLang.didnt_see_word}
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

      <ModalText text={gameOver.text} isOpen={gameOver.open} isRounded={true}/>
      <ModalText text={
        <div className="flex flex-col gap-y-6">
          <MainModalText>{mainLang.quitting_game}</MainModalText>
          <TimerCircle 
            isPlaying={quit}
            duration={3} 
            className={`${changingSection ? 'fade-out-number' : 'fade-in-number'} flex justify-center`}
            onComplete={clickToHomePage}
          />
          <p className="cursor-pointer text-2xl text-center" onClick={() => setQuit(false)}>{mainLang.click_to_cancel}</p>
        </div>
      } isOpen={quit}/>
    </div>
  )
}

export default GamePage