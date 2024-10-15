import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoVideocamOutline } from "react-icons/io5";
import { MdLanguage } from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";

import { BiVideoRecording } from "react-icons/bi";
import { MdHighQuality } from "react-icons/md";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { GrSchedules } from "react-icons/gr";
import { IoMdTime } from "react-icons/io";
import { CiCalendarDate } from "react-icons/ci";
import { RiArrowDropDownFill } from "react-icons/ri";
import {getCourseDetails} from "../services/operations/createCourseAPI"
import { useDispatch, useSelector } from "react-redux";
import GetAvgRating from "../utils/avgRating";
import RatingStars from "../components/common/RatingStars";
import { FaAngleDown } from "react-icons/fa";
import axios from "axios";
// import {} from 'razorpay'
import { verifyParment } from "../services/operations/paymentsAPI";
import {addToCart , removeFromCart , resetCart} from '../slices/cartSlice'
import CourseReviewStars from "../components/Dashboard/ViewCourse/CourseReviewStars";



function DashboardCourseDetails()
{

    // const [courseDetails , setCourseDetails] = useState({});
    const token = useSelector((state)=>state.auth.token)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const courseDetails = JSON.parse(localStorage.getItem('courseDetails'));
    const user = useSelector((state) => state.profile.user);
    const[avgRating , setAvgRating] = useState(0);


    console.log("USER id + " , user?._id);
    console.log("students enroled" , courseDetails?.studentsEnrolled[0]);
    console.log("course details = " , typeof(courseDetails[0]));


    useEffect(()=>{

        setAvgRating(GetAvgRating(courseDetails.ratingAndReviews));
        
    } , [] )


    async function handleBuyCourse(course)
    {
       if(courseDetails?.studentsEnrolled.includes(user._id) == false)
       {
        console.log("Course price = " + [course._id]);

        const apiKeyResult = await axios(
            {
                method:'get',
                url:'http://localhost:4000/api/v1/payment/getApiKey',
                headers:{
                       Authorisation: `Bearer ${token}`
                }
            },
        
        );
        console.log("API KEY RESuLT"  ,apiKeyResult);
        console.log("KEY = " , apiKeyResult?.data?.key);

        const resultOrder = await axios(
            {
                method:'post',
                url:'http://localhost:4000/api/v1/payment/capturePayment',
                data:{
                    courses:[course._id]
                },
                params:{},
                headers:{
                    Authorisation: `Bearer ${token}`
                }
            }
        )
        console.log(resultOrder);
        const order = resultOrder?.data?.body;


        var options = {
            "key": `${apiKeyResult?.data?.key}`, // Enter the Key ID generated from the Dashboard
            "amount": `${order?.amount}`, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "StudyNotion",
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": `${order?.id}`, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            // "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
            handler:function(response){
                console.log("Responose = " , response);

                verifyParment(response.razorpay_payment_id , response.razorpay_order_id , response.razorpay_signature , [course._id] , user , token , navigate , dispatch);
            },
            "prefill": {
                "name": `${user?.firstName} ${user?.lastName}`,
                "email": `${user?.email}`,
                "contact": "9000090000"
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        var rzp1 = new window.Razorpay(options);
        rzp1.open();

       }
       else
       {
          navigate(`/dashboard/enrolledCourses/${user._id}`);
       }

    }

    function addToCartHandler(course)
    {
        console.log('add');
        dispatch(addToCart(course));
        // addToCart(course); 
    }

    console.log(window.Razorpay);

    return(
        <div className="bg-richblack-900">

              {/* First PART */}
              <div className=" bg-richblack-700 py-8">
                      <div className="max-w-[1080px] w-[90%] mx-auto flex md:flex-row flex-col items-center ">
                               {/*Left Part  */}
                               <div className="flex flex-col md:w-[70%]">
                    <div className="text-3xl font-semibold text-white">{courseDetails?.name}</div>
                   
                   <div className="mt-4 flex flex-row gap-x-4 font-semibold">
                   <div className="flex flex-row gap-x-4 text-caribbeangreen-200 justify-center items-center">
                        <div className="flex flex-row gap-x-2 items-center">
                        <IoVideocamOutline />
                        <div>{courseDetails?.courseContent.length} + Chapters</div>
                        </div>
                    </div>

                   

                    <div className="flex flex-row gap-x-4 text-blue-200 justify-center items-center">
                        <div className="flex flex-row gap-x-2 items-center">
                        <MdLanguage />
                        <div> Hinglish</div>
                        </div>
                    </div>

                    <div className="flex flex-row gap-x-4 text-brown-100 justify-center items-center">
                        <div className="flex flex-row gap-x-2 items-center">
                        <CiCalendarDate />
                        <div>1 Year Validity</div>
                        </div>
                    </div>
                   </div>

                   <div className="mt-3">
                   {/* <div className="flex flex-row items-center gap-x-2">
                        <div className="text-yellow-100">{avgRating}</div>
                        <div><RatingStars Review_Count={avgRating}></RatingStars></div>
                        <div className="text-white">({courseDetails.ratingAndReviews.length} Reviews)</div>
                        <div className="text-white">{courseDetails.studentsEnrolled.length} Students Enrolled</div>
                    </div> */}
                    <CourseReviewStars courseId={courseDetails._id}></CourseReviewStars>
                   </div>

                   <div className="text-white mt-3 font-light">Created By <span className="font-semibold">{courseDetails?.instructor?.firstName} {courseDetails?.instructor?.lastName}</span></div>
                   

                   <div className="flex flex-row gap-x-2 mt-2">
                    {/* {
                        courseDetails?.tag.map((element , index)=>{
                            return(
                                <div className="bg-yellow-100 p-2 px-4 rounded-full text-black">{element}</div>
                            )
                        })
                    } */}
                   </div>
                    
                </div>
                
                {/* Right part */}
                <div className="flex flex-col gap-y-4 w-[300px] md:w-[30%]">
                    <div className="flex  md:w-[100%] justify-center items-center">
                        <img className=" w-[90%] md:w-[90%]  h-[220px] object-cover rounded-lg" src={`${courseDetails?.thumbnail}`}></img>
                    </div>
                    <div className="flex gap-x-2 items-center justify-center font-bold text-2xl md:w-[85%] mx-auto  text-white">
                    <FaRupeeSign />
                    <div>{courseDetails?.price}</div>
                    </div>

                    {
                        (user!=null && user.accountType!="Instructor")?(
                            <div className="md:w-[85%] mx-auto flex flex-col gap-y-2">
                        <div onClick={()=>{handleBuyCourse(courseDetails)}} className=" bg-yellow-100 text-center md:w-[100%] text-blue-500 cursor-pointer hover:scale-95 transition-all duration-150 rounded-lg font-semibold py-1">
                        {
                            (courseDetails?.studentsEnrolled.includes(user._id))?
                            (<span>Go to Course</span>):
                            (<span>Buy Course</span>)
                        }
                        </div>
                        {
                            (courseDetails?.studentsEnrolled.includes(user._id))?
                            (<></>):
                            (<div onClick={()=>{addToCartHandler(courseDetails)}} className="bg-richblack-800 text-center md:w-[100%] text-white cursor-pointer hover:scale-95 transition-all duration-150 rounded-lg font-semibold py-1">
                                Add to Cart</div>)
                        }
                        </div>
                        ):(<></>)
                    }

                    {
                        (user == null)?
                        (<div className="md:w-[85%] mx-auto flex flex-col gap-y-2">
                            <div onClick={()=>{navigate('/login')}} className=" bg-yellow-100 text-center md:w-[100%] text-blue-500 cursor-pointer hover:scale-95 transition-all duration-150 rounded-lg font-semibold py-1">
                                Buy Now</div>
                            <div onClick={()=>{navigate('/login')}} className="bg-richblack-800 text-center md:w-[100%] text-white cursor-pointer hover:scale-95 transition-all duration-150 rounded-lg font-semibold py-1">
                                Add to Cart</div>
                        </div>):
                        (<></>)
                    }
                </div>
                      </div>
             </div>


            <div className="max-w-[1080px] mx-auto w-[90%] ">

        
             {/* 2nd part */}
             <div className="mt-5 w-[90%] mx-auto md:mx-0 md:w-[70%] border p-4 border-white">
                <div className="text-2xl font-semibold text-white">What you'll Learn</div>

                <div className="mt-4 text-white">{courseDetails?.whatWillYouLearn                }</div>
             </div>

             <div className="mt-5 mx-auto md:mx-0 text-white w-[90%] md:w-[70%] p-4">
                <div className="text-2xl">Course Content</div>
                <div>{courseDetails?.courseContent.length} sections</div>
                <div className="bg-richblack-700 mt-4">
                    {
                        courseDetails?.courseContent.map((el , index)=>{
                            return(
                                <div className="flex flex-row justify-between border-b p-2 px-4 border-white">
                                    <div className="flex gap-x-1 items-center">
                                    <FaAngleDown />
                                    <div>{el?.sectionName}</div>
                                    </div>

                                    <div className="text-yellow-100">
                                        {el?.subSection.length} Lecture(s)
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
             </div>

             {/* 3rd PART */}
             <div className="flex mt-6 flex-row gap-x-4">

                {/* Left part */}
                {/* <div className="bg-richblack-600 flex flex-col gap-y-2">

                    <div className="flex flex-row gap-x-4">

                        <div className="flex gap-x-1 items-center">
                            <div className="flex p-1 rouded-full bg-richblack-400 text-blue-300 font-semibold">
                            <BiVideoRecording />
                            </div>
                            <div className="text-white">Recordings + LIVE Lectures</div>
                        </div>

                        <div className="flex gap-x-1 items-center">
                            <div className="flex p-1 rouded-full bg-richblack-400 text-blue-300 font-semibold">
                            <MdHighQuality />

                            </div>
                            <div className="text-white">HD Quality</div>
                        </div>
                        
                    </div>

                    <div className="flex flex-row gap-x-4">

                        <div className="flex gap-x-1 items-center">
                            <div className="flex p-1 rouded-full bg-richblack-400 text-blue-300 font-semibold">
                            <LiaChalkboardTeacherSolid />
                            </div>
                            <div className="text-white">Doubt Sessions</div>
                        </div>

                        <div className="flex gap-x-1 items-center">
                            <div className="flex p-1 rouded-full bg-richblack-400 text-blue-300 font-semibold">
                            <GrSchedules />
                            </div>
                            <div className="text-white">Schedule Monday Wednesday Friday</div>
                        </div>
                        
                    </div>

                    <div className="flex flex-row gap-x-4">

                        <div className="flex gap-x-1 items-center">
                            <div className="flex p-1 rouded-full bg-richblack-400 text-blue-300 font-semibold">
                            <IoMdTime />
                            </div>
                            <div className="text-white">Timings 8:30 - 11:30</div>
                        </div>

                        <div className="flex gap-x-1 items-center">
                            <div className="flex p-1 rouded-full bg-richblack-400 text-blue-300 font-semibold">
                            <CiCalendarDate />
                            </div>
                            <div className="text-white">Validity 1 year</div>
                        </div>
                        
                    </div>
                </div> */}

                {/* Right part */}
                {/* <div className="flex flex-col">
                    {
                    //     courseDetails?.courseContent.map((element , index)=>{
                    //         <div className="flex flex-row justify-between text-white">
                    //     <div>{element.sectionName}</div>
                    //     <div>
                    //     <RiArrowDropDownFill />
                    //     </div>
                    // </div>
                    //     })
                    }
                </div> */}
             </div>

            </div>

        </div>
    )
}

export default DashboardCourseDetails;