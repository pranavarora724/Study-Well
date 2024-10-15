import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllRatingsOfACourse } from "../../../services/operations/ratingAndReview";
import GetAvgRating from "../../../utils/avgRating";
import RatingStars from "../../common/RatingStars";
import { useEffect, useState } from "react";

function CourseReviewStars({courseId})
{
    const token  = useSelector((state)=>state.auth.token);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [ratingArr , setRatingArr] = useState([]);

    async function getData()
    {
        const resp = await getAllRatingsOfACourse(courseId ,  dispatch , navigate);
        console.log("resp = " , resp);
        setRatingArr(resp?.data?.body);
        console.log("Ratinng arr = " , resp?.data?.body);
    }

    useEffect(()=>{
        getData();
    },[])

    return(
        <div>
            <div className="flex flex-row items-center gap-x-2">
                        <div className="text-yellow-100">{GetAvgRating(ratingArr)}</div>
                        <div><RatingStars Review_Count={GetAvgRating(ratingArr)}></RatingStars></div>
                        <div className="text-white">({ratingArr.length} Reviews)</div>
                        {/* <div className="text-white">{courseDetails.studentsEnrolled.length} Students Enrolled</div> */}
              </div>
        </div>
    )
}

export default CourseReviewStars;