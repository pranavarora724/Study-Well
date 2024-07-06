import { useEffect, useState } from 'react';
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { signUp , sendOTP } from '../../services/operations/authAPI'
import { useDispatch } from 'react-redux'
import OTPInput from 'react-otp-input';

function OtpForm() {

    const signupData = useSelector((state) => state.auth.signupData);
    console.log("Signup data = ", signupData);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const dispatch = useDispatch();
    const [otp , setOtp] = useState('');

    // IMP INSIDE UseEffect
    // Or Inside your react component
    useEffect(()=>{
        if(signupData == null)
            navigate('/signup');
    } , []);

    
    console.log("otp = " , otp);
    // Form Data 
    const [formData, setFormData] = useState(
        {
            otp: ''
        }
    );

    
    function resendOtpHandler()
    {
        console.log("Sending otp again");
        sendOTP(signupData.email , navigate , dispatch);
    }

    // Submit Handler in forms
    function submitHandler(event) {
        event.preventDefault();

        const newFormData = {
            otp:otp
        }

        console.log("Printing Form data");
        console.log(newFormData);

        signUp(signupData.profile, signupData.firstName, signupData.lastName, signupData.email, signupData.createPassword, signupData.confirmPassword, newFormData.otp, navigate, dispatch);
        // props.setIsLogin(true);
        // navigate("/");
    }



    return (
        <div className=''>

            <form onSubmit={submitHandler} className=' flex flex-col mx-auto'>

                {/* Email */}
                <div className='fieldContainer mt-4 mx-auto'>

                    {/* <input
                        name="otp"
                        type='number'
                        className='appearance-none bg-richblack-800 text-white mt-2 py-2 rounded-md px-2 border-none outline-none w-[100%] '
                        placeholder='Enter OTP'
                        value={formData.email}
                        onChange={changeHandler}
                    ></input> */}

                    <OTPInput
                    className='border-2 border-blue-400'
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        inputStyle={{
                            color:'black',
                            font:'bold',
                            borderRadius:"8px",
                            width:"44px",
                            height:"44px",
                        }}
                        containerStyle={{
                            margin:"auto"
                        }}
                        renderSeparator={<span className='w-3 pl-[3px] text-white'>-</span>}
                        renderInput={(props) => <input {...props} />}
                    />

                </div>

                <div className='mx-auto w-[320px]'>
                    <button className='w-[100%]  text-center mt-4 py-2 rounded bg-yellow-50 hover:bg-yellow-100 hover:scale-95 transition-all duration-200 text-black font-semibold' type='submit'>Verify Email</button>
                </div>

                <div onClick={resendOtpHandler} className='font-lighttext-sm text-blue-200 mt-2 hover:text-blue-300 cursor-pointer mr-0 text-right'>Resend OTP</div>

            </form>
        </div>
    )
}

export default OtpForm;