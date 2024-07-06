import { useDebugValue, useState } from 'react';
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { NavLink, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import {apiConnector} from '../../services/apiConnector';
import {authEndpoints} from '../../services/apis'
import axios from 'axios';
import {Login} from '../../services/operations/authAPI';
import { useDispatch } from 'react-redux';

function LogInForm()
{
const navigate = useNavigate();
const dispatch = useDispatch();

    // Form Data 
const [formData,setFormData] = useState(
    {
        email:"",
        password:""
    }
);

// Show Password Button
const [showPassword , setShowPassword] = useState(false);

// Show Password Button Handler
function changeShowPassword(){
    if(showPassword==false)
    setShowPassword(true);

    else
    setShowPassword(false);
}

// Change Handler in forms
function changeHandler(event){
const {name,value}= event.target;

setFormData(prev=>{
    return{
        ...prev,
        [name]:(value)
    }
})

}

function forgotPasswordHandler()
{
    console.log("Forget Password");
}

// Submit Handler in forms
async function submitHandler(event){
event.preventDefault();
console.log("Printing Form data");
console.log("formData = " , formData);
// console.log("URL = " , authEndpoints.LOGIN_API);
// const API_url = authEndpoints.LOGIN_API;
Login(formData.email , formData.password , navigate , dispatch)
// props.setIsLogin(true);
// navigate("/");
}



    return(
        <div className='signup_form'>
        <h2 className='text-white font-semibold text-2xl'>Welocme Back</h2>
        <div className='mt-6 opacity-80 text-white'>Build Skills for Todday,Tommorow and beyond</div>
        <div className='opacity-80 text-white'>Education to future proof your career</div>

        <form onSubmit={submitHandler}>

            {/* Email */}
            <div className='fieldContainer mt-4'>
            <div className='flex flex-row gap-x-1'>
                        <span className='text-richblack-50 text-sm'>Email Address</span> 
                        <span className='text-pink-200 text-sm'>*</span> 
            </div>
            <input
            name="email"
            type='email'
            required
            className='bg-richblack-800 text-white mt-2 py-2 rounded-md px-2 border-none outline-none w-[100%] '
            placeholder='Enter email address'
            value={formData.email}
            onChange={changeHandler}
            ></input>
            </div>

            {/* Password */}
            <div className='fieldContainer password_field mt-4 relative'> 
            <div className='flex flex-row gap-x-1'>
                        <span className='text-richblack-50 text-sm'>Password</span> 
                        <span className='text-pink-200 text-sm'>*</span> 
            </div>
            <input
            name="password"
            className='bg-richblack-800 text-white mt-2 py-2 rounded-md px-2 border-none outline-none w-[100%] '
            placeholder='Enter Password'
            type={`${(showPassword==true)?"text":"password"}`}
            value={formData.password}
            required
            onChange={changeHandler}
            ></input>
            <div className='show_pass_btn' onClick={changeShowPassword}>
                {
                (showPassword)?(<IoEye size={25} fill='white'/>):(<IoMdEyeOff size={25} fill='white'/>)
                }
                </div>

               <NavLink to='/resetPasswordToken'>
                   <div onClick={forgotPasswordHandler} className='absolute right-2 text-md text-blue-100 bottom-1 cursor-pointer'>Forgot Password</div>
               </NavLink>
            </div>

            <div>
                <button className='w-[100%] text-center mt-4 py-2 rounded bg-yellow-50 text-black font-semibold' type='submit'>Log in</button>
            </div>
        </form>
           
    </div>
    )
}

export default LogInForm;