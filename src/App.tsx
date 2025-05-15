import { Button } from "@/components/ui/button"
import { useState } from "react"

function App() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount((prevCount) => prevCount + 1);
  }
  return (
    <div className="flex items-center justify-center min-h-svh">
      <Button 
      className="flex flex-col items-center justify-center"
      onClick={handleClick}>
      Count is {count}
    </Button>
    </div>
    
  )
}

export default App
