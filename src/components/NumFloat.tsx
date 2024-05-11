import { useState } from "react"

const NumFloat = () => {

  const [num, setNum] = useState(Math.floor(Math.random() * 1000))
  const [position, setPosition] = useState({
    x: Math.floor(Math.random() * window.innerWidth),
    y: Math.floor(Math.random() * window.innerHeight)
  })

  return (
    <h1 
      className="absolute text-pink-500/20 text-5xl font-bold num-float -z-1" 
      style={{
        top:position.y, 
        left:position.x
      }}
    >{num}</h1>
  )
}

export default NumFloat