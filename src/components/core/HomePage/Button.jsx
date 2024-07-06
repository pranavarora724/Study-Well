import { Link } from "react-router-dom";

function Button({children , active , linkTo})
{
    return(
        <div>
            <Link to={linkTo}>

              <div className={`px-4 py-2 rounded-md flex flex-row gap-x-2 font-semibold w-fit
              hover:scale-95 transition-all duration-200 cursor-pointer
              ${(active==true)?"bg-yellow-50 text-black":"bg-richblack-700 text-richblack-100"}
              `}>
                {children}
              </div>

            </Link>
        </div>
    );
}

export default Button;