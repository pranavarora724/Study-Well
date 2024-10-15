import { BsEvFront } from "react-icons/bs";
import Sidebar from "../components/Dashboard/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { MdDeleteForever } from "react-icons/md";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { MdEdit } from "react-icons/md";

import { addToCart, removeFromCart, resetCart } from "../slices/cartSlice";
import RatingStars from "../components/common/RatingStars";
import GetAvgRating from "../utils/avgRating";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { verifyParment } from "../services/operations/paymentsAPI";


function DashboardCart() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

  const token = useSelector((state)=>state.auth.token);
  const user = useSelector((state)=>state.profile.user);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartPrice = useSelector((state) => state.cart.cartPrice);
  const cartItemsId = useSelector((state)=> state.cart.cartItemsId);
  const cartItemsLength = useSelector((state) => state.cart.cartItemsLength);

  console.log("CartItems = ", cartItems);

  function removeHandler(course)
  {
    dispatch(removeFromCart(course));
  }

  async function buyNowHandler()
  {
    console.log("Course Ids = " , cartItemsId);

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
                courses:cartItemsId
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

            verifyParment(response.razorpay_payment_id , response.razorpay_order_id , response.razorpay_signature , cartItemsId , user , token , navigate , dispatch);
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

  return (
    <div>
      <div className="flex flex-row">
        {/* Side bar */}
        <div className=" bg-richblack-700   min-h-[100vh]">
          <Sidebar></Sidebar>
        </div>

        <div className="max-w-[800px] w-[80%] mx-auto  ">
          {cartItems.length == 0 ? (
            <div className="w-[100%] flex justify-center items-center h-[90vh]">
               <div className="flex flex-col gap-y-2 items-center">
               <div className="text-white text-3xl">No items added to cart</div>
               <div onClick={()=>{navigate('/category/web-development')}} className="bg-yellow-50 w-fit cursor-pointer px-4 py-2 rounded-lg text-black hover:scale-95 transition-all duration-150">Browse Courses</div>
               </div>
            </div>
          ) : (
            <div>
              <div className="text-white text-3xl">Cart</div>
              <div className="text-richblack-200 mt-10 border-b-[1px] border-richblack-200 text-lg font-semibold">
                {cartItemsLength} Items in cart
              </div>
              <div className="flex flex-col min-[600px]:flex-row  gap-x-4 mt-2">
                <div className="flex flex-col gap-y-4 min-[600px]:w-[70%]">
                  {cartItems.map((course, index) => {
                    return (
                      <div
                        key={course._id}
                        className="flex flex-row gap-x-2 p-4 justify-between border-b-[1px] border-richblack-200"
                      >
                        <div className="flex flex-row gap-x-4 ">
                          <div>
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
                            <div className="text-pink-300 font-semibold hover:scale-95 transition-all duration-150 flex flex-row gap-x-2 bg-richblack-700 p-2 rounded-lg items-center">
                            <div onClick={()=>{removeHandler(course)}}>Remove</div>
                            <MdDelete />

                            </div>

                            <div className="text-yellow-50 text-3xl mt-2">
                            ₹ {course.price}
                            </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="w-[25%] h-fit text-white bg-richblack-600 p-4 rounded-lg">
                  <div>Total</div>
                  <div className="text-yellow-25 text-3xl">₹ {cartPrice}</div>
                  <div onClick={()=>{buyNowHandler()}} className="bg-yellow-50 cursor-pointer px-4 py-2 text-black rounded-lg hover:scale-95 transition-all duration-150 mt-3">
                    Buy Now
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardCart;
