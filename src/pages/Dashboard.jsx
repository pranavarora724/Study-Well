import { useDispatch, useSelector } from "react-redux";
import { Logout } from '../services/operations/authAPI'
import { useNavigate } from "react-router-dom";
import { sidebarLinks } from '../data/dashboard-links';
import Sidebar from "../components/Dashboard/Sidebar";
import { FiEdit } from "react-icons/fi";


function Dashboard() {
    const loading = useSelector((state) => state.auth.loading);
    const profileLoading = useSelector((state) => state.profile.profileLoading);
    const user = useSelector((state) => state.profile.user);


    const navigate = useNavigate();
    const dispatch = useDispatch();

    console.log("Loading = ", loading);
    console.log("Profile Loaing = ", profileLoading);
    console.log('User =', user);
    console.log(user.profile?.about);

    console.log("Inside Dashboard");

    // Loading...
    if (loading == true || profileLoading == true) {
        return (
            <div className="text-2xl text-white text-center">Loading ...
            </div>
        )
    }

    // Main Component
    return (
        // console.log("INSIDE DASHNOARD")
        <div className=" text-white">
            <div className="flex flex-row">

                {/* Side bar */}
                <div className=" bg-richblack-700   min-h-[100vh]">
                    <Sidebar></Sidebar>
                </div>

                {/* Right side part */}
                <div className="max-w-[800px] w-[80%] mx-auto  ">
                    <div className="text-white text-2xl mt-6">My Profile</div>

                    {/* First div */}
                    <div className="bg-richblack-800 mt-10 px-7 py-7 flex flex-col sm:flex-row justify-between items-center">

                        {/* Left part */}
                        <div className="flex flex-row gap-x-4 items-center">

                            {/* Image */}
                            <div className="rounded-full">
                                <img className="rounded-full h-[70px] w-[70px] object-cover object-top" src={`${user.imageUrl}`}></img>
                            </div>

                            <div className="font-semibold">
                                <div className="text-white">{user.firstName} {user.lastName}</div>
                                <div className="text-richblack-300"> {user.email} </div>
                            </div>
                        </div>

                        {/* Right part */}
                        <div onClick={() => { navigate('/dashboard/settings') }} className="px-4 mt-2 sm:mt-0 py-2 rounded-lg flex flex-row gap-x-4 items-center text-black font-semibold cursor-pointer hover:scale-95 transition-all duration-200 bg-yellow-200">
                            <div>Edit</div>
                            <FiEdit />
                        </div>

                    </div>

                    {/* Second Div */}
                    <div className="bg-richblack-800 mt-10 px-7 py-7 flex flex-col sm:flex-row justify-between items-center">

                        {/* Left part */}
                        <div className=" gap-x-4 items-center font-semibold">
                            <div>About</div>
                            <div className="text-sm mt-4 text-richblack-300 font-semibold">{(user.profile.about == null) ? ('Write something about yourself') : (`${user.profile.about}`)}</div>
                        </div>

                        {/* Right part */}
                        <div onClick={() => { navigate('/dashboard/settings') }} className="px-4 mt-2 sm:mt-0 py-2 rounded-lg flex flex-row gap-x-4 items-center text-black font-semibold cursor-pointer hover:scale-95 transition-all duration-200 bg-yellow-200">
                            <div>Edit</div>
                            <FiEdit />
                        </div>

                    </div>


                    {/* Third div */}
                    <div className="bg-richblack-800 mt-10 px-7 py-7">

                        {/* Top */}
                        <div className=" flex flex-row justify-between items-center">

                            {/* Left part */}
                            <div className=" gap-x-4 items-center font-semibold">
                                <div>Personal Details</div>
                            </div>

                            {/* Right part */}
                            <div onClick={() => { navigate('/dashboard/settings') }} className="px-4 py-2 rounded-lg flex flex-row gap-x-4 items-center text-black font-semibold cursor-pointer hover:scale-95 transition-all duration-200 bg-yellow-200">
                                <div>Edit</div>
                                <FiEdit />
                            </div>
                        </div>

                        {/* Bottom */}
                        <div className="flex flex-col sm:flex-row justify-between w-[90%] font-semibold">

                            {/* Left div */}
                            <div>
                                <div className="mt-4">
                                    <div className="text-richblack-100">First Name</div>
                                    <div className="text-white">{user.firstName}</div>
                                </div>

                                <div className="mt-4">
                                    <div className="text-richblack-300">Email</div>
                                    <div className="text-white">{user.email}</div>
                                </div>

                                <div className="mt-4">
                                    <div className="text-richblack-300">Phone Number</div>
                                    <div className="text-white"> {(user?.profile?.contactNumber) ? (user?.profile?.contactNumber) : ('Enter Contact Number')} </div>
                                </div>
                            </div>

                            {/* Right div */}
                            <div>
                                <div className="mt-4">
                                    <div className="text-richblack-300">Last Name</div>
                                    <div className="text-white">{user.lastName}</div>
                                </div>

                                <div className="mt-4">
                                    <div className="text-richblack-300">Contact Number</div>
                                    <div className="text-white"> {(user?.profile?.contactNumber) ? (user?.profile?.contactNumber) : ('Enter Contact Number')} </div>
                                </div>

                                <div className="mt-4">
                                    <div className="text-richblack-300">Date Of Birth</div>
                                    <div className="text-white"> {(user?.profile?.dob) ? (user?.profile?.dob) : ('Enter Date of Birth')} </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>

            </div>
        </div>
    )
}

export default Dashboard;