import { useSelector } from 'react-redux';
import { setToken } from '../../slices/authSlice';
import { resetCart } from '../../slices/cartSlice';
import { setProfile } from '../../slices/profileSlice';
import { apiConnector } from '../apiConnector'
import { paymentEndpoints } from '../apis'
import toast from 'react-hot-toast'
import {removeFromCart} from '../../slices/cartSlice'

export async function getRazorpayKey(token , navigate,dispatch)
{
    const toastId = toast.loading('Loading...');

    try {

        const response = await apiConnector("GET", `${paymentEndpoints.GET_API_KEY}`,
            // Bodydata
            {},
            // Headers
            {
                Authorisation: `Bearer ${token}`,
            }
        )

        console.log("Printing Api key Response");
        console.log(response);

        if (response?.data?.success == false)
            throw new Error(response?.data?.message);

        toast.remove(toastId);
        return response;
        
    } catch (error) {

        if(error?.response?.data?.message?.message)
            {
                toast.error(error?.response?.data?.message?.message)
                dispatch(setToken(null));
                dispatch(setProfile(null));
                dispatch(resetCart());
            
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                navigate('/')
            }
                
            else
            {
                console.log(error?.response?.data?.message);
            toast.error(error?.response?.data?.message);
            }if(error?.response?.data?.message?.message)
                {
                    toast.error(error?.response?.data?.message?.message)
                    dispatch(setToken(null));
                    dispatch(setProfile(null));
                    dispatch(resetCart());
                
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    navigate('/')
                }
                    
                else
                {
                    console.log(error?.response?.data?.message);
                toast.error(error?.response?.data?.message);
                }
        
    }

    toast.remove(toastId);
}

export async function verifyParment(payment_id , order_id , signature , courses ,user  , token , navigate , dispatch)
{
    const toastId = toast.loading('Enrolling...');

    try {
        
        const response = await apiConnector("POST", `${paymentEndpoints.VERIFY_SIGNATURE}`,
            // Bodydata
            {
                razorpay_payment_id:payment_id,
                razorpay_order_id:order_id,
                razorpay_signature:signature,
                courses:courses
            },
            // Headers
            {
                Authorisation: `Bearer ${token}`,
            }
        )

        console.log("Printing Api key Response");
        console.log(response);

        if (response?.data?.success == false)
            throw new Error(response?.data?.message);

        for(let i=0;i<courses.length;i++)
        {
            dispatch(removeFromCart(courses[i]))
        }
        
        navigate(`/dashboard/enrolledCourses/${user?._id}`);


    } catch (error) {
        
        if(error?.response?.data?.message?.message)
            {
                toast.error(error?.response?.data?.message?.message)
                dispatch(setToken(null));
                dispatch(setProfile(null));
                dispatch(resetCart());
            
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                navigate('/')
            }
                
            else
            {
                console.log(error?.response?.data?.message);
            toast.error(error?.response?.data?.message);
            }if(error?.response?.data?.message?.message)
                {
                    toast.error(error?.response?.data?.message?.message)
                    dispatch(setToken(null));
                    dispatch(setProfile(null));
                    dispatch(resetCart());
                
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    navigate('/')
                }
                    
                else
                {
                    console.log(error?.response?.data?.message);
                toast.error(error?.response?.data?.message);
                }


    }

    toast.remove(toastId);
}

