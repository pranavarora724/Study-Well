import { useState } from 'react';
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import {sendOTP} from '../../services/operations/authAPI';
import { useDispatch } from 'react-redux';
import {setSignupData} from '../../slices/authSlice'
import { useSelector } from 'react-redux';
// 

function SignUpForm()
{
    // const navigate = useNavigate();
    const signUpData = useSelector((state) => state.auth.signupData);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber:0,
        createPassword: "",
        confirmPassword: "",
        profile: "Student"
    })

    // Change Handler
    function changeHandler(event) {
        const { name, value, checked } = event.target;

        setFormData(prev => {
            return {
                ...prev,
                [name]: (value)
            }
        })
    }

    // Show Password Button
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

        dispatch(setSignupData(
            formData
        ));

        
        console.log("After setting signup data = " , signUpData);

        sendOTP(formData.email , navigate , dispatch);
        // props.setIsLogin(true);
        // navigate("/");
    }

    return(

        <div className='  max-w-[400px] w-[90%]'>
            <h2 className='text-white font-semibold text-2xl'>Join the millions learning to code with StudyNotion for free </h2>
            <div className='mt-6 opacity-80 text-white'>Build skills for today,tomorrow and beyond</div>
            <div className='opacity-80 text-white'>Education to future proof our career</div>


            <form onSubmit={submitHandler}>

                {/* Radio Buttons */}
                <div className='mt-6 py-1 flex flex-row justify-around items-center bg-richblack-800 w-[180px] rounded-full'>
                    <input className='hidden'
                        type='radio'
                        name='profile'
                        value='Student'
                        id='student'
                        checked={formData.profile == "Student"}

                        onChange={changeHandler}
                    ></input>

                    <label 
                        className={`text-white label
                        ${formData.profile == "Student" ? "text-richblack-200 font-semibold py-2 px-2 rounded-l-full rounded-r-full my-0 bg-richblack-900" : ""}`}
                        htmlFor='student'>
                        Student
                    </label>




                    <input className='hidden'
                        type='radio'
                        name='profile'
                        value='Teacher'
                        id='teacher'

                        checked={formData.profile == "Teacher"}
                        onChange={changeHandler}
                    ></input>

                    <label
                        className={`text-white label 
                        ${formData.profile == "Teacher" ? "text-richblack-200 font-semibold py-2 px-2 rounded-l-full rounded-r-full  bg-richblack-900" : ""}`}
                        htmlFor='teacher'>
                        Teacher
                    </label>

                </div>

                
                     {/* First and second name */}
               <div className='flex flex-row gap-x-4 mt-6'>
               <div className='fieldContainer'>
                    <div className='flex flex-row gap-x-1'>
                        <span className='text-richblack-50 text-sm'>First Name</span> 
                        <span className='text-pink-200 text-sm'>*</span> 
                        </div>
                    <input
                
                        placeholder='Enter first name'
                        className='bg-richblack-800 text-white mt-2 py-2 rounded-md pl-2 border-none outline-none'
                        name="firstName"
                        type='text'
                        required
                        value={formData.firstName}
                        onChange={changeHandler}
                    ></input>
                </div>

                <div className='fieldContainer'>
                <div className='flex flex-row gap-x-1'>
                        <span className='text-richblack-50 text-sm'>Last Name</span> 
                        <span className='text-pink-200 text-sm'>*</span> 
                </div>
                    <input
                        placeholder='Enter last name'
                        className='bg-richblack-800 text-white mt-2 py-2 rounded-md pl-2 border-none outline-none'
                        name="lastName"
                        type='text'
                        required
                        value={formData.lastName}
                        onChange={changeHandler}
                    ></input>
                </div>
               </div>

                       {/* Email */}
                <div className='fieldContainer mt-4'>
                <div className='flex flex-row gap-x-1'>
                        <span className='text-richblack-50 text-sm'>Email</span> 
                        <span className='text-pink-200 text-sm'>*</span> 
                        </div>
                    <input
                        placeholder='Enter email'
                        name="email"
                        className='bg-richblack-800 text-white mt-2 py-2 rounded-md px-2 border-none outline-none w-[100%] '
                        type='email'
                        required
                        value={formData.email}
                        onChange={changeHandler}
                    ></input>
                </div>


                {/* Phone Number */}
                <div className='fieldContainer mt-4'>
                <div className='flex flex-row gap-x-1'>
                        <span className='text-richblack-50 text-sm'>Phone Number</span> 
                        <span className='text-pink-200 text-sm'>*</span> 
                        </div>
                    <input
                        placeholder='Phone Number'
                        name="phoneNumber"
                        className='appearance-none bg-richblack-800 text-white mt-2 py-2 rounded-md px-2 border-none outline-none w-[100%] '
                        type='number'
                        required
                        value={formData.phoneNumber}
                        onChange={changeHandler}
                    ></input>
                </div>

              {/* Password and confirm Password */}
              <div className='flex flex-row gap-x-4  mt-4'>

              <div className='fieldContainer password_field'>
                <div className='flex flex-row gap-x-1'>
                        <span className='text-richblack-50 text-sm'>Password</span> 
                        <span className='text-pink-200 text-sm'>*</span> 
                        </div>
                    <input
                        placeholder='Create password'
                        className='bg-richblack-800 text-white mt-2 py-2 rounded-md pl-2 border-none outline-none'
                        name="createPassword"
                        type={`${(showPassword1 == true) ? "text" : "password"}`}
                        value={formData.createPassword}
                        required
                        onChange={changeHandler}
                    ></input>
                    <div className='show_pass_btn' onClick={changeShowPassword1}>
                        {
                            (showPassword1) ? (<IoEye size={25} fill='white' />) : (<IoMdEyeOff size={25} fill='white' />)
                        }
                    </div>
                </div>

                <div className='fieldContainer password_field'>
                <div className='flex flex-row gap-x-1'>
                        <span className='text-richblack-50 text-sm'>Confirm Password</span> 
                        <span className='text-pink-200 text-sm'>*</span> 
                        </div>
                    <input
                        placeholder='Confirm password'
                        className='bg-richblack-800 text-white mt-2 py-2 rounded-md pl-2 border-none outline-none'
                        name="confirmPassword"
                        type={`${(showPassword2 == true) ? "text" : "password"}`}
                        value={formData.password}
                        required
                        onChange={changeHandler}
                    ></input>
                    <div className='show_pass_btn' onClick={changeShowPassword2}>
                        {
                            (showPassword2) ? (<IoEye size={25} fill='white' />) : (<IoMdEyeOff size={25} fill='white' />)
                        }
                    </div>
                </div>


              </div>

                <button className='w-[100%] text-center mt-4 py-2 rounded bg-yellow-50 text-black font-semibold'>Create Account</button>

            </form>

            <div className='partition'>
                <div className='line1'></div>
                <div className='or'>OR</div>
                <div className='line2'></div>
            </div>

           

        </div>

    )
}

export default SignUpForm;