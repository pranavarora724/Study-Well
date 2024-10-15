

import OtpForm from "../components/auth/OtpForm";

function OtpVerification()
{
    return(
        <div className="w-[320px] mx-auto  mt-24">
            <div className="text-2xl font-bold text-richblack-900 ">Verify Email</div>
            <div className="text-richblack-200 mt-4">A verification Code has been sent to you , Enter here and Verify your Email</div>
            <OtpForm></OtpForm>
        </div>
    )
}

export default OtpVerification;