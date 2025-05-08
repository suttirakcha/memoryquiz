import { useState } from "react"
import Button from "../components/Button"
import { useNavigate, useParams } from "react-router-dom"
import { CountdownCircleTimer } from "react-countdown-circle-timer"
import NumFloat from "../components/NumFloat"
import BackButton from "../components/BackButton"
import useLanguage from "../hooks/useLanguage"

const MainPage = () => {
  const navigate = useNavigate();
  const { lang } = useParams();
  const { mainLang } = useLanguage(lang);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [numFloat] = useState((Math.floor(Math.random() * 5) + 1));
  const [selectedMode, setSelectedMode] = useState("");

  const mainText = mainLang.quote;
  const [randomMainText, setRandomMainText] = useState(mainText[Math.floor(Math.random() * mainText.length)]);

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
      lang === "th" ? navigate(`/th/game/${mode}`) : navigate(`/game/${mode}`)
    }, 500)
  }

  const selectMode = (mode: string) => {
    changeIndex(3)
    setSelectedMode(mode)
  }

  const changeLang = (link: string) => {
    setAnimate(true)
    setTimeout(() => {
      window.location.replace(link)
    }, 500)
  }

  const buttonClassName = "max-w-[300px] w-full";
  const fade = animate ? "fade-out" : "fade-in-two";
  const fadeNumber = animate ? "fade-out-number" : "fade-in-number";

  return (
    <div className="flex flex-col gap-y-10 items-center justify-center p-6 pt-20 md:p-10 md:h-[75vh]">
      {currentIndex === 1 && (
        <div className="flex flex-col gap-y-10 max-w-2xl items-center">
          <BackButton text={mainLang.back} onClick={() => changeIndex(0)} className={fadeNumber}/>
          <h1 className={`text-5xl md:text-6xl font-bold z-50 ${fade}`}>{mainLang.how_to_play}</h1>
          <p className={`text-center md:text-left text-xl md:text-2xl ${fadeNumber}`}>
            {mainLang.how_to_play_desc}
          </p>
        </div>
      )}

      {currentIndex === 2 && (
        <>
          <BackButton text={mainLang.back} onClick={() => changeIndex(0)} className={fadeNumber}/>
          <h1 className={`text-5xl md:text-6xl font-bold z-50 ${fade}`}>{mainLang.select_mode}</h1>
          <div className={`flex flex-col gap-y-4 items-center w-[300px] z-50 ${fadeNumber}`}>
            <Button className={buttonClassName} onClick={() => selectMode("number")} text={mainLang.number}/>
            <Button className={buttonClassName} onClick={() => selectMode("word")} text={mainLang.word}/>
          </div>
        </>
      )}

      {currentIndex === 3 && (
        <div className={fadeNumber}>
          <CountdownCircleTimer
            isPlaying={true}
            duration={2}
            onComplete={() => changeLink(selectedMode)}
            colors="#db2777"
            size={240}
          >
            {() => <h2 className="w-[140px] text-2xl font-semibold text-center">{selectedMode === "number" ? mainLang.preparing_numbers_for_you : mainLang.preparing_words_for_you}</h2>}
          </CountdownCircleTimer>
        </div>
      )}

      {!currentIndex && (
        <>
          <h1 className={`text-5xl md:text-6xl font-bold z-50 ${fade}`}>Memoryquiz</h1>
          <p className={`text-xl md:text-2xl z-50 text-center ${fade}`}>{randomMainText}</p>

          <div className={`flex flex-col gap-y-4 items-center w-[300px] z-50 ${fadeNumber}`}>
            <Button className={buttonClassName} onClick={() => changeIndex(2)} text={mainLang.play_game}/>
            <Button className={buttonClassName} onClick={() => changeIndex(1)} text={mainLang.how_to_play}/>
          </div>

          <div className={`text-2xl flex flex-col items-center gap-y-4 ${fadeNumber}`}>
            <h1 className="font-bold text-3xl">{mainLang.switch_language}</h1>

            <div className="flex items-center gap-x-8">
              <button onClick={() => changeLang("/")}>English</button>
              <button onClick={() => changeLang("/th")}>ไทย</button>
            </div>
          </div>
        </>
      )}

      {showNumFloat()}
    </div>
  )
}

export default MainPage