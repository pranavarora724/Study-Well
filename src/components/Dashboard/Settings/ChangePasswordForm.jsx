import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { updatePAsswordFunction } from "../../../services/operations/settingsAPI";
import { useSelector } from "react-redux";

function ChangePasswordForm() {
    const navigate = useNavigate();
    const token = useSelector((state) => state.auth.token);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful }
    } = useForm();

    function formSubmitHandler(data) {
        console.log("formData");
        console.log(data);

        updatePAsswordFunction(data.currentPassword , data.newPassword , token , navigate);
    }
    const dispatch = useDispatch();

    const [showPassword1, setShowPassword1] = useState(false);


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


    return (
        <div>
            <div className="bg-richblack-800 mt-10 px-7 py-7">
                <div className="text-white font-semibold">Change Password</div>

                <div className="mt-10">
                    <form onSubmit={handleSubmit(formSubmitHandler)}>

                        <div className='flex md:flex-row flex-col w-[100%] mt-4 gap-x-4'>

                           {/* Current Password */}
                            <div className='fieldContainer relative password_field  md:w-[47%]'>
                                <div className='flex flex-row gap-x-1'>
                                    <span className='text-richblack-50 text-sm'>Current Password</span>
                                    <span className='text-pink-200 text-sm'>*</span>
                                </div>
                                <input
                                    placeholder='Current Password'
                                    className='bg-richblack-700 w-[100%] text-white mt-2 py-2 rounded-md pl-2 border-none outline-none'
                                    name="currentPassword"
                                    type={`${(showPassword1 == true) ? "text" : "password"}`}
                                    
                                    {...register("currentPassword" , {
                                        required:{value:true,message:'Please Enter This Field'}
                                    })}
                                    
                                    
                                ></input>
                                <div className='show_pass_btn' onClick={changeShowPassword1}>
                                    {
                                        (showPassword1) ? (<IoEye size={25} fill='white' />) : (<IoMdEyeOff size={25} fill='white' />)
                                    }
                                </div>

                                {/* Displaying Errors */}
                                {
                                    errors.currentPassword && (
                                        <span className="text-pink-300 absolute -bottom-[25px] w-[200px] transition-none">{errors.currentPassword.message}</span>
                                    )
                                }
                            </div>

                            {/* New Password */}
                            <div className='fieldContainer relative password_field md:w-[47%]'>
                                <div className='flex flex-row gap-x-1'>
                                    <span className='text-richblack-50 text-sm'>New Password</span>
                                    <span className='text-pink-200 text-sm'>*</span>
                                </div>
                                <input
                                    placeholder='New Password'
                                    className='bg-richblack-700 w-[100%] text-white mt-2 py-2 rounded-md pl-2 border-none outline-none'
                                    name="newPassword"
                                    type={`${(showPassword2 == true) ? "text" : "password"}`}
                                    {...register("newPassword" , {
                                        required:{value:true , message:'Please Enter Field'}
                                    })}
                                    
                                ></input>
                                <div className='show_pass_btn' onClick={changeShowPassword2}>
                                    {
                                        (showPassword2) ? (<IoEye size={25} fill='white' />) : (<IoMdEyeOff size={25} fill='white' />)
                                    }
                                </div>

                                   {/* Displaying Errors */}
                                   {
                                    errors.newPassword && (
                                        <span className="text-pink-300 absolute -bottom-[25px] w-[200px] transition-none">{errors.newPassword.message}</span>
                                    )
                                }
                            </div>


                        </div>

                        <button className="bg-yellow-100 hover:scale-95 transition-all duration-150 text-black px-4 py-2 mt-6 rounded-lg" type="submit">Update</button>


                    </form>
                </div>

            </div>
        </div>
    )
}

export default ChangePasswordForm;