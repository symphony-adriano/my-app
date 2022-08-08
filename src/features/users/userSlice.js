import {createSlice} from '@reduxjs/toolkit'

const initialState = [
    { id: 0, name: 'Jimmy Page'},
    { id: 1, name: 'Robert Plant'},
    { id: 2, name: 'John Bonham'},
    { id: 2, name: 'John Paul Jones'},
]

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
})

export default userSlice.reducer
