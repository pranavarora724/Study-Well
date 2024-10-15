import { createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast";


const initialState = {
    cartItems: localStorage.getItem('cartItems')?(JSON.parse(localStorage.getItem('cartItems'))):([]),
    cartItemsId: localStorage.getItem('cartItemsId')?(JSON.parse(localStorage.getItem('cartItemsId'))):([]),
    cartPrice:localStorage.getItem('cartPrice')?(JSON.parse(localStorage.getItem('cartPrice'))):(0),
    cartItemsLength:localStorage.getItem('cartItemsLength')?(JSON.parse(localStorage.getItem('cartItemsLength'))):(0)
}

const cartSlice = createSlice({
    name:"cart" , 
    initialState:initialState , 
    reducers:{
        addToCart:(state , action)=>{
            const course =  action.payload;

            console.log("adding course" , course);

            // Corse already in cart
            const check = state.cartItems.filter((element)=>{
                return element._id == course._id
            })

            if(check.length>0)
            {
               toast.error('Course already in cart');
               return; 
            }
            // Course not in cart
            state.cartItems.push(course);
            state.cartItemsLength = state.cartItemsLength + 1;
            state.cartPrice = state.cartPrice + course.price;
            state.cartItemsId.push(course._id);

            localStorage.setItem('cartItems' , JSON.stringify(state.cartItems));
            localStorage.setItem('cartPrice' , JSON.stringify(state.cartPrice));
            localStorage.setItem('cartItemsLength' , JSON.stringify(state.cartItemsLength));
            localStorage.setItem('cartItemsId' , JSON.stringify(state.cartItemsId));

            toast.success('ITem added to cart');
        },

        removeFromCart:(state , action)=>{

            const course = action.payload;
            state.cartItems = state.cartItems.filter((item)=>{
                return(item._id!=course._id)
            })

            state.cartItemsId = state.cartItemsId.filter((item)=>{
                return(item != course._id);
            })

            state.cartItemsLength = state.cartItemsLength -1;
            state.cartPrice = state.cartPrice - course.price;

            localStorage.setItem('cartItems' , JSON.stringify(state.cartItems));
            localStorage.setItem('cartPrice' , JSON.stringify(state.cartPrice));
            localStorage.setItem('cartItemsLength' , JSON.stringify(state.cartItemsLength));
            localStorage.setItem('cartItemsId' , JSON.stringify(state.cartItemsId));

            toast.success('Item Removed From Cart');

        },
        
        resetCart:(state)=>{
            state.cartItems = [];
            state.cartItemsLength = 0;
            state.cartPrice = 0;

            localStorage.removeItem('cartItems');
            localStorage.removeItem('cartPrice');
            localStorage.removeItem('cartItemsLength');
            localStorage.removeItem('cartItemsId');
        }
    },
});

export const {addToCart , removeFromCart , resetCart} = cartSlice.actions;
export default cartSlice.reducer;