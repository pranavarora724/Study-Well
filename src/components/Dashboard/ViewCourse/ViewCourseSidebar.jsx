import { RxCrossCircled } from "react-icons/rx";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { FaAngleLeft } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ViewCourseSidebarLink from "./ViewCourseSidebarLink";


function ViewCourseSidebar({setShowReviewModal})
{

    const { contextSafe } = useGSAP();
    const {sectionId} = useParams();
    const {subSectionId} = useParams();
    const [currentLecture , setCurrentLecture] = useState(0);
    const user = useSelector((state)=>state.profile.user);

    const navigate = useNavigate();

    const completedLectures = useSelector((state)=>state.viewCourse.completedLectures);
    // console.log("Completed lectures = "  , completedLectures);
    const totalLectures = useSelector((state)=>state.viewCourse.totalLectures);
    const courseSectionData = useSelector((state)=>state.viewCourse.courseSectionData);

    function getCurrentLecture()
    {
        let ans = 1;
        totalLectures.forEach((lec , index)=>{
            if(lec._id === subSectionId)
                ans = index+1;
        })
        return ans;
    }
    useEffect(()=>{
        setCurrentLecture(getCurrentLecture());
    } , [sectionId , subSectionId])

    // let currentLecture = 
    
    const closeSidebarHandler = contextSafe(() => {
        gsap.to('.sidebar', {
            x: -220,
            duration: 1
        })
    }) 
    return(

        <div className="sidebar
       h-[100vh] -translate-x-[220px] z-20 max-[768px]:absolute max-[768px]:top-0 max-[768px]:left-0 md:relative md:translate-x-0">

        <div className="bg-richblack-800  w-[220px] lg:w-[300px]  h-[100%] flex flex-col pt-10 md:pt-0">

            {/* CROSS Button */}
            <div className='text-xl text-white absolute top-2 right-2 md:hidden'>
                    <RxCrossCircled onClick={closeSidebarHandler} />
            </div>

            <div className="w-[100%] mt-10 px-4 flex flex-row justify-between items-center">
                <div onClick={()=>{navigate(`/dashboard/enrolledCourses/${user._id}`)}} className="bg-richblack-200 rounded-full">
                <FaAngleLeft className="text-3xl text-richblack-700"/>
                </div>

                <div onClick={()=>{setShowReviewModal(true)}} className="bg-yellow-50 font-bold text-richblack-700 p-2 px-4 rounded-lg hover:scale-95 cursor-pointer transition-all duration-150">Add a Review</div>
            </div>

            <div className="text-white text-xl font-semibold mt-2 px-4">My Course</div>
            <div className="px-4 text-richblack-300">{currentLecture} / {totalLectures.length}</div>
            <div className="px-4 my-2 bg-richblack-300 w-[full] h-[1px]"></div>

            {
                courseSectionData.length>0 && (
                    <div>
                        {
                            courseSectionData.map((section , index)=>{
                                // console.log("Section data = " , section);
                                return(
                                    <ViewCourseSidebarLink sectionData={section}></ViewCourseSidebarLink>
                                )
                            })
                        }
                    </div>

                )
            }

            
        </div>
        </div>
    )
}

export default ViewCourseSidebar;