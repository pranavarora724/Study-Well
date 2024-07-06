import { createSlice } from "@reduxjs/toolkit"



const initialState = {
    signupData:null ,
    loading:false ,
    token: (localStorage.getItem("token"))?(JSON.parse(localStorage.getItem("token"))):(null)
}


const authSlice = createSlice({
    name:"auth" , 
    initialState:initialState , 
    reducers:{
        setToken:(state , action)=>{
            state.token = action.payload;
        },

        removeToken:(state)=>{
            state.token = null
        },

        setSignupData:(state , action)=>{
            console.log("Setting signUp Data");
            console.log("Printing payload" , action.payload);
            state.signupData = action.payload;
        },

        setLoading:(state , action)=>{
            console.log(action.payload);
            console.log("Setting Auth Loading");
            state.loading = action.payload;
        }
    },
});

export const {setToken , removeToken , setSignupData , setLoading} = authSlice.actions;
export default authSlice.reducer;