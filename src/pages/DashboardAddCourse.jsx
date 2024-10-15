import { useSelector } from "react-redux";
import Sidebar from "../components/Dashboard/Sidebar";
import { FaCheck } from "react-icons/fa6";

import CourseInformationForm from '../components/Dashboard/AddCourse/CourseInformationForm';
import CourseBuilderForm from '../components/Dashboard/AddCourse/CourseBuilderForm';
import CoursePublishForm from '../components/Dashboard/AddCourse/CoursePublishForm';

function DashboardAddCourse() {

    const steps = [
        {
            id: 1,
            name: "Course Information"
        },
        {
            id: 2,
            name: "Course Builder"
        },
        {
            id: 3,
            name: "Publish"
        }
    ]

    const step = useSelector((state) => state.course.step);
    const user = useSelector((state) => state.profile.user);

    return (
        <div>

            <div className="flex flex-row">

                {/* Side bar */}
                <div className=" bg-richblack-700   min-h-[100vh]">
                    <Sidebar></Sidebar>
                </div>

                <div className="max-w-[800px] w-[80%] mx-auto  ">
                    <div className="text-white text-2xl mt-6">Add Course</div>

                    <div className="mt-6 w-[100%] flex flex-row justify-between">
                        {
                            steps.map((element, id) => {
                                return (
                                    <div key={element.id} className="flex flex-col items-center justify-between ">

                                        <div className={` w-[50px] h-[50px] rounded-full  bg-richblack-700 flex justify-center items-center text-xl text-richblack-300 font-semibold ${(step >= element.id) ? (`border border-yellow-25 text-yellow-25 bg-yellow-800`) : (``)} `}>
                                            {
                                                (element.id < step) ? (<FaCheck />) : (<div>{element.id}</div>)
                                            }

                                        </div>

                                        <div className={` mt-2  ${(step == element.id)?(`text-white`):(`text-richblack-300`)}`}>{element.name}</div>
                                    </div>
                                )
                            })
                        }
                    </div>

                    <div className="mt-10">
                    {step==1 && <CourseInformationForm />}
                    {step ==2 && <CourseBuilderForm />}
                    {step == 3 && <CoursePublishForm />}
                </div>


                </div>

                
            </div>

        </div>
    )
}

export default DashboardAddCourse;