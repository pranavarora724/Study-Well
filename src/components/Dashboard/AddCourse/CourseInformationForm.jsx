import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { apiConnector } from "../../../services/apiConnector";
import { categoryEndponts } from "../../../services/apis";
import { LiaRupeeSignSolid } from "react-icons/lia";
import RequirementField from './CourseInformationForm/RequirementField'
import ChipInput from "./CourseInformationForm/ChipInput";
import Thumbnail from "./CourseInformationForm/Thumbnail";
import {createCourse} from '../../../services/operations/createCourseAPI'
import { useNavigate } from "react-router-dom";

function CourseInformationForm()
{
    const [courseCategories , setCourseCategories] = useState([]);
    // Fetching categories
    async function getCategories() {
        try {
            const response = await apiConnector("GET", `${categoryEndponts.GET_CATEGORIES_API}`)
            console.log("CAtegory API RESPONSE");
            console.log(response);
            let categories = await response?.data?.body;
            console.log("categories = ", categories);
            setCourseCategories(categories);

        } catch (error) {
            console.log("Error in fetching categories");
            console.log(error);
        }
    }

    useEffect(()=>
        {
        getCategories();
        },[])

    const{
        register,
        setValue,
        getValues,
        handleSubmit,
        formState:{errors}
    } = useForm();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const course = useSelector((state)=> state.course.course);
    const editCourse = useSelector((state)=> state.course.editCourse);
    const user = useSelector((state)=>state.profile.user)
    const step = useSelector((state)=>state.course.step)
    const token = useSelector((state)=>state.auth.token);

    function onSubmit(data)
    {
        console.log("FormData = " , data);
        const formData = data;
        createCourse(formData.courseTitle , 
            formData.courseShortDesc , 
            user._id , 
            formData.courseBenefits , 
            parseInt(`${formData.coursePrice}` , 10) , 
            formData.courseThumbnail , 
            formData.Tags , 
            formData.courseCategory , 
            formData.courseRequirements , 
            dispatch , 
            step,
        token,
    navigate)
    }

    // console.log("Course Categories = " , courseCategories);
   
    return(
        <div className="mb-8">

            <form onSubmit={handleSubmit(onSubmit)}>

                {/* Course Title */}
                <div className="flex flex-col">
                    <label htmlFor="courseTitle" className="text-white">Course Title <sup className="text-pink-300">*</sup></label>
                    <input
                          id="courseTitle"
                          type="text"
                          placeholder="Enter Course Title"
                          className="text-white mt-2 p-2 bg-richblack-700 border-none rounded-lg"
                          
                          {...register("courseTitle" , {required:true})}
                    ></input>

                    {
                        errors.courseTitle  && (
                            <span className="text-pink-200">Please Enter Title</span>
                        )
                    }
                </div>

                {/* course Short Description */}
                <div className="flex flex-col mt-7">
                    <label htmlFor="courseShortDesc" className="text-white">Course Short Desciption <sup className="text-pink-300">*</sup></label>
                    
                    <textarea
                    id="courseShortDesc"
                    {...register("courseShortDesc" , {required:true})}
                    placeholder="Enter Course Description"
                    rows={5}
                    className="text-white mt-2 p-2 bg-richblack-700 border-none rounded-lg"
                    ></textarea>

                    {
                        errors.courseShortDesc  && (
                            <span className="text-pink-300">Please Enter Description</span>
                        )
                    }
                </div>

                {/* Course Price */}
                <div className="flex flex-col mt-7 relative ">
                    <label htmlFor="coursePrice" className="text-white">Price<sup className="text-pink-300">*</sup></label>
                    <input
                          id="coursePrice"
                          type="number"
                          placeholder="Enter Price"
                          className=" text-white mt-2 p-2 pl-8 bg-richblack-700 border-none rounded-lg"
                          
                          {...register("coursePrice" , {required:true})}
                    ></input>

                    {
                        errors.coursePrice  && (
                            <span  className="text-pink-300 absolute -bottom-6">Please Enter Price</span>
                        )
                    }

                     <LiaRupeeSignSolid  className="absolute text-white text-xl bottom-2 left-1"/>

                </div>

                {/* Course Categories */}
                <div className="flex flex-col mt-10 relative">
                    <label htmlFor="courseCategory" className="text-white">Choose Category<sup className="text-pink-300">*</sup></label>
                    
                    <select
                    id="courseCategory"
                    defaultValue=""
                    {...register("courseCategory" , {required:true}) } 
                    className=" text-white mt-2 p-2  bg-richblack-700 border-none rounded-lg"
                    >
                        <option value="" disabled="true">Choose a Category</option>

                        {
                            courseCategories.map((courseCategory)=>{
                                // console.log(courseCategory.name);
                               return(
                                 <option key={courseCategory._id} value={courseCategory._id}>{courseCategory.name}</option>
                               )
                            })
                        }
                    </select>
                    {
                        errors.courseCategory  && (
                            <span className="text-pink-300">Please Choose A Category</span>
                        )
                    }

                     {/* <LiaRupeeSignSolid  className="absolute text-white text-xl bottom-2 left-1"/> */}

                </div>

                {/* course Benefits */}
                <div className="flex flex-col mt-7">
                    <label htmlFor="courseBenefits" className="text-white">Course Benefits<sup className="text-pink-300">*</sup></label>
                    
                    <textarea
                    id="courseBenefits"
                    {...register("courseBenefits" , {required:true})}
                    placeholder="Enter Course Benefits"
                    rows={5}
                    className="text-white mt-2 p-2 bg-richblack-700 border-none rounded-lg"
                    ></textarea>

                    {
                        errors.courseBenefits  && (
                            <span className="text-pink-300">Please Enter Benefits</span>
                        )
                    }
                </div>

                {/* Upload image */}
                <Thumbnail 
                name="courseThumbnail"
                label="Choose Thumbnail"
                errors={errors}
                register={register}
                setValue={setValue}
                getValues={getValues}
                />

                {/* Course Rquirements */}
                <RequirementField 
                  name="courseRequirements"
                  label="Course Requirements"
                  errors={errors}
                  register={register}
                  setValue={setValue}
                  getValues={getValues}
                />

                {/* Chip input Tags Field */}
                <ChipInput 
                name="Tags"
                label="Tags"
                errors={errors}
                register={register}
                setValue={setValue}
                getValues={getValues}
                />

                <div className="w-[95%] mx-auto flex flex-row justify-between">
                    <div className="w-[1px]"></div>
                    <button type="submit" className="mt-4 hover:scale-95 transition-all duration-150 bg-yellow-50 text-black px-2 py-2 border-none rounded-lg">Proceed</button>
                </div>

            </form>    
        </div>
    )
}

export default CourseInformationForm;
