import Button from "../components/Button"

const MainPage = () => {
  return (
    <div className="flex flex-col gap-y-10 items-center justify-center h-[75vh]">
      <h1 className="text-6xl font-bold fade-in">Memoryquiz</h1>

      <div className={`flex flex-col gap-y-4 items-center w-full`}>
        <Button className="max-w-[300px] w-full" onClick={() => {}} text="Play game"/>
        <Button className="max-w-[300px] w-full" onClick={() => {}} text="How to play"/>
      </div>
    </div>
  )
}

export default MainPage