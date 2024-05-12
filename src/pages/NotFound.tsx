import { Frown } from "lucide-react"
import Button from "../components/Button"
import { useNavigate } from "react-router-dom"

const NotFound = () => {

  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-y-6 max-w-2xl mx-auto px-10 items-center justify-center h-[75vh]">
      <h1 className="text-[108px] font-bold">404</h1>
      <p className="text-xl md:text-2xl flex items-center gap-x-2">Oh, no! I cannot find the page for you. <Frown /></p>
      <Button text="Click me to go back to the homepage" onClick={() => navigate("/")}/>
    </div>
  )
}

export default NotFound