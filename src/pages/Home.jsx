import { GoArrowRight } from "react-icons/go";
import { Link } from "react-router-dom";
import Button from "../components/core/HomePage/Button";
import HomeVideo from '../assets/Images/banner.mp4'
import { IoMdPerson } from "react-icons/io";
import { GiWhiteBook } from "react-icons/gi";
import Frame from '../assets/Images/frame.png';
import { FaArrowRightLong } from "react-icons/fa6";
import CodeBlock from "../components/core/HomePage/CodeBlock";
import TiltedImages from '../components/core/HomePage/TiltedImages';
import SkillsBox from '../components/core/HomePage/SkillsBox';
import BecomeInstructor from '../components/core/HomePage/BecomeInstructor';
import Footer from "../components/common/Footer";

function Home()
{
    return (
        <div>
            {/* Secton 1 */}
            {/* Parent div of section 1 */}
            <div className="flex flex-col w-11/12 max-w-maxContent mx-auto  ">


            {/* Become an instructor */}
                <Link to={'/signup'}>
                <div className="text-richblack-100 font-semibold w-[230px] mx-auto flex flex-row items-center justify-between 
                                px-6 py-2 bg-richblack-700 rounded-full
                                hover:scale-95 transition-all duration-200 cursor-pointer">
                    <span>Become an Instructor</span>
                    <GoArrowRight />
                </div>
             </Link>
             {/* Button ends */}


             {/* Heading */}
             <div className="flex flex-row text-2xl font-semibold text-white gap-x-2 mx-auto mt-6">
                <span>Empower Your Future With </span> 
                <span className="text-blue-100"> Coding Skills</span>
            </div>

             {/* Sub Heading */}
             <div className=" mx-auto mt-6 text-center  text-richblack-200 font-semibold max-w-[850px] w-[90%]">
            With our onine coding courses you can learn at your own place , from anywhere in the world and can get access to a wealth of resources , including hands on projects , quizzes and personalized feedback from instructors
            </div>

            {/* Buttons */}
            <div className="mx-auto flex flex-row gap-x-8 mt-12">
                <Button linkTo={'/signup'} active={true}>Learn More</Button>
                <Button linkTo={'/signup'} active={false}>Book a demo</Button>
            </div>

            {/* Video */}
            <div className="mt-12 mx-auto">
                <video className="h-[300px] md:h-[400px] lg:h-[600px]"
                muted
                autoPlay
                loop
                >
                    <source src={HomeVideo}></source>
                </video>
            </div>
           
            </div>

           


            {/* Section 2 */}
            {/* Parent div of section 2 */}
            <div className="w-11/12 max-w-maxContent  mt-8 mx-auto ">

                {/* 1st Code Block */}
                <div className="md:flex md:flex-row md:justify-around gap-x-6 ">
                   {/* Left part */}
                    <div className=" w-[80%] md:w-[43%] mx-auto">
                        <div className="text-white font-bold text-2xl">Unlock your <span className="text-blue-500"> Coding potential </span> with our online courses</div>
                        <div className="text-sm text-richblack-400">Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.</div>

                        {/* Buttons */}
                        <div className="flex flex-row gap-x-4 mt-8 md:mt-16">
                            <Button active={true} linkTo={'/signup'}>
                                <div className="flex flex-row gap-x-2 items-center text-black">
                                    <div>Try it Yourself</div>
                                    <FaArrowRightLong />
                                </div>
                            </Button>

                            <Button active={false} linkTo={'/signup'}>
                                Learn More
                            </Button>
                            
                        </div>
                    </div>

                    {/* Right Part */}
                    <div className="w-[80%] relative mx-auto md:w-[50%] mt-12 md:mt-0 ">
                        <CodeBlock codeColor={'text-yellow-25'} codeContent={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}></CodeBlock>
                        <div className="absolute w-72 h-72 -top-4 rounded-full border-2 border-white z-20 bg-gradient-to-r from-yellow-5 to-yellow-100 opacity-10 bg-opacity-15 blur-2xl"></div>
                    </div>

                </div>

                {/* 2nd code block */}
                <div className="md:flex md:flex-row-reverse md:justify-around gap-x-6 mt-28">
                   {/* Left part */}
                    <div className=" w-[80%] md:w-[43%] mx-auto">
                        <div className="text-white font-bold text-2xl">Start<span className="text-blue-500"> Coding in seconds </span> </div>
                        <div className="text-sm text-richblack-400">Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson.</div>

                        {/* Buttons */}
                        <div className="flex flex-row gap-x-4 mt-8 md:mt-16">
                            <Button active={true} linkTo={'/signup'}>
                                <div className="flex flex-row gap-x-2 items-center text-black">
                                    <div>Continue Lesson</div>
                                    <FaArrowRightLong />
                                </div>
                            </Button>

                            <Button active={false} linkTo={'/signup'}>
                                Learn More
                            </Button>
                            
                        </div>
                    </div>

                    {/* Right Part */}
                    <div className="w-[80%] relative mx-auto md:w-[50%] mt-12 md:mt-0">
                        <CodeBlock codeColor={'text-yellow-25'} codeContent={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}></CodeBlock>
                        <div className="absolute w-72 h-72 -top-4 rounded-full border-2 border-white z-20 bg-gradient-to-r from-blue-200 to-blue-300 opacity-10 bg-opacity-15 blur-2xl"></div>
                    </div>

                </div>

            </div>

            {/* Section 3 */}
            <div className="relative ">

                {/* Heading */}
                <div className="text-2xl font-semibold text-white text-center mt-28">Unlock The <span className="text-blue-100">Power of Code</span></div>
                <div className="text-center text-richblack-500 text-sm">Learn to build anything you can imagine</div>

                {/* 3 cards */}
                <div className="relative z-20 grid grid-cols-3 gap-x-8 w-10/12 max-w-maxContent mx-auto mt-8 ">

                    {/* First Card */}
                    <div className="bg-white p-4 flex flex-col gap-y-20 shadow-[8.0px_8.0px_2.0px_rgb(255,255,0)]">
                        <div className="">
                          <div className="font-semibold text-xl">Learn HTML</div>
                          <div className="mt-4 text-richblack-600">This Course covers the basic concepts of HTML including creating and structuring web pages , adding text , links , images and more</div>
                        </div>

                        <div className="flex flex-row justify-between border-dotted border-t-2">
                            <div className="flex flex-row gap-x-2 items-center text-blue-400">
                            <IoMdPerson />
                            <div>Beginner</div>
                            </div>
                            
                            <div className="flex flex-row gap-x-2 items-center text-blue-400">
                            <GiWhiteBook />
                            <div>6 Lessons</div>
                            </div>

                        </div>

                    </div>

                    {/* Second Card */}
                    <div className="bg-richblack-800 p-4 flex flex-col gap-y-20">
                        <div className="">
                          <div className="text-2xl text-white">Learn CSS</div>
                          <div className="mt-4 text-richblack-400">This Course covers the basic concepts of HTML and CSS including transitions , animations , layout techniques</div>
                        </div>

                        <div className="flex flex-row justify-between border-dotted border-t-2 text-richblack-400 ">
                            <div className="flex flex-row gap-x-2 items-center">
                            <IoMdPerson />
                            <div>Beginner</div>
                            </div>
                            
                            <div className="flex flex-row gap-x-2 items-center">
                            <GiWhiteBook />
                            <div>6 Lessons</div>
                            </div>

                        </div>
                    </div>

                    {/* Third Card */}
                    <div className="bg-richblack-800 p-4 flex flex-col gap-y-20">
                        <div className="">
                          <div className="text-2xl text-white">Responsive Design</div>
                          <div className="mt-4 text-richblack-400">This Course covers the basic concepts of HTML and CSS including Responsive web designs so that the layout can be adopt different screen sizes</div>
                        </div>

                        <div className="flex flex-row justify-between border-dotted border-t-2 text-richblack-400 ">
                            <div className="flex flex-row gap-x-2 items-center">
                            <IoMdPerson />
                            <div>Beginner</div>
                            </div>
                            
                            <div className="flex flex-row gap-x-2 items-center">
                            <GiWhiteBook />
                            <div>6 Lessons</div>
                            </div>

                        </div>
                    </div>

                    {/* Frame Image */}
                {/* <div className="absolute -bottom-16  w-screen h-48 bg-white "></div> */}

                </div>

                {/* Bottom Backgrnd Image part */}
                <div className="absolute -bottom-[220px] w-screen z-10 bg-white h-[290px] bg-[url('../public/pics/bghome.svg')] flex justify-between items-center">
                      
                      {/* 2 - buttons */}
                      <div className="flex flex-row gap-x-4 mx-auto">
                        <Button active={true} linkTo={'./signup'}>
                        <div className="flex flex-row gap-x-2 items-center text-black">
                                    <div>Explore Full Catalog</div>
                                    <FaArrowRightLong />
                                </div>
                        </Button>
                        <Button active={false} linkTo={'/signup'}>Learn More</Button>
                      </div>

                </div>

                
            </div>

            {/* Section - 4 */}
            <div className="mt-[210px] bg-white pb-12 pt-8">
                <SkillsBox></SkillsBox> 
                <TiltedImages></TiltedImages>   
                           
            </div>

            <BecomeInstructor></BecomeInstructor> 

            {/* Footer */}
            <Footer></Footer>

        </div>
    )
}

export default Home;