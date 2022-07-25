import { useState } from "react"

function Counter() {
  const [count, setCount] = useState(0)

  return (
    <>
      <p>My count is {count}</p>
      <button onClick={() => setCount(count + 1)}>INCREASE</button>
    </>
  )
}

export default Counter
