
import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { FaCloudShowersWater } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { GoCheckbox } from "react-icons/go";
import { useNavigate, useParams } from "react-router-dom";



function ViewCourseSidebarLink({sectionData})
{
    const[showSubsections , setShowSubsections] = useState(false);
    const completedVideos = useSelector((state)=>state.viewCourse.completedLectures);
    const {subSectionId} = useParams();
    const {courseId} = useParams();
    const navigate = useNavigate();

    console.log("completed Videos" , completedVideos);

    function changeLectureHandler(el)
    {
        navigate(`/dashboard/viewCourse/${courseId}/section/${el?.section_id}/subSection/${el._id}`)
    }

    function handleClick()
    {
        console.log("Clicked")
        if(showSubsections == true)
            setShowSubsections(false);
        else
        setShowSubsections(true);
    }
    return(
        <div className="mb-2">
            <div onClick={()=>{handleClick()}} className="flex flex-row justify-between items-center px-2 py-4 bg-richblack-700">
                <div className="text-white font-semibold">{sectionData.sectionName}</div>
                <div className="text-white"><FaAngleDown className={`text-2xl ${(showSubsections == true)?('rotate-180 transition-all duration-300'):('transition-all duration-300')}`}/>                </div>
            </div>
        <div className="bg-richblack-900 mx-auto border ">
        {
                (showSubsections == true)?(
                    sectionData.subSection.map((el , index)=>{
                        // console.log("subSection == " , el);
                     return(
                        <div onClick={()=>{changeLectureHandler(el)}} className={` py-4 px-2 ${(subSectionId == el._id)?('bg-yellow-50 text-black'):('text-white')}`}>
                        {
                            (completedVideos.includes(el?._id))?(
                                <div className="flex flex-row gap-x-4 items-center font-semibold">
                                    <div>
                                    <GoCheckbox className="font-extrabold text-xl text-caribbeangreen-400"/>
                                </div>

                                <div>{el?.title}</div>
                                </div>
                            ):
                            (
                            <div className="flex flex-row gap-x-4 items-center font-semibold">
                                <div>
                                <MdOutlineCheckBoxOutlineBlank className="font-extrabold text-lg bg-white text-white"/>
                            </div>

                            <div>{el?.title}</div>
                            </div>
                            )

                            
                        }
                    </div>
                     )
                    })
                ):(<></>)
            }
        </div>
        </div>
    )
}

export default ViewCourseSidebarLink;