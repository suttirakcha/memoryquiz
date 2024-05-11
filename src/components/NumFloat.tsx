import { Heart, Smile, Star, Sticker } from "lucide-react"
import { ReactNode, useState } from "react"

const NumFloat = () => {

  const [num, setNum] = useState<number | ReactNode>(Math.floor(Math.random() * 1000))
  const [position, setPosition] = useState({
    x: Math.floor(Math.random() * window.innerWidth),
    y: Math.floor(Math.random() * window.innerHeight)
  })

  const [animate, setAnimate] = useState(false)

  const iconClassName = "h-10 w-10"
  const icons = [
    <Heart className={iconClassName}/>, 
    <Star className={iconClassName}/>,
    <Smile className={iconClassName}/>,
    <Sticker className={iconClassName}/>
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
      className={`absolute text-pink-500/20 text-5xl font-bold num-float z-1 cursor-pointer text-center ${animate ? "opacity-0" : "opacity-1"} transition-opacity duration-300`}
      style={{
        top:position.y, 
        left:position.x
      }}
      onClick={clickToSeeSurprise}
    >{num}</h1>
  )
}

export default NumFloat