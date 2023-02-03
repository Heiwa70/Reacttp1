import {configureStore, createSlice} from '@reduxjs/toolkit'

const config = createSlice({
    name: "login",
    initialState: [
        {nom: null}


    ],
    reducers: {
        SetUsers: (state, action) => {

            const newUser = {nom: action.payload}
          //  console.log("no array "+state)
            state[0] = newUser
            //console.log("array[O] "+state[0])

        },
        GetUser:(state,action)=>{
            return "coucouc"
        }
    }
})

const store = configureStore({
    reducer: {
        login: config.reducer
    }
})


export default store










