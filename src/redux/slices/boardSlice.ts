import { createSlice} from "@reduxjs/toolkit";


const initialState = {
    value: []
}

type State = typeof initialState

export const boardSlice = createSlice({
    name: "board",
    initialState,
    reducers: {
        setBoards:(state: State, action) => {
            state.value = action.payload
        }
    },

})


export const {setBoards} = boardSlice.actions
export default boardSlice.reducer