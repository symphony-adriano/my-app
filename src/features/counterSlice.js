import { createSlice } from "@reduxjs/toolkit"

export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        value: 0
    },
    reducers: {
        increment: state => {
            state.value++
        }
    }
})

export const { increment } = counterSlice.actions

export const selectCount = state => state.counter.value

export default counterSlice.reducer
