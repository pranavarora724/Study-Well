import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoIosAddCircleOutline } from "react-icons/io";
import NestedView from "./CourseBuilderForm/NestedView";
import {createCourseSection , updateCourseSection} from '../../../services/operations/createCourseAPI'
import { MdNavigateNext } from "react-icons/md";
import {setStep} from '../../../slices/courseSlice'
import toast from "react-hot-toast";

function CourseBuilderForm() {

    const {
        register,
        setValue,
        getValues,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const course = useSelector((state)=>state.course.course)
    const token = useSelector((state)=> state.auth.token)

    console.log("Course = " , course);
    
    

    // Flag to determine whether we are editing a section or creating new section
    const [sectionIdFlag, setSectionIdFlag] = useState(null);

    // Handler Function to Change the Function Value By Editing it
    function handleEditButton(sectionId , sectionName)
    {
        if(sectionIdFlag == sectionId)
        {
            // Iska matlab we are clicking 2nd time
            setValue("sectionName" , "");
            setSectionIdFlag(null);
        }
        else{
            setSectionIdFlag(sectionId);
            setValue("sectionName" , `${sectionName}`);
        }
    }

    function cancelEditHandler()
    {
        setValue("sectionName" , "");
        setSectionIdFlag(null);
    }

    function nextHandler()
    {
        if(course.courseContent.length === 0)
        {
            toast.error("Enter atleast one Section");
            return;
        }

        if(course.courseContent.some((section)=>section.subSection.length === 0))
        {
            toast.error("Enter atleast one lecture in Each Section");
            return;
        }

        dispatch(setStep(3));
        localStorage.setItem("step" , 3);

    }

    function onSubmit(data) 
    {
        console.log("Data = " , data);
        
        if(sectionIdFlag)
        {
            // matlab we are editing
             updateCourseSection(data.sectionName , sectionIdFlag , dispatch , token , navigate)
        }
        else{
            // Matlab we ae creating section
             createCourseSection(data.sectionName , course._id , dispatch , token , navigate)
        }
        setSectionIdFlag(null);
        setValue("sectionName","");
    }

    return (
        <div className="mb-8">

            <div className="text-white text-2xl font-semibold mt-4">Course Builder</div>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-8">

                {/* SectionName DIV */}
                <div className="flex flex-col">
                    <label className="text-white">Section Name <sup className="text-pink-300">*</sup> </label>

                    <input
                        type="text"
                        className="bg-richblack-700 text-white mt-3 p-2 rounded-lg"
                        placeholder="Enter here"
                        id="sectionName"
                        {...register("sectionName", { required: true })}
                    ></input>

                </div>

                {
                    errors.sectionName && (
                    <span className="text-pink-300 mt-2">Please Enter Section Name</span>
                )
                }

                <div className="flex flex-row gap-x-4 items-center">
                    <button type="submit" className="flex gap-x-2 p-2 mt-2 items-center text-white border border-yellow-50 rounded-lg hover:scale-95 transition-all duration-150">
                        <div>
                            {
                            (sectionIdFlag == null)?(<p>Add Section</p>):(<p>Edit Section</p>)
                            }
                            </div>
                        <IoIosAddCircleOutline />
                    </button>

                    {
                        (sectionIdFlag != null)?
                        (
                        <div onClick={cancelEditHandler} className="text-richblack-500 underline cursor-pointer">
                            Cancel Edit
                        </div>
                        ):
                        (<div></div>)
                    }
                </div>
            </form>

            <div>
                {
                    (course.courseContent.length == 0)?
                    (<div></div>):
                    (<NestedView handleEditButton={handleEditButton}/>)
                }
            </div>

            <div className="mt-4 flex flex-row justify-between px-6">
                <div className="h-[1px]"></div>
                <div onClick={nextHandler} className="bg-yellow-100 rounded-lg text-black p-2 flex gap-x-2 items-center hover:scale-95 transition-all duration-200 cursor-pointer">
                    <div>Next</div>
                    <MdNavigateNext />
                </div>
            </div>
        </div>
    )
}

export default CourseBuilderForm;