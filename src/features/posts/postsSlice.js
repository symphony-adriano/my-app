import { createSlice } from "@reduxjs/toolkit"

const initialState = [
  { id: 1, title: 'First Post', content: 'Hello 1!' },
  { id: 2, title: 'Second Post', content: 'Hello 2!' },
]

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded(state, action) {
      state.push(action.payload)
    }
  }
})

export const { postAdded } = postsSlice.actions

export default postsSlice.reducer
