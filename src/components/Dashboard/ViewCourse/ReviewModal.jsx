import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { Rating } from 'react-simple-star-rating'
import StarRatings from "react-star-ratings";
import {createReview} from '../../../services/operations/ratingAndReview'
import { useNavigate } from "react-router-dom";


function ReviewModal({setShowReviewModal})
{

  const user = useSelector((state)=>state.profile.user);
  const token = useSelector((state)=>state.auth.token);
  const courseEntireData = useSelector((state)=>state.viewCourse.courseEntireData);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [rating, setRating] = useState(0)

  // const changeRating = (rate) => {
  //   setRating(rate)

  //   // other logic
  // }
  const [rating, setRating] = useState(0);

  const handleClick = (value) => {
    setRating(value);
  };
    const [experience, setExperience] = useState('');
  
    const handleChange = (e) => {
      setExperience(e.target.value);
    };

    function cancelHandler()
    {
      setRating(0);
      setExperience('');
      setShowReviewModal(false);
    }


    async function submitHandler()
    {
      console.log("Review submitted");
      console.log("Rating == " , rating);
      console.log("Review -- " , experience);

      const response = await createReview(user._id , courseEntireData._id , rating , experience , token , dispatch , navigate);
      cancelHandler();
    }

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="w-11/12 max-w-[500px] rounded-lg border border-richblack-400 bg-richblack-800  pt-0">
      
      <div className="flex flex-row justify-between items-center bg-richblack-600 p-4">
        
        <div className="text-white text-xl dont-semibold">Add Review</div>
        <div onClick={()=>{cancelHandler()}} className="text-richblack-100 font-semibold cursor-pointer"><RxCross2 /></div>

      </div>

      <div className="flex  flex-col justify-center items-center w-full mt-4">
        
        <div className="flex flex-row gap-x-2 items-center">
          <div>
            <img className="h-[70px] w-[70px] object-cover rounded-full" src={user.imageUrl}></img>
          </div>

          <div className="text-white">
            <div className="text-lg font-semibold">{user.firstName} {user.lastName}</div>
            <div className="text-sm text-richblack-100">Posting Publicly</div>
          </div>
          
        </div>

        <div className="w-[80%] mt-6">

       <div className="w-[100%] flex justify-center mb-2">
       <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          onClick={() => handleClick(star)}
          className={`w-8 h-8 cursor-pointer transition duration-200 ${
            star <= rating ? 'text-yellow-100' : 'text-richblack-600'
          }`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.9 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" />
        </svg>
      ))}
      {/* <span className="ml-2 text-gray-700">{rating} / 5</span> */}
    </div>
       </div>

          {/* FORM */}
        <div>
      <label className="text-white text-sm" htmlFor="experience">Add Your Experience:<sup className="text-pink-200 font-semibold">*</sup></label>
      <textarea
        id="experience"
        value={experience}
        onChange={handleChange}
        className="rounded-lg bg-richblack-700 mt-2 p-1 text-white"
        placeholder="Enter your experience"
        rows={5} // You can adjust the number of rows
        cols={50} // You can adjust the number of columns
        style={{ width: '100%', resize: 'vertical' }} // Optional styling
      />
    </div>

    <div className="mt-4 w-[100%] flex flex-row justify-between  mb-4">
      <div className="w-[1px] h-[1px]"></div>
      <div className="flex flex-row gap-x-2 items-center">
        <div onClick={()=>{cancelHandler()}} className="bg-richblack-500 rounded-lg text-black p-1 px-4 hover:scale-90 transition-all duration-150 cursor-pointer">Cancel</div>
        <button onClick={()=>{submitHandler()}}  disabled={(rating == 0 || experience=='')?(true):(false)} className={` 
          ${((rating == 0 || experience=='')?('cursor-not-allowed'):('cursor-pointer'))}
          bg-yellow-50 rounded-lg text-black p-1 px-4 hover:scale-90 transition-all duration-150`}>Save</button>
      </div>
    </div>

        </div>

        {/* <StarRatings
          rating={rating}
          starRatedColor="blue"
          changeRating={this.changeRating}
          numberOfStars={5}
          name='rating'
        /> */}

            </div>

      <div>

      </div>
      </div>
    </div>
  );
}

export default ReviewModal;
