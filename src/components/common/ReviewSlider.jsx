import React, { useEffect, useState } from "react"
// import ReactStars from "react-rating-stars-component"

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"

import { FaStar } from "react-icons/fa"
// Import required modules
// import { Autoplay, FreeMode, Pagination } from "swiper"
import {} from "swiper"
import {getAllRatings} from "../../services/operations/ratingAndReview"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import ReactStars from "react-stars"

function ReviewSlider()
{
    const[reviews , setReviews] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector((state)=>state.auth.token);

    async function getRatings()
    {
       const response = await getAllRatings(token, dispatch , navigate);
       console.log("response = " , response);
       setReviews(response?.data?.Reviews);
    }

    useEffect(()=>{
        getRatings();
    } , [])
    const truncateWords = 15


    return(
        <div className="text-white">
        <div className="my-[50px] h-[184px] max-w-maxContentTab lg:max-w-maxContent">
          <Swiper
            slidesPerView={4}
            spaceBetween={25}
            loop={true}
            freeMode={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            // modules={[FreeMode, Pagination, Autoplay]}
            className="w-full"
          >
            {
                (reviews)?(
                    
                reviews.map((review, i) => {
              return (
                <SwiperSlide key={i}>
                  <div className="flex flex-col gap-3 bg-richblack-800 p-3 text-[14px] text-richblack-25">
                    <div className="flex items-center gap-4">
                      <img
                        src={
                          review?.userId?.imageUrl
                            ? review?.userId?.imageUrl
                            : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.userId?.firstName} ${review?.userId?.lastName}`
                        }
                        alt=""
                        className="h-9 w-9 rounded-full object-cover"
                      />
                      <div className="flex flex-col">
                        <h1 className="font-semibold text-richblack-5">{`${review?.userId?.firstName} ${review?.userId?.lastName}`}</h1>
                        <h2 className="text-[12px] font-medium text-richblack-500">
                          {review?.courseId?.name}
                        </h2>
                      </div>
                    </div>
                    <p className="font-medium text-richblack-25">
                      {review?.review.split(" ").length > truncateWords
                        ? `${review?.review
                            .split(" ")
                            .slice(0, truncateWords)
                            .join(" ")} ...`
                        : `${review?.review}`}
                    </p>
                    <div className="flex items-center gap-2 ">
                      <h3 className="font-semibold text-yellow-100">
                        {review.rating.toFixed(1)}
                      </h3>
                      <ReactStars
                        count={5}
                        value={review.rating}
                        size={20}
                        edit={false}
                        activeColor="#ffd700"
                        emptyIcon={<FaStar />}
                        fullIcon={<FaStar />}
                      />
                    </div>
                  </div>
                </SwiperSlide>
              )
            })
                ):(<></>)
            }
            {/* <SwiperSlide>Slide 1</SwiperSlide> */}
          </Swiper>
        </div>
      </div>
    )
}

export default ReviewSlider;
