

import { createSlice } from "@reduxjs/toolkit"



const initialState = {
    user: (localStorage.getItem("user"))?(JSON.parse(localStorage.getItem("user"))):(null) , 
    profileLoading:false
}

const profileSlice = createSlice({
    name:"profile" , 
    initialState:initialState , 
    reducers:{
        setProfile:(state , action)=>{
            state.user = action.payload;
        },
        removeProfile:(state)=>{
            state.user = null;
        },
        setProfileLoading:(state , action)=>{
            state.profileLoading = action.payload;
        }
    },
});

export const {setProfile , removeProfile , setProfileLoading} = profileSlice.actions;
export default profileSlice.reducer;