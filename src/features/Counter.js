import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { increment, decrement, incrementByAmount, selectCount } from "./counterSlice"

export function Counter() {
  const [incrementAmount, setIncrementAmount] = useState('1')
  const count = useSelector(selectCount)
  const dispatch = useDispatch()

  return (
    <div>
      <div>
        <span>{count}</span>
        <button onClick={() => dispatch(increment())}>+</button>
        <button onClick={() => dispatch(decrement())}>-</button>
      </div>
      <div>
        <input
          value={incrementAmount}
          onChange={e => setIncrementAmount(e.target.value)}
        />
        <button
          onClick={() => dispatch(incrementByAmount(Number(incrementAmount) || 0))}>Add Amount</button>
      </div>
    </div>
  )
}
