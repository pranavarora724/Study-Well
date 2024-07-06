import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {updateProfileDetails}  from  '../../../services/operations/settingsAPI'
// import updateProfileDetails

function PersonalInformationForm() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.profile.user);
    const token = useSelector((state) => state.auth.token);

    const [formData, setFormData] = useState({
        firstName: `${user.firstName}`,
        lastName: `${user.lastName}`,
        phoneNumber: user.profile.contactNumber,
        dob: user.profile.dob,
        about: user.profile.about,
        gender: user.profile.gender
    }
)

function submitHandler(event)
{
    event.preventDefault();
    console.log("forn Data");

    // formData.phoneNumber=12345;
    console.log(formData);
    updateProfileDetails(formData.gender , formData.dob , formData.about , formData.phoneNumber , formData.firstName , formData.lastName ,token , dispatch );
}

    console.log("FormData = ", formData);

    // Change Handler
    function changeHandler(event) {
        const { name, value, checked } = event.target;

        setFormData(prev => {
            return {
                ...prev,
                [name]: (value)
            }
        })
    }




    return (
        <div>
            <div className="bg-richblack-800 mt-10 px-7 py-7">
                <div className="text-white font-semibold">Profile Information</div>

                <form onSubmit={submitHandler}>
                <div className="mt-10 grid grid-cols-1  md:grid-cols-2 gap-x-5 ">
                    {/* First Name */}
                    <div className="flex flex-col mt-4 gap-y-2 text-richblack-200 font-semibold">
                        <label htmlFor="firstName">First Name</label>
                        <input
                            className="text-white bg-richblack-700 w-[100%] p-2 pr-0 rounded-lg mt-1"
                            type="text"
                            name='firstName'
                            id='firstName'
                            value={formData.firstName}
                            onChange={changeHandler}
                            placeholder="Enter First Name"
                        ></input>


                    </div>


                    {/* Last Name */}
                    <div className="flex flex-col mt-4 gap-y-2 text-richblack-200 font-semibold">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            className="text-white bg-richblack-700 w-[100%] p-2 pr-0 rounded-lg mt-1"
                            type="text"
                            name='lastName'
                            id='lastName'
                            value={formData.lastName}
                            onChange={changeHandler}
                            placeholder="Enter Last Name"
                        ></input>


                    </div>

                    {/* About */}
                    <div className="flex flex-col gap-y-2 mt-4 text-richblack-200 font-semibold">
                        <label htmlFor="about">About</label>
                        <input
                            className="text-white bg-richblack-700 w-[100%] p-2 pr-0 rounded-lg mt-1"
                            type="text"
                            name='about'
                            id='about'
                            value={(formData.about === null) ? ("") : (`${formData.about}`)}
                            // value={formData.about}
                            onChange={changeHandler}
                            placeholder="Write About Yourself"
                        ></input>
                    </div>


                    {/* Phone Number */}
                    <div className="flex flex-col gap-y-2 mt-4 text-richblack-200 font-semibold">
                        <label htmlFor="phoneNumber">Contact</label>
                        <input
                            className="text-white bg-richblack-700 w-[100%] p-2 pr-0 rounded-lg mt-1"
                            type="number"
                            name='phoneNumber'
                            id='phoneNumber'
                            value={(formData.phoneNumber == null) ? (null) : (formData.phoneNumber)}
                            onChange={changeHandler}
                            placeholder="Enter Contact Number"
                        ></input>

                    </div>

                    <div className="flex flex-col gap-y-2 mt-4 text-richblack-200 font-semibold">
                        <label htmlFor="dob">Date Of Birth</label>
                        <input
                            className="text-white bg-richblack-700 w-[100%] p-2 pr-0 rounded-lg mt-1"
                            type="date"
                            name='dob'
                            id='dob'
                            value={(formData.dob == null) ? ("") : (formData.dob)}
                            onChange={changeHandler}
                            placeholder="dd/mm/yyyy"
                        ></input>

                    </div>

                    <div className="flex flex-col gap-y-2 mt-4 text-richblack-200 font-semibold">
                        <label htmlFor="gender">Gender</label>

                        <select
                            name="gender"
                            id="gender"
                            defaultValue={(formData.gender == null) ? ("Male") : (formData.gender)}
                            onChange={changeHandler}
                            className="bg-richblack-700 text-white p-2 pr-0 rounded-lg mt-1"
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Others">Others</option>

                        </select>
                    </div>

                </div>

                <button className="mt-4 bg-yellow-100 px-4 py-2 text-black hover:scale-95  transition-all duration-200  rounded-lg" type="submit">Update</button>
                </form>
               

            </div>
        </div>
    )
}

export default PersonalInformationForm;