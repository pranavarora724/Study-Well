import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/common/Navbar';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import OtpVerification from './pages/OtpVerification';
import ResetPasswordToken from './pages/ResetPasswordToken';
import ResetPassword from './pages/ResetPassword';
import OpenRoute from './components/auth/OpenRoute';
import ClosedRoute from './components/auth/ClosedRoute';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import DashboardSetting from './pages/DashboardSetting';
import DashboardAddCourse from './pages/DashboardAddCourse';
import DashboardMyCourses from './pages/DashboardMyCourses';
import DashboardEditCourse from './pages/DashboardEditCourse';
import DashboardCourseDetails from './pages/DashboardCourseDetails';
import CategoryDetails from './pages/CategoryDetails';
import DashboardCart from './pages/DashboardCart';
import DashboardViewCourse from './pages/DashboardViewCourse';
import DashboardInstructor from './pages/DashboardInstructor';

import DashboardEnrolledCourses from './pages/DashboardEnrolledCourses';
import { useSelector } from 'react-redux';
// require("dotenv").config()

function App() {

  const token = useSelector((state)=>state.auth.token);

  return (
   <div className={`w-screen min-h-screen  flex flex-col ${(token)?('bg-richblack-900'):('')}`}>
    
    <Navbar></Navbar>

    <Routes>
      {/* Routes for Both LOGGED and NON-LOGGED IN Users */}
      <Route path='/' element={<Home/>}></Route>
      <Route path='/about' element={<About />}></Route>

      {/* Open Route for NON-LOGGED In Users only */}
      <Route path='/signup' element={<OpenRoute><SignUp/></OpenRoute>}></Route>
      <Route path='/login' element={<OpenRoute><LogIn/></OpenRoute>}></Route>
      <Route path='/verifyEmail' element={<OpenRoute><OtpVerification/></OpenRoute>}></Route>
      <Route path='/resetPasswordToken' element={<OpenRoute><ResetPasswordToken/></OpenRoute>}></Route>
      <Route path='/resetPassword/:token' element={<OpenRoute><ResetPassword/></OpenRoute>}></Route>
      
      {/* Closed Rout only for LOGGED In Users Only */}
      <Route path='/dashboard/my-profile' element={<ClosedRoute><Dashboard /></ClosedRoute>}></Route>
      <Route path='/dashboard/settings' element={<ClosedRoute> <DashboardSetting /> </ClosedRoute>}></Route>
      <Route path='/dashboard/add-course' element={<ClosedRoute>  <DashboardAddCourse />  </ClosedRoute>}></Route>
      <Route path='/dashboard/my-courses/:instructorId' element={<ClosedRoute> <DashboardMyCourses /> </ClosedRoute>}/>
      <Route path='/dashboard/editCourse' element={<ClosedRoute> <DashboardEditCourse/> </ClosedRoute>}/>
      <Route path='/dashboard/courseDetails' element={  <DashboardCourseDetails /> } />
      <Route path='/category/:categoryName' element={<CategoryDetails />} ></Route>
      <Route path='/dashboard/enrolledCourses/:user_id' element={<ClosedRoute><DashboardEnrolledCourses /></ClosedRoute>}></Route>
      <Route path='/dashboard/cart' element={<ClosedRoute><DashboardCart /></ClosedRoute>}></Route>
      <Route path='/dashboard/viewCourse/:courseId/section/:sectionId/subSection/:subSectionId' element={<ClosedRoute><DashboardViewCourse/></ClosedRoute>}></Route>
      <Route path='/dashboard/instructor' element={<ClosedRoute> <DashboardInstructor /> </ClosedRoute>}></Route>
      
    </Routes>
   </div>

  );
}

export default App;
