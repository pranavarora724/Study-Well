import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Dashboard/Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import RatingStars from "../components/common/RatingStars";
import GetAvgRating from "../utils/avgRating";
import {getCourseWithProgress} from '../services/operations/createCourseAPI'
import {addToCompletedLectures , setTotalNumberOfLectures , setCompletedLectures ,setCourseEntireData , setCourseSectionData , setTotalLectures} from '../slices/viewCourseSlice'
import CourseProgressBar from "../components/Dashboard/ViewCourse/CourseProgressBar";
// import {getCourseWithProgress} from "../services/operations/createCourseAPI"

function DashboardEnrolledCourses()
{
    const {user_id} = useParams();
    const [enrolledCourses , setEnrolledCourses] = useState([]);
    const[user , setUserDetails] = useState();
    const token = useSelector((state)=>state.auth.token);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const ans = useSelector((state)=>state.viewCourse.totalNumberOfLectures);


    async function viewCourseHandler(courseId)
    {
      console.log("Course Clicked " , courseId);
      const response = await getCourseWithProgress(courseId , token , dispatch , navigate);
      console.log("response = " , response);

      const courseDetails = response?.data?.body;
      dispatch(setCompletedLectures(response?.data?.courseProgress));
      dispatch(setCourseEntireData(response?.data?.body));
      dispatch(setCourseSectionData(response?.data?.body?.courseContent));

      let lectures = [];

        let totalNumberOfLectures = 0;
        response?.data?.body?.courseContent.forEach((el)=>{
        totalNumberOfLectures = totalNumberOfLectures + el.subSection.length;
        
        el.subSection.map((sub , index)=>{
          lectures.push(sub);
        })
      });
      
      console.log("total lectures" , lectures);
      dispatch(setTotalNumberOfLectures(totalNumberOfLectures));
      dispatch(setTotalLectures(lectures));

      navigate(`/dashboard/viewCourse/${courseDetails._id}
                          /section/${courseDetails?.courseContent[0]._id}
                          /subSection/${courseDetails?.courseContent[0].subSection[0]._id}`);
      // console.log("toallec = " ,ans );
    }

    async function getUserDetails()
    {
        const response = await axios(
            {
             method:"GET",
             url:'http://localhost:4000/api/v1/profile/getUserDetails',
             headers:{
                 Authorisation: `Bearer ${token}`,
             }
            }
         );
 
         console.log("Response = " , response);
         setUserDetails(response?.data?.body);
         setEnrolledCourses(response?.data?.body?.courses);
    }

    useEffect(()=>{
      getUserDetails();
    },[])

    console.log("enrolled courses = " , enrolledCourses);
    return(
        <div>
            <div className="flex flex-row">

                
                {/* Side bar */}
                <div className=" bg-richblack-700   min-h-[100vh]">
                    <Sidebar></Sidebar>
                </div>

                <div className="max-w-[800px] w-[80%] mx-auto ">
                    {
                        (enrolledCourses.length == 0)?
                        (
                          <div className="w-[100%] h-[90vh] flex justify-center items-center">
                            <div className="flex flex-col gap-y-4 items-center">
                                <div className="text-white text-3xl">You are not enrolled in any course</div>
                                <div onClick={()=>{navigate('/category/web-development')}} className="bg-yellow-50 cursor-pointer w-fit rounded-lg px-4 py-2 text-black hover:scale-95 transition-all duration-150">Browse Courses</div>
                            </div>
                          </div>   
                        ):
                        (
                        <div>

                            <div className="text-white text-2xl text-center my-4">Enrolled Courses</div>
                            <div className="flex flex-col gap-y-4">
                  {enrolledCourses.map((course, index) => {
                    // const resp = await getCourseWithProgress(course._id , token , dispatch , navigate);
                    // console.log("Course rogress = " , resp?.data);
                    return (
                      <div
                      onClick={()=>{viewCourseHandler(course._id)}}
                        key={course._id}
                        className="flex flex-row gap-x-2 p-4 justify-between items-centers border-b-[1px] border-richblack-200"
                      >
                        <div className="flex flex-row gap-x-4 ">
                          <div className="hidden sm:flex">
                            <img
                              className="w-[200px]"
                              src={`${course.thumbnail}`}
                            ></img>
                          </div>

                          <div className="flex flex-col max-w-[200px] justify-between ">
                            <div className="text-white font-semibold text-2xl">
                              {course.name}
                            </div>
                            <div className="text-richblack-400">
                              {course.description}
                            </div>

                            <div className="flex flex-row items-center gap-x-2">
                              <div className="text-yellow-100">
                                {GetAvgRating(course.ratingAndReviews)}
                              </div>
                              <div>
                                <RatingStars
                                  Review_Count={GetAvgRating(
                                    course.ratingAndReviews
                                  )}
                                ></RatingStars>
                              </div>
                              {/* <div className="text-white">({course.ratingAndReviews.length} Reviews)</div> */}
                              {/* <div className="text-white">{course.studentsEnrolled.length} Students Enrolled</div> */}
                            </div>
                          </div>
                        </div>

                        <div>
                          <CourseProgressBar courseId={course._id}></CourseProgressBar>
                        </div>

                      
                      </div>
                    );
                  })}
                </div>
                        </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default DashboardEnrolledCourses;