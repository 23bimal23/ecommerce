import {createSlice } from "@reduxjs/toolkit"

const initialStateValue = "";
export const shoppingCart = createSlice({
    name: "shoppingCart",
    initialState: {value: initialStateValue},
    reducers:{
        getItemQuantity: (state, action) =>{
            state.value =action.payload
        }
        
    }
})