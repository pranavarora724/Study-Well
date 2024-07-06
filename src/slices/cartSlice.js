import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    cartItems:[]
}

const cartSlice = createSlice({
    name:"cart" , 
    initialState:initialState , 
    reducers:{
        addToCart:(state , action)=>{
            state.cartItems.push(action.payload);
        },

        removeFromCart:(state , action)=>{
            state.cartItems = state.cartItems.filter((item)=>{
                return(item.id!=action.payload)
            })
        },
        
        resetCart:(state)=>{
            state.cartItems = [];
        }
    },
});

export const {addToCart , removeFromCart , resetCart} = cartSlice.actions;
export default cartSlice.reducer;