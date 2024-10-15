import { useParams } from "react-router-dom";

import ViewCourseSidebar from "../components/Dashboard/ViewCourse/ViewCourseSidebar";
import VideoDetails from "../components/Dashboard/ViewCourse/VideoDetails";
import { useState } from "react";
import ReviewModal from "../components/Dashboard/ViewCourse/ReviewModal";

function DashboardViewCourse()
{
    const {courseId} = useParams();
    const {sectionId} = useParams();
    const {subSectionId} = useParams();

    console.log("couseId = " , courseId);
    console.log("section id = " , sectionId);
    console.log("subSecton Id = " , subSectionId);

    const[showReviewModal , setShowReviewModal] = useState(false);
    
    return(
        <div>
            <div className="flex flex-row">
                
                <div className=" bg-richblack-700   min-h-[100vh]">
                    <ViewCourseSidebar setShowReviewModal={setShowReviewModal}></ViewCourseSidebar>
                </div>

                <div className="max-w-[800px] w-[80%] mx-auto ">
                    <VideoDetails></VideoDetails>
                </div>

                {
                    showReviewModal && (
                        <ReviewModal setShowReviewModal={setShowReviewModal}></ReviewModal>
                    )
                }

                
            </div>
        </div>
    )
}

export default DashboardViewCourse;