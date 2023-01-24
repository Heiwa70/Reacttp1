import {configureStore, createSlice} from '@reduxjs/toolkit'

const config = createSlice({
    name: "login",
    initialState: [
        {nom: ""}


    ],
    reducers: {
        vueUsers: (state, action) => {

            const newUser = {name: action.playload}
            state[0] = newUser
        }
    }
})

const store = configureStore({
    reducer: {
        login: config.reducer
    }
})


export default store










