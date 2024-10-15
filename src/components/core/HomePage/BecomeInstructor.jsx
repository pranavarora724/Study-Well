 
import Instructor from '../../../assets/Images/Instructor.png';
import Button from './Button';

 function BecomeInstructor()
 {
    return(
       <div className='w-[100%] bg-white'>
         <div className='w-10/12 mx-auto bg-white pt-[200px]'>

            
<div className='flex flex-col md:flex-row gap-x-20 items-center justify-center mx-auto '>

    {/* Left part */}
    <div><img className='w-[250px] sm:w-[350px] md:w-[400px] lg:w-[500px]' src={Instructor}></img></div>
    {/* Right part */}
    <div className=' mt-16 md:mt-0 md:w-[30%] w-[60%] mx-auto '>
        <div className='text-xl md:text-3xl text-richblack-900'>Become an <span className='text-blue-400'>Instructor</span></div>
        <div className='text-sm text-richblack-400 mt-6 mb-10'>Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</div>
        <Button className='mt-12' active={true} linkTo={'/signup'}>Start Teaching Today</Button>
    </div>
</div>
</div>
       </div>
    )
 }

 export default BecomeInstructor;