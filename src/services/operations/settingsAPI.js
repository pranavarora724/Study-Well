import { settingsAPI } from '../apis'
import { useState } from 'react'
// import { useDispatch } from 'react-redux'
import { apiConnector } from '../apiConnector'
import { setLoading, setSignupData, setToken } from '../../slices/authSlice'
import { resetCart } from '../../slices/cartSlice'
import { setProfile } from '../../slices/profileSlice'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'

export async function updateProfilePic(profilePic, token , dispatch , navigate) {
    const toastId = toast.loading('Loading...');

    try {

        const response = await apiConnector("PUT", `${settingsAPI.UPDATE_PROFILE_PIC}`,
            // Bodydata
            {
                profilePic: profilePic,
            },
            // Headers
            {
                "Content-Type": "multipart/form-data",
                Authorisation: `Bearer ${token}`,
            }
        )

        console.log("Printing Update Profile Pic Response");
        console.log(response);

        if (response?.data?.success == false)
            throw new Error(response?.data?.message);

        toast.success('Profile Pic Updated Successfully');

        // Update profile Slice
        dispatch(setProfile(response?.data?.body));

        // Update Values in Loical Storage
        localStorage.setItem("user" , JSON.stringify(response?.data?.body));

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
            }
    }

    toast.remove(toastId);
}

export async function updatePAsswordFunction(
    currentPassword,
    newPassword,
    token,
    navigate,
    dispatch
)
{
    const toastId = toast.loading('Loading');

    try {

        const response = await apiConnector( "POST" , `${settingsAPI.UPDATE_PASSWORD}` , 
            // BodyData
            {
                oldPassword:currentPassword,
                newPassword:newPassword
            },
             // Headers
             {
                Authorisation: `Bearer ${token}`,
             }
        );

        console.log("Printing change Password Response = ",  response);
        toast.success(response?.data?.message);
        
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
            }
    }

    toast.remove(toastId);
}

export async function updateProfileDetails(
    gender,
    dob,
    about,
    contactNumber,
    firstName,
    secondName,
    token,
    dispatch,
    navigate
)
{
    const toastId = toast.loading('Loading');

    try {

        const response = await apiConnector("PUT" , `${settingsAPI.UPDATE_PROFILE_DETAILS}` , 
            // bodyData,
            {
                gender:gender,
                dob:dob,
                about:about,
                contactNumber:contactNumber,
                firstName:firstName,
                lastName:secondName             
            },
            // Headers
            {
                Authorisation: `Bearer ${token}`,
            }
        )

        console.log(response);
        toast.success(response?.data?.message);

        // Updating User In Slice and Local Storage
        dispatch(setProfile(response?.data?.user));
        localStorage.setItem("user" , JSON.stringify(response?.data?.user));
        
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
            }   
    }

    toast.remove(toastId);
}