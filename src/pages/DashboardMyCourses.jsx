import { Navigate, useNavigate, useParams } from "react-router-dom";
import {getInstructorCourses} from '../services/operations/createCourseAPI'
import { useDispatch, useSelector } from "react-redux";
import { MdEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { useEffect, useState } from "react";
import Sidebar from "../components/Dashboard/Sidebar";
import {publishCourse} from '../services/operations/createCourseAPI'
import { getCourseDetails } from "../services/operations/createCourseAPI";


function DashboardMyCourses()
{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const {instructorId} = useParams();
    console.log("Instructor id = ", instructorId);
    const token = useSelector((state)=>state.auth.token);
    const user = useSelector((state=>state.profile.user));
    const [publishedCourses , setPublishedCourses] = useState([]);
    const [draftCourses , setDraftCourses] = useState([]);
    console.log(publishedCourses);
    console.log(draftCourses);

    async function getCourses()
    {
        const response = await getInstructorCourses(instructorId , 'abc'  ,token , dispatch , navigate);
        
        console.log(response);
        // console.log("Response.publisedCourses" , response.publishedCourses);
        setPublishedCourses(response?.data?.publishedCourses);
        setDraftCourses(response?.data?.draftCourses);
    }

    async function editHandler(course)
    {
       const result =await  getCourseDetails(course._id , token , dispatch , navigate);
       console.log("COURSE DETAILS = " , result?.data?.body);
        localStorage.setItem('courseDetails' , JSON.stringify(result?.data?.body));
        navigate('/dashboard/editCourse');
    }

    async function showDetailsHandler(course)
    {
        const result =await  getCourseDetails(course._id , token , dispatch , navigate);
       console.log("COURSE DETAILS = " , result?.data?.body);
        localStorage.setItem('courseDetails' , JSON.stringify(result?.data?.body));
        navigate('/dashboard/courseDetails');
    }

    useEffect(()=>{
        getCourses();
    },[])
    
    return(
        <div>
            <div className="flex flex-row">

                {/* Side bar */}
                <div className=" bg-richblack-700   min-h-[100vh]">
                    <Sidebar></Sidebar>
                </div>

                <div className="max-w-[800px] w-[80%] mx-auto  ">
                    {
                        // draftCourses.
                        // console.log(publishedCourses)
                        // console.log("hi")
                        
                        (publishedCourses.length == 0 & draftCourses.length==0)?
                        (
                        <div className="text-white text-3xl text-center">
                            No Courses Found
                        </div>
                    ):
                        (
                        <div className="">
                            {/* Published Courses */}
                            <div className="text-center text-white text-3xl mt-4 mb-4">My Courses</div>
                            {
                                publishedCourses.length > 0 && (
                                    <div className="flex flex-col gap-y-4">
                                        {
                                            publishedCourses.map((course)=>{
                                                return (
                                                    <div key={course._id} className="flex flex-row gap-x-2 p-4 justify-between">
                                                        <div  className="flex flex-row gap-x-4 ">
                                                        <div onClick={()=>{showDetailsHandler(course)}} >
                                                            <img className="w-[200px]" src={`${course.thumbnail}`}></img>
                                                        </div>

                                                        <div className="flex flex-col max-w-[200px] justify-between ">
                                                            <div onClick={()=>{showDetailsHandler(course)}} className="text-white font-semibold text-2xl">{course.name}</div>
                                                            <div className="text-richblack-400">{course.description}</div>
                                                            <div className="text-yellow-200">PUBLISHED</div>
                                                        </div>
                                                        </div>

                                                        <div className="flex justify-between  gap-x-8">
                                                            <div className="text-white flex gap-x-2 "><div>{course.price}</div> <div><LiaRupeeSignSolid /></div></div>
                                                            <div onClick={()=>{editHandler(course)}} className="text-white cursor-pointer"><MdEdit  className="text-white text-2xl"/>  </div>
                                                            <div className="text-white cursor-pointer"><MdDeleteForever className="text-xl text-pink-300"/>  </div>
                                                        </div>

                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            }
                            {/* DraftedCourses */}
                            {
                               draftCourses.length > 0 && (
                                    <div className="flex flex-col gap-y-4">
                                        {
                                            draftCourses.map((course)=>{
                                                return (
                                                    <div key={course._id} className="flex flex-row gap-x-2 p-4 justify-between">

                                                        <div  className="flex flex-row gap-x-4 ">
                                                        <div onClick={()=>{navigate(`/dashboard/courseDetails/${course._id}`)}}>
                                                            <img className="w-[200px]" src={`${course.thumbnail}`}></img>
                                                        </div>

                                                        <div className="flex flex-col max-w-[200px] justify-between py-4">
                                                            <div onClick={()=>{navigate(`/dashboard/courseDetails/${course._id}`)}} className="text-white font-semibold text-2xl">{course.name}</div>
                                                            <div className="text-richblack-400">{course.description}</div>

                                                            <div className="flex flex-row gap-x-4 items-center">
                                                            <div className="text-pink-200">DRAFT</div>
                                                            <div onClick={()=>{publishCourse(course._id , token , dispatch , navigate , user._id)}} className="bg-yellow-100 p-2 text-black rounded-lg hover:scale-90 transition-all duration-200 cursor-pointer">Publish Course</div>
                                                            </div>
                                                        </div>
                                                        </div>

                                                        <div className="flex justify-between  gap-x-8">
                                                        <div className="text-white flex gap-x-2 "><div>{course.price}</div> <div><LiaRupeeSignSolid /></div></div>
                                                            <div onClick={()=>{editHandler(course)}} className="text-white cursor-pointer"> <MdEdit className="text-white text-2xl" />  </div>
                                                            <div className="text-white cursor-pointer"><MdDeleteForever className="text-pink-300 text-xl"/>    </div>
                                                        </div>

                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            }
                            
                        </div>
                    )
                    }
                </div>
            </div>
        </div>
    )
}
export default DashboardMyCourses;