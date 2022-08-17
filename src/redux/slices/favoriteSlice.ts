import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    value: []
}

type State = typeof initialState


export const favoriteSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        setFavoritesLists: (state:State, action) => {
            state.value = action.payload
        }
    }
})

export const {setFavoritesLists} = favoriteSlice.actions
export default favoriteSlice.reducer