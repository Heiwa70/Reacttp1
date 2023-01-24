import {configureStore, createSlice} from '@reduxjs/toolkit'

const config = createSlice({
    name: "login",
    initialState: [
        {nom: ""}


    ],
    reducers: {
        changeUsers: (state, action) => {

            const newUser = {name: action.payload}
            console.log("playload = "+action.payload)
            state.splice(0,1,newUser)
        }
    }
})

const store = configureStore({
    reducer: {
        login: config.reducer
    }
})


export default store










