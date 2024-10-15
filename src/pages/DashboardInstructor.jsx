import { useEffect, useState } from "react";
import Sidebar from "../components/Dashboard/Sidebar";
import {getInstructorDashboard} from "../services/operations/createCourseAPI"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import {Pie} from "react-chartjs-2"
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2'

function DashboardInstructor()
{
    const [totalCourses , setTotalCourses] = useState(0);
    const [totalStudents , setTotalStudents] = useState(0);
    const [totalIncome , setTotalIncome] = useState(0);
    const [dashboardData , setDashboardData] = useState([]);
    const [flag , setFlag] = useState("Students");
    const token = useSelector((state)=>state.auth.token);
    const user = useSelector((state)=>state.profile.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    function getColors(number)
    {
        let colorsArray = [];
        for(let i = 1;i<=number;i++)
        {
            const color = `rgb( ${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)} ,${Math.floor(Math.random()*256)})`
            colorsArray.push(color);
        }
        console.log("colorsArray = "  , colorsArray);
        return colorsArray;
    }

    async function getData()
    {
        const response = await getInstructorDashboard(user._id , token , dispatch , navigate);
        console.log("Instructor dashboard = " , response);

        setDashboardData(response?.data?.data);
        const list = response?.data?.data;

        let money = 0;
        let students = 0;
        list.map((element , id)=>{
            money = money + element.moneyEarned;
            students = students + element.studentsEnrolled;
        });

        console.log("Total students = ",students);
        console.log("Total income  = " ,money);

        setTotalStudents(students);
        setTotalIncome(money);
        setTotalCourses(list.length);
        
    }

    const studentData = (dashboardData)?{
        labels: dashboardData.map((el)=>{return el.courseName}),
        datasets: [{
          label: 'Students Enrolled',
          data: dashboardData.map((el)=>{return el.studentsEnrolled}),
          backgroundColor: getColors(totalCourses),
          hoverOffset: 4
        }]
      }:{};

      const incomeData = (dashboardData)?{
        labels: dashboardData.map((el)=>{return el.courseName}),
        datasets: [{
          label: 'Income Generated',
          data: dashboardData.map((el)=>{return el.moneyEarned}),
          backgroundColor: getColors(totalCourses),
          hoverOffset: 4
        }]
      }:{};

    useEffect(()=>{
        getData();
    },[])

    console.log("sudentData = " , studentData);
    console.log("Income ata  = " , incomeData);
const options={};
    return(
        <div>
            
            <div className="flex flex-row">

                   {/* Side bar */}
                <div className=" bg-richblack-700   min-h-[100vh]">
                    <Sidebar></Sidebar>
                </div>

                <div className="max-w-[800px] w-[80%] mx-auto ">
                    <div className="text-white text-xl ">Hi {user.firstName}</div>
                    <div className="text-richblack-500">Let's Start something new</div>
                

                <div className="flex flex-col md:flex-row md:gap-x-4 mt-4">

                    {/* PIe chart */}
                    <div className="flex flex-col bg-richblack-700 md:w-[70%] p-4">
                        <div className="text-white">Visualize</div>
                        <div className="flex flex-row gap-x-4 mt-1">
                            <div onClick={()=>{setFlag("Students")}} className={`text-yellow-100 px-2 py-1 cursor-pointer ${(flag == "Students")?(`bg-richblack-500 font-semibold`):(``)}`}>Students</div>
                            <div onClick={()=>{setFlag("Income")}} className={`text-yellow-100 px-2 py-1 cursor-pointer ${(flag == "Income")?(`bg-richblack-500 font-semibold`):(``)}`}>Income</div>
                        </div>

                        <div className="mt-4">
                            {
                               (dashboardData)?(
                               <Chart type="pie" data={(flag=="Students")?studentData:incomeData}></Chart>
                               ):(<div></div>) 
                            }
                        </div>
                    </div>

                    {/* Dashbord STATS */}
                    <div className="bg-richblack-700 md:w-[25%] p-4">
                        <div className="text-white font-semibold">Statistics</div>
                        <div className="flex flex-row justify-between md:flex-col md:gap-y-6 mt-4">
                            
                            <div>
                               <div className="text-richblack-300 max-[768px]:text-center">Total Courses</div>
                               <div className="text-richblack-100 font-bold text-2xl max-[768px]:text-center">{totalCourses}</div>
                            </div>

                            <div>
                                <div className="text-richblack-300 max-[768px]:text-center">Total Students</div>
                                <div className="text-richblack-100 font-bold text-2xl max-[768px]:text-center">{totalStudents}</div>
                            </div>

                            <div>
                                <div className="text-richblack-300 max-[768px]:text-center">Total Income</div>
                                <div className="text-richblack-100 font-bold text-2xl max-[768px]:text-center">Rs. {totalIncome}</div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            </div>
        </div>
    )
}

export default DashboardInstructor;