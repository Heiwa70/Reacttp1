import {configureStore, createSlice} from '@reduxjs/toolkit'

const config = createSlice({
    name: "login",
    initialState: [
        {nom: ""}


    ],
    reducers: {
        SetUsers: (state, action) => {

            const newUser = {name: action.payload}
            state.splice(0,1,newUser)
        },
        GetUser:(state,action)=>{
            return state
        }
    }
})

const store = configureStore({
    reducer: {
        login: config.reducer
    }
})


export default store










