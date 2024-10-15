import { apiConnector } from '../apiConnector'
import toast from 'react-hot-toast'
// import {setCourse} from '../../slices/courseSlice'
import {categoryEndponts, createCourseAPI} from '../apis'
import { setStep , setCourseObject} from '../../slices/courseSlice'

import { setLoading, setSignupData, setToken } from '../../slices/authSlice'
import { resetCart } from '../../slices/cartSlice'
import { setProfile } from '../../slices/profileSlice'


export async function createReview(userId , courseId , rating , review , token , dispatch , navigate)
{
    const toastId = toast.loading('Loading...');

    try {

        const response = await apiConnector("POST" , `${createCourseAPI.CREATE_REVIEW}` , {
            userId:userId,
            courseId:courseId,
            rating:rating,
            review:review
        },
        {
            Authorisation: `Bearer ${token}`
        }
    )

    console.log("Printing Create review API Response");
        console.log(response);
        toast.remove(toastId);

        toast.remove(toastId);

        
        if (response?.data?.success == false)
            throw new Error(response?.data?.message);
        
        toast.success(response?.data?.message);
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
                console.log(error);
                console.log(error?.response?.data?.message);
            toast.error(error?.response?.data?.message);
            }

    }

    toast.remove(toastId);
}

export async function getAllRatingsOfACourse(courseId , dispatch , navigate)
{
    const toastId = toast.loading('Loading...');

    try {

        const response = await apiConnector("POST" , `${createCourseAPI.GET_REVIEWS_OF_COURSE}` , {
            courseId:courseId
        },
       
    );

    console.log("Printing Get reviews of a Course API Response");
        console.log(response);
        toast.remove(toastId);

        toast.remove(toastId);

        
        if (response?.data?.success == false)
            throw new Error(response?.data?.message);
        
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
                console.log(error);
                console.log(error?.response?.data?.message);
            toast.error(error?.response?.data?.message);
            }

    }

    toast.remove(toastId);
}

export async function getAverageRatingsOfACourse(courseId , token , dispatch , navigate)
{
    const toastId = toast.loading('Loading...');

    try {

        const response = await apiConnector("POST" , `${createCourseAPI.GET_AVEARGE_RATINGS}` , {
            courseId:courseId
        },
        {
            Authorisation: `Bearer ${token}`
        }
    );
    console.log("Printing Get AVG Rating of a Course API Response");
        console.log(response);
        toast.remove(toastId);

        toast.remove(toastId);

        
        if (response?.data?.success == false)
            throw new Error(response?.data?.message);
        
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
                console.log(error);
                console.log(error?.response?.data?.message);
            toast.error(error?.response?.data?.message);
            }

    }

    toast.remove(toastId);
}

export async function getAllRatings(token , dispatch , navigate)
{
    const toastId = toast.loading('Loading...');

    try {
        
        const response = await apiConnector("GET" , `${createCourseAPI.GET_ALL_REVIEWS}`,
            {},
            {
                // Authorisation: `Bearer ${token}`
            }
        )
        console.log("Printing Get all ratings API Response");
        console.log(response);
        toast.remove(toastId);

        toast.remove(toastId);

        
        if (response?.data?.success == false)
            throw new Error(response?.data?.message);
        
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
                console.log(error);
                console.log(error?.response?.data?.message);
            toast.error(error?.response?.data?.message);
            }

    }

    toast.remove(toastId);
}