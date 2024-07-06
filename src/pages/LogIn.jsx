
import LogInForm from "../components/auth/LogInForm";
import LogInImage from '../assets/Images/login.webp';


function LogIn()
{

    console.log("Log in page");
    return(
        <div className="flex flex-row gap-x-12 mt-12 mx-auto ">
        
            <LogInForm></LogInForm>
            <div>
                <img src={LogInImage} className="h-[350px] "></img>
            </div>            
        </div>
    )
}

export default LogIn;