import {authEndpoints} from '../apis'
import { useState } from 'react'
// import { useDispatch } from 'react-redux'
import {apiConnector} from '../apiConnector'
import {setLoading , setSignupData , setToken} from '../../slices/authSlice'
import {resetCart} from '../../slices/cartSlice'
import {setProfile} from '../../slices/profileSlice'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
// import { useNavigate } from 'react-router-dom'




export async function sendOTP(email , navigate , dispatch)
{
    // const dispatch = useDispatch();
    dispatch(setLoading(true));
    const toastId = toast.loading('Loading...');

    try {

        const response =await apiConnector("POST" , `${authEndpoints.SENDOTP_API}` , {
            email:email
        });

        console.log("Printing SEND OTP Response");
        console.log(response);

        if(response?.data?.success == false)
            throw new Error(response?.data?.message);

        toast.success('OTP Sent Successfully');
        navigate('/verifyEmail');
        
    } catch (error) {
        console.log("Error in sending OTP");
        console.log(error.response.data.message);
        console.log(error.response.data.message);
        toast.error(error.response.data.message);
    }

    dispatch(setLoading(false));
    toast.remove(toastId);
}


export async function signUp(
    accountType,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    otp,
    navigate,
    dispatch
)
{
    // const dispatch = useDispatch();
    dispatch(setLoading(true));
    const toastId = toast.loading('Loading...');
    
    try {

        console.log("Account type = " , accountType);

        const response = await apiConnector("POST" ,authEndpoints.SIGNUP_API , {
            firstName:firstName,
            lastName:lastName , 
            email:email , 
            password:password,
            confirmPassword:confirmPassword,
            accountType:accountType,
            otp:otp
        } )

        console.log("Printing Signup Response");
        console.log(response);
        console.log(response?.data?.success);

        if(response?.data?.success==false)
            throw new Error(response?.data?.message);

        toast.success("Signup Successfull");
        navigate('/login');
        
    } catch (error) {

        console.log(error);
        console.log(error.response.data.message);
        toast.error(error.response.data.message);     
    }

    dispatch(setLoading(false));
    toast.remove(toastId);
}

export async function resetPasswordLink(email , navigate , dispatch)
{
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {

        const response = await apiConnector("POST" , `${authEndpoints.RESET_PASSWORD_GENERATE_TOKEN_API}` , {
            email:email
        });

        console.log("Printing Reset Password Link API Response");
        console.log(response);

        if(response?.data?.success == false)
            throw new Error(response?.data?.message);

        toast.success('Reset Password URL sent to email');

    } catch (error) {
        console.log(error.response.data.message);
        toast.error(error.response.data.message);
    }

    dispatch(setLoading(false));
    toast.remove(toastId);
}

export async function ResetPassword(password , confirmPassword , token , navigate , dispatch)
{

    const toastId = toast.loading('Loading...');
    dispatch(setLoading(true))
    try {

        const response = await apiConnector("POST" , `${authEndpoints.RESET_PASSWORD_API}` , {
            password:password,
            confirmPassword:confirmPassword,
            token:token
        })

        console.log('Printing Reset Password API Response' , response);

        if(response?.data?.success == false)
            throw new Error(response?.data?.message);

        toast.success('Reset Password Successfull');
        navigate('/login')

    } catch (error) {
        console.log(error.response.data.message);
        toast.error(error.response.data.message);
    }

    dispatch(setLoading(false));
    toast.remove(toastId);
}

export async function Login(email , password , navigate , dispatch)
{
    const toastId = toast.loading('Loading...')
    dispatch(setLoading(true));

    try {
        
        const response = await apiConnector("POST" , `${authEndpoints.LOGIN_API}` , {
            email:email,
            password:password
        });

        if(response?.data?.success == false)
            throw new Error(response?.data?.message);

        console.log("Printing logi API result");
        console.log(response);

        // USer to be saved
        const savedUser = {
            ...response?.data?.user,
            password:null,
            confirmPassword:null
        }
        console.log(savedUser);
 
        // Setting token , User in slice
        dispatch(setToken(response?.data?.token));
        dispatch(setProfile(savedUser));
    

        // Setting Token , User in Local Store for State Management
        console.log("Setting value in Local Storage");
        localStorage.setItem("token" , JSON.stringify((response?.data?.token)));
        localStorage.setItem("user" , JSON.stringify(savedUser));
        toast.success('Login Successful');

        // Navigate to /dashboard
        console.log('Navigating to dashboard');
        navigate('/dashboard/my-profile');
    } catch (error) {
        
        console.log(error.response.data.message);
        toast.error(error.response.data.message);
       
    }
    
    dispatch(setLoading(false));
    toast.remove(toastId);
}

export async function Logout(navigate , dispatch)
{
    dispatch(setLoading(true));
    const toastId = toast.loading('Loading ...');

    dispatch(setToken(null));
    dispatch(setProfile(null));
    dispatch(resetCart());

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast.success("Logged Out");
    navigate('/');

    dispatch(setLoading(false));
    toast.remove(toastId);
}
