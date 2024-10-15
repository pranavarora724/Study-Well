import { useEffect, useState } from "react";
import { getCourseWithProgress } from "../../../services/operations/createCourseAPI";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProgressBar from "@ramonak/react-progress-bar";

function CourseProgressBar({courseId})
{
    const [completedVideos , setCompletedVideos] = useState(0);
    const[totalVideos , setTotalVidoes] = useState(0);
    const token = useSelector((state)=>state.auth.token);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    async function getDetails()
    {
        const resp = await getCourseWithProgress(courseId , token , dispatch , navigate);
        console.log("Resp = " , resp);
        setCompletedVideos(resp?.data?.courseProgress.length);
        let lectures = [];

        let totalNumberOfLectures = 0;
        resp?.data?.body?.courseContent.forEach((el)=>{
        totalNumberOfLectures = totalNumberOfLectures + el.subSection.length;
        
        el.subSection.map((sub , index)=>{
          lectures.push(sub);
        })
      });

      setTotalVidoes(totalNumberOfLectures);
      console.log("total lectures = " , totalNumberOfLectures);
    }

    useEffect(()=>{
        getDetails();
    },[])

    return(
        <div className="flex flex-col items-center">
            <div>
            <ProgressBar width="150px" labelAlignment="outside" completed={((completedVideos / totalVideos)*100)} />
            </div>
            <div className="text-white">
                Completed ( % )
            </div>
        </div>
    )
}

export default CourseProgressBar;