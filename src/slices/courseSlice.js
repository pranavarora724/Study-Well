
import { createSlice } from "@reduxjs/toolkit";

const initialState={
    step: ((localStorage.getItem('step'))?(localStorage.getItem("step")):(1)),
  course: ((localStorage.getItem("course"))?(JSON.parse(localStorage.getItem("course"))):(null)),
  editCourse: false,
  paymentLoading: false,
}

const courseSlice = createSlice(
{
    name:"course",
    initialState:initialState,
    reducers:{
        setStep:(state , action)=>{
            state.step = action.payload;
        },
        setCourseObject: (state, action) => {
            state.course = action.payload
          },
          setEditCourse: (state, action) => {
            state.editCourse = action.payload
          },
          setPaymentLoading: (state, action) => {
            state.paymentLoading = action.payload
          },

          resetCourseSlice: (state) =>{
            state.step = 1;
            state.course = null ;
            state.paymentLoading = false;
            state.editCourse = false;
          },
    }
})

export const {resetCourseSlice, setCourseObject , setEditCourse , setPaymentLoading , setStep} = courseSlice.actions

export default courseSlice.reducer;