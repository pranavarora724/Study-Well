
import Logo from '../../assets/Logo/Logo-Full-Light.png';
import { FaFacebook } from "react-icons/fa6";
import { FaGoogle } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

function Footer()
{
    return(
        <div className='w-[100%] pt-20 bg-richblack-800'>
            <div className="py-6 w-11/12 mx-auto justify-center  grid grid-cols-[repeat(auto-fit,minmax(200px,220px))] ">

<div className='text-richblack-500'>
    <div><img src={Logo}></img></div>
    <div className=' mt-2 font-bold text-richblack-300 cursor-pointer'>Company</div>
    <div className='mt-2 cursor-pointer'>About</div>
    <div className='mt-2 cursor-pointer'>Affiliates</div>
    <div className='mt-2 flex flex-row gap-x-2 text-richblack-300 cursor-pointer'>
    <FaFacebook />
    <FaGoogle />
    <FaTwitter />
    <FaYoutube />
    </div>
</div>


<div className='text-richblack-600'>
    
    <div className='cursor-pointer mt-2 font-bold text-richblack-100'>Resources</div>
    <div className='mt-2 cursor-pointer'>Articles</div>
    <div className='mt-2 cursor-pointer'>Chart Sheet</div>
    <div className='mt-2 cursor-pointer'>Code Challenges</div>
    <div className='mt-2 cursor-pointer'>Docs</div>
    <div className='mt-2 cursor-pointer'>Projects</div>
    <div className='mt-2 cursor-pointer'>Videos</div>
    <div className='mt-2 cursor-pointer'>Workspaces</div>
    <div className='mt-4 cursor-pointer text-richblack-100'>Support</div>
    <div className='mt-2 cursor-pointer'>Help Center</div>
    
</div>

<div className='text-richblack-600'>
    
    <div className=' mt-2 font-bold text-richblack-100 cursor-pointer'>Plans</div>
    <div className='mt-2 cursor-pointer'>Paid memberships</div>
    <div className='mt-2 cursor-pointer'>For Students</div>
    <div className='mt-2 cursor-pointer'>Business solutions</div>
    <div className='mt-4 text-richblack-100 cursor-pointer'>Community</div>
    <div className='mt-2 cursor-pointer'>Forums</div>
    <div className='mt-2 cursor-pointer'>Chapters</div>
    <div className='mt-2 cursor-pointer'>Events</div>
    
</div>

<div className='text-richblack-600'>
    
    <div className=' mt-2 font-bold cursor-pointer text-richblack-100'>Subjects</div>
    <div className='mt-2 cursor-pointer'>AI</div>
    <div className='mt-2 cursor-pointer'>Cloud Computing</div>
    <div className='mt-2 cursor-pointer'>Code Foundations</div>
    <div className='mt-2 cursor-pointer'>Computer Science</div>
    <div className='mt-2 cursor-pointer'>Cyber Security</div>
    <div className='mt-2 cursor-pointer'>Data Analysis</div>
    <div className='mt-2 cursor-pointer'>Data Visualization</div>
    <div className='mt-2 cursor-pointer'>Developer Tools</div>
    <div className='mt-2 cursor-pointer'>Devops</div>
    <div className='mt-2 cursor-pointer'>Game Development</div>
    <div className='mt-2 cursor-pointer'>IT</div>
    <div className='mt-2 cursor-pointer'>Machine Learning</div>
    <div className='mt-2 cursor-pointer'>Math</div>
    <div className='mt-2 cursor-pointer'>Mobile Development</div>
    <div className='mt-2 cursor-pointer'>Web Design</div>
    <div className='mt-2 cursor-pointer'>Web Development</div>
  
    
</div>


<div className='text-richblack-600'>
    
    <div className=' mt-2 cursor-pointer font-bold text-richblack-100'>Languages</div>
    <div className='mt-2 cursor-pointer'>Bash</div>
    <div className='mt-2 cursor-pointer'>C#</div>
    <div className='mt-2 cursor-pointer'>C++</div>
    <div className='mt-2 cursor-pointer'>Go</div>
    <div className='mt-2 cursor-pointer'>HTML & CSS</div>
    <div className='mt-2 cursor-pointer'>Java</div>
    <div className='mt-2 cursor-pointer'>JavaScript</div>
    <div className='mt-2 cursor-pointer'>GoLang</div>
    <div className='mt-2 cursor-pointer'>Kotlin</div>
    <div className='mt-2 cursor-pointer'>PHP</div>
    <div className='mt-2 cursor-pointer'>R</div>
    <div className='mt-2 cursor-pointer'>Ruby</div>
    <div className='mt-2 cursor-pointer'>SQL</div>
    <div className='mt-2 cursor-pointer'>Swift</div>
    
</div>

<div className='text-richblack-600'>
    
    <div className=' mt-2 cursor-pointer font-bold text-richblack-100'>Career Building</div>
    <div className='mt-2 cursor-pointer'>Career Paths</div>
    <div className='mt-2 cursor-pointer'>Career Services</div>
    <div className='mt-2 cursor-pointer'>Interview Prep</div>
    <div className='mt-2 cursor-pointer'>Professional Certification</div>
    <div className='mt-4 cursor-pointer'>Full Catalog</div>
    <div className='mt-2 cursor-pointer'>Beta Content</div>
    
</div>


</div>
        </div>
    )
}

export default Footer;