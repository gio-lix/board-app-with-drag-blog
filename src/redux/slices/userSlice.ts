import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type User = {
    id: "",
    email: ""
}

const initialState = {
    value: {
        id: "",
        email: ""
    }
}
type State = typeof initialState


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state: State, action:PayloadAction<User>) => {
            state.value = action.payload
        }
    }
})


export const {setUser} = userSlice.actions
export default userSlice.reducer