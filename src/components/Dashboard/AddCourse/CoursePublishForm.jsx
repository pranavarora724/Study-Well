import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import {} from '../../'

import {publishCourse} from '../../../services/operations/createCourseAPI'

function CoursePublishForm()
{

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const course = useSelector((state)=>state.course.course);
    const token = useSelector((state)=>state.auth.token);
    const user = useSelector((state)=>state.profile.user);

    const {
        setValue , 
        getValues,
        register,
        handleSubmit
    } = useForm();

    function onSubmit(data)
    {
        console.log("data" , data);
        // 
        // toast.success("Course Published");
        if(data.publishCourse == false)
        {
            navigate('/dashboard/my-courses');
        }
        else{
            publishCourse(course._id , token , dispatch , navigate , user._id);
        }
    }

    return(
        <div className="text-white">

            <div className="text-white text-2xl">Publish Course</div>
            <form className="max-w-[800px] w-[90%] mx-auto bg-richblack-700 rounded-xl mt-6 p-2" onSubmit={handleSubmit(onSubmit)}>

                {/* Publish Course */}
                <div className="flex flex-col gap-y-4 ">
                    {/* <label className="text-white text-2xl" htmlFor="publishCourse">Publish Course</label> */}

                    <div className="flex gap-x-4">

                        <input
                        type="checkbox"
                        id="publishCourse"
                        {...register("publishCourse")}
                        >
                        </input>

                        <div className="text-white">Publishing Course Will Make It Public </div>

                    </div>
                </div>

                <div>
                    <button className="mt-4 bg-yellow-50 p-2 text-black rounded-lg hover:scale-95 transition-all duration-200">Publish</button>
                </div>
            </form>
        </div>
    )
}

export default CoursePublishForm;