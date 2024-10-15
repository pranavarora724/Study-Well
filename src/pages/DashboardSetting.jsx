import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Dashboard/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { FiEdit } from "react-icons/fi";
import ProfilePictureForm from "../components/Dashboard/Settings/ProfilePictureForm";
import PersonalInformationForm from "../components/Dashboard/Settings/PersonalInformationForm";
import ChangePasswordForm from "../components/Dashboard/Settings/ChangePasswordForm";


function DashboardSetting() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector((state)=> state.profile.user);

    return (
        <div>

            <div className="flex flex-row">

                {/* Side bar */}
                <div className=" bg-richblack-700   min-h-[100vh]">
                    <Sidebar></Sidebar>
                </div>

                <div className="max-w-[800px] w-[80%] mx-auto ">
                    <div className="text-white text-2xl mt-6">My Profile</div>

                    {/* First div */}
                   <ProfilePictureForm></ProfilePictureForm>

                   <PersonalInformationForm></PersonalInformationForm>

                   <ChangePasswordForm></ChangePasswordForm>

                </div>

            </div>
        </div>
    )
}

export default DashboardSetting;