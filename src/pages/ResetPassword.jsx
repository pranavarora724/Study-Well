import { useParams } from "react-router-dom";
import ResetPasswordForm from '../components/auth/ResetPasswordForm'

function ResetPassword()
{

    // const token = params.token;
    const params = useParams();
    const token = params.token;

    console.log("Token = ", token);

    return(
        <div className="w-[320px] mx-auto mt-24">

            <div className="text-2xl font-bold text-white">Choose New Password</div>
            <div className="text-richblack-200 mt-4">Almost done. Enter your new password and youre all set.</div>
            <ResetPasswordForm token={token}></ResetPasswordForm>
        </div>
    )
}

export default ResetPassword;