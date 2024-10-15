
import { createSlice } from "@reduxjs/toolkit"
import { act } from "react";
import toast from "react-hot-toast";

const initialState = {
    totalNumberOfLectures:(localStorage.getItem('totalNumberOfLectures')?(JSON.parse(localStorage.getItem('totalNumberOfLectures'))): [] ),
    completedLectures:(localStorage.getItem('completedLectures')?(JSON.parse(localStorage.getItem('completedLectures'))): [] ),
    totalLectures:(localStorage.getItem('totalLectures'))?(JSON.parse(localStorage.getItem('totalLectures'))):[],
    courseSectionData:(localStorage.getItem('courseSectionData')?(JSON.parse(localStorage.getItem('courseSectionData'))): [] ),
    courseEntireData:(localStorage.getItem('courseEntireData')?(JSON.parse(localStorage.getItem('courseEntireData'))): [] )
}

const viewCourseSlice = createSlice(
    {
        name:"viewCourse",
        initialState:initialState,
        reducers:{
            setTotalNumberOfLectures:(state , action)=>{
                const total = action.payload;
                state.totalNumberOfLectures = total;
                console.log("setting total Number of lectures = " , total);
                localStorage.setItem("totalNumberOfLectures" , JSON.stringify(state.totalNumberOfLectures));
            },

            addToCompletedLectures:(state , action)=>{
                const addedLecture = action.payload;
                state.completedLectures.push(addedLecture);
                console.log("adding a lecture" , action.payload);
                localStorage.setItem("completedLectures" , JSON.stringify(state.completedLectures));
            },
            setCompletedLectures:(state , action)=>{
                state.completedLectures = action.payload;
                console.log("setting completed Lectures = " , state.completedLectures);
                localStorage.setItem("completedLectures" , JSON.stringify(state.completedLectures))
            },

            setCourseEntireData:(state , action)=>{
                const data = action.payload;
                state.courseEntireData = data;
                console.log("setting course entore data = " , state.courseEntireData);
                localStorage.setItem("courseEntireData" , JSON.stringify(state.courseEntireData));
            },
            setCourseSectionData:(state,action)=>{
                const data = action.payload;
                state.courseSectionData = data;
                console.log("settig course section data = " , state.courseSectionData);
                localStorage.setItem("courseSectionData" , JSON.stringify(state.courseSectionData));
            },
            setTotalLectures:(state,action)=>{
                state.totalLectures = action.payload;
                localStorage.setItem("totalLectures" , JSON.stringify(state.totalLectures));
            },
            clearViewCourseSlice:(state , action)=>{
                state.totalNumberOfLectures = 0;
                state.completedLectures = [];
                state.courseSectionData = [];
                state.courseEntireData = {};
                state.totalLectures = [];

                localStorage.removeItem('courseEntireData');
                localStorage.removeItem('courseSectionData');
                localStorage.removeItem('totalNumberOfLectures');
                localStorage.removeItem('completedLectures');
                localStorage.removeItem('totalLecures');
            }
        }
    }
)

export const {addToCompletedLectures , setTotalNumberOfLectures, clearViewCourseSlice , setCourseEntireData ,setCourseSectionData , setTotalLectures , setCompletedLectures} = viewCourseSlice.actions;
export default viewCourseSlice.reducer;