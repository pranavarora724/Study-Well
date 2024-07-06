import { useState } from 'react';
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import {ResetPassword} from '../../services/operations/authAPI'
import { useDispatch } from 'react-redux';


function ResetPasswordForm(props)
{

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Form Data 
const [formData,setFormData] = useState(
    {
        newPassword:"",
        confirmNewPassword:""
    }
);

function changeHandler(event){
    const {name,value}= event.target;
    
    setFormData(prev=>{
        return{
            ...prev,
            [name]:(value)
        }
    })
}

const [showPassword1, setShowPassword1] = useState(false);

// Show Password Button Handler
function changeShowPassword1() {
    if (showPassword1 == false)
        setShowPassword1(true);

    else
        setShowPassword1(false);
}
// Show Password Button
const [showPassword2, setShowPassword2] = useState(false);

// Show Password Button Handler
function changeShowPassword2() {
    if (showPassword2 == false)
        setShowPassword2(true);

    else
        setShowPassword2(false);
}



// subitHandler
function submitHandler(event) {
    event.preventDefault();
    console.log("FormData");
    console.log(formData);

    ResetPassword(formData.newPassword , formData.confirmNewPassword , props.token , navigate , dispatch);

    // props.setIsLogin(true);
    // navigate("/");
}




    return(
        <div className=' mt-6'>

        <form onSubmit={submitHandler}>

          

        <div className='w-[100%]'>
                <div className='flex flex-row gap-x-1 w-[100%]'>
                        <span className='text-richblack-200 text-sm'> New Password</span> 
                        <span className='text-pink-200 text-sm'>*</span> 
                        </div>
                    <input
                        placeholder='Enter New Password'
                        className='bg-richblack-800 text-white mt-2 py-2 rounded-md pl-2 border-none outline-none w-[100%]'
                        name="newPassword"
                        type={`${(showPassword1 == true) ? "text" : "password"}`}
                        value={formData.newPassword}
                        onChange={changeHandler}
                        required
                    ></input>
                    <div className='show_pass_btn' onClick={changeShowPassword1}>
                        {
                            (showPassword1) ? (<IoEye size={25} fill='white' />) : (<IoMdEyeOff size={25} fill='white' />)
                        }
                    </div>
                </div>

                <div className='w-[100%] mt-2'>
                <div className='flex flex-row gap-x-1 w-[100%]'>
                        <span className='text-richblack-200 text-sm'>Confirm New Password</span> 
                        <span className='text-pink-200 text-sm'>*</span> 
                        </div>
                    <input
                        placeholder='Confirm New Password'
                        className='bg-richblack-800 text-white mt-2 py-2 rounded-md pl-2 border-none outline-none w-[100%]'
                        name="confirmNewPassword"
                        type={`${(showPassword2 == true) ? "text" : "password"}`}
                        value={formData.confirmNewPassword}
                        onChange={changeHandler}
                        required
                    ></input>
                    <div className='show_pass_btn' onClick={changeShowPassword2}>
                        {
                            (showPassword2) ? (<IoEye size={25} fill='white' />) : (<IoMdEyeOff size={25} fill='white' />)
                        }
                    </div>
                </div>

            <div>
                <button className='w-[100%] text-center mt-4 py-2 rounded bg-yellow-50 text-black font-semibold' type='submit'>Reset Password</button>
            </div>
        </form>
           
    </div>
    )
}


export default ResetPasswordForm;