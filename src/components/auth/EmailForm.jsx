
import { useState } from 'react';
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
// import {} from
// import authEndpoints from '../'
import { resetPasswordLink } from '../../services/operations/authAPI'
import { authEndpoints } from '../../services/apis';
import { useDispatch } from 'react-redux';

function EmailForm() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Form Data 
    const [formData, setFormData] = useState(
        {
            email: "",
        }
    );


    // Change Handler in forms
    function changeHandler(event) {
        const { name, value } = event.target;

        setFormData(prev => {
            return {
                ...prev,
                [name]: (value)
            }
        })

    }

    // Submit Handler in forms
    function submitHandler(event) {
        event.preventDefault();
        console.log("Printing Form data");
        console.log(formData);

        resetPasswordLink(formData.email , navigate , dispatch);

    }

    return (
        <div>
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
                        className='bg-richblack-800 text-white mt-2 py-2 rounded-md px-2 border-none outline-none w-[100%] '
                        placeholder='Enter email address'
                        value={formData.email}
                        onChange={changeHandler}
                    ></input>
                </div>



                <div>
                    <button className='w-[100%] text-center mt-4 py-2 rounded bg-yellow-50 text-black font-semibold' type='submit'>Reset Password</button>
                </div>

            </form>

        </div>

    )
}

export default EmailForm;