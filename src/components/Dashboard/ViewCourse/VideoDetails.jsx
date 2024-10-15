import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {addToCompletedLectures} from '../../../slices/viewCourseSlice'
import toast from "react-hot-toast";
import {updateCourseProgress} from '../../../services/operations/createCourseAPI'
import ReactPlayer from 'react-player'
// import {addToCompletedLectures} from '../../../slices/viewCourseSlice';

function VideoDetails()
{
    const[indexOfVideo , setIndexOfVideo] = useState(0);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const playerRef = useRef(null);

    const token = useSelector((state)=>state.auth.token);

    const totalLectures = useSelector((state)=>state.viewCourse.totalLectures);
    const completedLectures = useSelector((state)=>state.viewCourse.completedLectures);
    const[videoDetails , setVideoDetails] = useState();
    const[ended , setEnded] = useState(false);
    const courseEntireData = useSelector((state)=>state.viewCourse.courseEntireData);

    console.log("Totl lectures = " , totalLectures);
    const {subSectionId} = useParams();
    const {courseId} = useParams();

    function settingIndexOfViedo()
    {
        totalLectures.map((el , index)=>{
            if(el._id == subSectionId)
            {
                setIndexOfVideo(index);
                setVideoDetails(el);
                console.log("Setting subSection " , el);
             }
        })
    }

    
    function nextHandler()
    {
        const nextLectureDetails = totalLectures[indexOfVideo+1];
        navigate(`/dashboard/viewCourse/${courseId}/section/${nextLectureDetails.section_id}/subSection/${nextLectureDetails._id}`);
    }

    function prevHandler()
    {
        const nextLectureDetails = totalLectures[indexOfVideo-1];
        navigate(`/dashboard/viewCourse/${courseId}/section/${nextLectureDetails.section_id}/subSection/${nextLectureDetails._id}`);
    }

    async function markAsCompleted(lecture_id)
    {
        
        if(completedLectures.includes(lecture_id))
        {
            toast.error('Lecture Already as Completed');
            return;
        }
       
        // dispatch()
        const response = await updateCourseProgress(courseEntireData._id, subSectionId , token , dispatch , navigate);
        if(response?.data?.success == true)
            {
               dispatch(addToCompletedLectures(lecture_id));
               toast.success('Lecture Marked As Complete');
            //    dispatch(addToCompletedLectures(lecture_id));   
            }
    }

    useEffect(()=>{
        settingIndexOfViedo();
        setEnded(false);
    },[subSectionId])

    return(
        <div>

          {
            (videoDetails)?
            (
                <div
                className="h-[100%] w-[100%]"
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                    
                <ReactPlayer
                ref={playerRef}
                width={`100%`}
                height={`90vh`}
                // playsinline={true}
                onEnded={()=>{setEnded(true); console.log("Video ended")}}
                onStart={()=>{setEnded(false)}}
                url={videoDetails.videoUrl}
                controls={true}
                
                // className={`w-[100%] border-white border-2 flex flex-col justify-center items-center`}
                />
    
                    
                {
                    (ended == true) && (
                        <div
                        
                        style={{
                            backgroundImage:
                              "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
                            
                                position: 'absolute',
                                zIndex: 10,
                                fontSize: '2em'
                            
                          }}
                          className="backdrop-blur-lg border-2 border-black h-[90%] max-[700px]:w-[80%] w-[60%] flex justify-center items-center flex-col"
                       
                        >
    
                                 {/* Prev button */}
                            {
                                indexOfVideo!=0 && (
                                    <div onClick={()=>{prevHandler()}} className="bg-yellow-50 rounded-lg hover:scale-95 transition-all duration-150 cursor-pointer m-2 text-black px-2 py-4">
                                    Previous Video
                                </div>
                                )
                            }
    
    
                            {/* Mark as complete button */}
                            {
                                !completedLectures.includes(videoDetails._id) &&
                                (
                                    <div onClick={()=>{markAsCompleted(videoDetails._id)}} className="bg-yellow-50 rounded-lg hover:scale-95 transition-all duration-150 cursor-pointer m-2 text-black px-2 py-4">
                                    Mark As Complete
                                </div>
                                
                                )
                                
                            }
    
                            {/* Rwatch button */}
                            {
                                <div onClick={()=>{
                                    if(playerRef.current)
                                    {
                                        // playerRef.current.seek(0);
                                        setEnded(false);
                                    }
                                }}
                                 className="bg-yellow-50 rounded-lg hover:scale-95 transition-all duration-150 cursor-pointer m-2 text-black px-2 py-4">
                                    Rewatch
                                </div>
                            }
    
                            {/* Next Button */}
                            {
                                (!indexOfVideo == totalLectures.length-1) && (
                                    <div onClick={()=>{nextHandler()}} className="bg-yellow-50 rounded-lg hover:scale-95 transition-all duration-150 cursor-pointer m-2 text-black px-2 py-4">
                                    Next Video
                                </div>
                                )
                            }
    
                        </div>
                    )
                }
    
                
                {/* </ReactPlayer> */}
                
                </div>
            ):(
                <div className="text-white text-3xl">No video found</div>
            )
          }

        </div>
    )
}

export default VideoDetails;