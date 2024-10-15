import { useParams } from "react-router-dom";
import {} from "../services/operations/createCourseAPI"
import EditCourseInformation from "../components/Dashboard/AddCourse/EditCourseInformation";
import Sidebar from "../components/Dashboard/Sidebar";
import { useState } from "react";

import CourseBuilderForm2 from "../components/Dashboard/AddCourse/CourseBuilderForm2";

function DashboardEditCourse()
{

    const courseId = useParams();

    const[editStep , setEditStep] = useState(1);

    async function fetchCouseDetails()
    {

    }
    return(
        <div>
            
            <div className="flex flex-row">

                {/* Side bar */}
                <div className=" bg-richblack-700   min-h-[100vh]">
                    <Sidebar></Sidebar>
                </div>

                <div className="max-w-[800px] w-[80%] mx-auto  ">
                    <div className="text-white text-2xl mt-6">Edit Course</div>

                    <div className="mt-10">
                      
                      {editStep == 1 && <EditCourseInformation editStep={editStep} setEditStep={setEditStep}/>}
                      {editStep == 2 && <CourseBuilderForm2 />}
                    </div>

                </div>                
            </div>
        </div>
    )
}

export default DashboardEditCourse;