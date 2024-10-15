
import EmailForm from "../components/auth/EmailForm";

function ResetPasswordToken()
{
    return(
        <div className="w-[320px] mx-auto  mt-24">
        <div className="text-2xl font-bold text-richblack-900">Reset Your Password</div>
        <div className="text-richblack-200 mt-4">Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery</div>
        <EmailForm></EmailForm>
    </div>
    )
}


export default ResetPasswordToken;