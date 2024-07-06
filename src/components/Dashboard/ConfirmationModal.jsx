import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {Logout} from '../../services/operations/authAPI'

function ConfirmationModal(props)
{
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return(
        <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
            <div className="w-11/12 max-w-[350px] rounded-lg border border-richblack-400 bg-richblack-800 p-6">

                <div className="text-xl text-white font-semibold">Do you want to Logout ? </div>
                <div className="text-sm px-2 mt-2 text-richblack-300 font-semibold">Logging out will take you back to home page and to acccess pages you need to login again</div>

                <div className="flex flex-row justify-between px-5 mt-8">
                     <div onClick={()=>{props.setDisplayModal(false)}} className="px-6 py-2 cursor-pointer bg-richblack-700 rounded-lg text-white hover:scale-95 transition-all duration-200 font-semibold">Cancel</div>
                     <div onClick={()=>{Logout(navigate , dispatch)}} className="px-6 py-2 cursor-pointer hover:scale-95 transition-all duration-200 bg-yellow-200 rounded-lg text-black font-semibold">Logout</div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationModal;