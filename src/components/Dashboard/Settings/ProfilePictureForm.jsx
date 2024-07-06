import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FiUpload } from "react-icons/fi";
import { updateProfilePic } from "../../../services/operations/settingsAPI";


function ProfilePictureForm()
{

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);
    const user = useSelector((state)=> state.profile.user);

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors , isSubmitSuccessful}
    }=useForm();

    function formSubmitHandler(data)
    {
        console.log("formData");
        console.log(data);

        console.log("File = ");
        console.log(data.profilePic[0]);

        updateProfilePic(data.profilePic[0] , token , dispatch);

    }
    

    


    return(
        <div>
            <div className="bg-richblack-800 mt-10 px-7 py-7 gap-x-5 flex flex-row items-center">

                <div className="rounded-full">
                    <img className="rounded-full h-[70px] w-[70px] object-cover object-top" src={`${user.imageUrl}`}></img>
                </div>

                <div className="flex flex-col">
                   <div className="text-white font-semibold">Change Profile Picture</div>

                  {  /* Form */}
                   <div className=" mt-4 ">
                   <form onSubmit={handleSubmit(formSubmitHandler)} className='flex flex-row gap-x-4 items-center'>

                      {/*Select Button  */}
                      <div className="flex flex-col gap-y-2 relative">
                        <label htmlFor="profilePic" className="bg-richblack-600 w-fit  hover:scale-95 transition-all duration-200 cursor-pointer text-white font-semibold px-4 py-2 rounded-lg">Select</label>
                        <input
                        type="file"
                        className="hidden"
                        name="profilePic"
                        id="profilePic"
                        placeholder="Choose"

                        {...register("profilePic" , {
                            required:{value:true , message:"Please select an image"}
                        })}
                        ></input>

                        {
                            errors.profilePic && (
                                <span className="text-pink-300 absolute -bottom-[25px] w-[200px] transition-none">{errors.profilePic.message}</span>
                            )
                        }
                      </div>
                      

                      {/* Uplaod Buttton */}
                      <div>
                        <button type="submit" className="bg-yellow-100 items-center font-semibold text-black p-2 rounded-lg hover:scale-95 transition-all duration-200 cursor-pointer flex flex-row gap-x-2">

                            <div>Upload</div>
                            <FiUpload />
                        </button>
                      </div>

                    </form>
                   </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePictureForm;