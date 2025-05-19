import { Heart, Laugh, MessageCircleHeart, Smile, Star, Sticker } from "lucide-react"
import { ReactNode, useState } from "react"

type NumIcon = number | ReactNode;

const NumFloat = () => {
  const [animate, setAnimate] = useState(false);
  const [num, setNum] = useState<NumIcon>(Math.floor(Math.random() * 1000))
  const [position] = useState({
    x: Math.floor(Math.random() * (window.innerWidth - 100)),
    y: Math.floor(Math.random() * (window.innerHeight - 100))
  })
  
  const isAnimated = animate ? "opacity-0" : "opacity-1";
  const iconClassName = "h-10 w-10";
  const icons = [
    <Heart className={iconClassName}/>, 
    <Star className={iconClassName}/>,
    <Smile className={iconClassName}/>,
    <Sticker className={iconClassName}/>,
    <Laugh className={iconClassName}/>,
    <MessageCircleHeart className={iconClassName}/>
  ]

  const clickToSeeSurprise = () => {
    setAnimate(true)
    setTimeout(() => {
      setAnimate(false)
      setNum(icons[Math.floor(Math.random() * icons.length)])
    }, 300)
    setTimeout(() => {
      setAnimate(true)
    }, 1000)
    setTimeout(() => {
      setAnimate(false)
      setNum(Math.floor(Math.random() * 1000))
    }, 1300)
  }

  return (
    <h1 
      className={`${isAnimated} num-float-anim num-float-text`}
      style={{ top: position.y, left: position.x }}
      onClick={clickToSeeSurprise}
    >
      {num}
    </h1>
  )
}

export default NumFloat