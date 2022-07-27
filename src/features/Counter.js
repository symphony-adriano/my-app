import { useDispatch, useSelector } from "react-redux"
import { increment, selectCount } from "./counterSlice"

export function Counter() {
    const count = useSelector(selectCount)
    const dispatch = useDispatch()

    return (
        <div>
            <span>{count}</span>
            <button onClick={() => dispatch(increment())}>+</button>
        </div>
    )
}
