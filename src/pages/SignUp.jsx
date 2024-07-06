
import SignUpForm from "../components/auth/SignUpForm";
import SignUpImage from '../assets/Images/signup.webp';
import LogInImage from '../assets/Images/login.webp';

function SignUp()
{
    console.log("Sign up page");
    return(
        <div className="flex flex-row gap-x-12 mt-12 mx-auto ">
        
            <SignUpForm></SignUpForm>
            <div>
                <img src={SignUpImage} className="h-[300px] md:h-[400px]"></img>
            </div>            
        </div>
    )
}

export default SignUp;