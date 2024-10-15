import Button from "./Button";

import Logo1 from '../../../assets/TimeLineLogo/Logo1.svg'
import Logo2 from '../../../assets/TimeLineLogo/Logo2.svg'
import Logo3 from '../../../assets/TimeLineLogo/Logo3.svg'
import Logo4 from '../../../assets/TimeLineLogo/Logo4.svg'
import TimeLineImage from '../../../assets/Images/TimelineImage.png'

function SkillsBox()
{
    let data = [
        {
            heading:"Leadership",
            description:"Fully Commited to the success Company",
            image:Logo1
        },
        {
            heading:"Responsibility",
            description:"Students Will always be our top priority",
            image:Logo2
        },
        {
            heading:"Flexibility",
            description:"The ability to switch is an important skill",
            image:Logo3
        },
        {
            heading:"Solve The Problem",
            description:"Code your way to a solution",
            image:Logo4
        }
    ];
    return(
        <div className="w-10/12 mx-auto  mb-12">
            {/* Heading */}
            <div className="flex flex-col md:flex-row gap-x-12 justify-center">
                <div className="text-2xl font-bold">Get The Skills you need <span className="text-blue-600"> For The Job In Demand </span></div>
               
                {/* <div className="flex flex-col gap-y-8 md:w-[40%]"> 
                <div className="text-sm text-richblack-400">The modern StudyWell is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</div>
                <Button  active={true} linkTo={'/signup'}>Learn More</Button>
                </div>             */}
            </div>



            {/* Bottom Part */}
            <div className="flex flex-col-reverse sm:flex-row items-center gap-x-8 mt-8 mx-auto justify-center">

                {/* Left Part */}
                    <div className="flex flex-col gap-y-8 md:w-[30%] w-[80%] mt-20 sm:mt-0">
                        {
                            data.map( (item , index)=>{
                                return(
                                    <div key={index} className="flex flex-row gap-x-4 items-center">
                                        {/* Image */}
                                        <div className="p-2 rounded-full bg-white shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)]"><img className="h-6 w-6" src={item.image}></img></div>
                                        {/* text */}
                                       <div>
                                       <div className="text-lg font-semibold">{item.heading}</div>
                                        <div className="text-sm text-richblack-400">{item.description}</div>
                                       </div>
                                    </div>
                                )
                            } )
                        }
                    </div>

                    {/* Right part */}
                    <div className="lg:w-[550px] md:w-[450px] sm:w-[350px] w-[80%] relative sm:mt-0 mt-6">
                        <img className="" src="pics/heroBgImage.webp"></img>

                        <div className="sm:hidden md:flex h-[100px] w-[70%] absolute -bottom-[50px] translate-x-[20%] mx-auto items-center bg-caribbeangreen-600 flex flex-row justify-around gap-x-2">
                            <div className="flex flex-row text-white items-center gap-x-4">
                                <div className="text-[15px] md:text-2xl font-bold">10</div>
                                <div className="text-[10px] opacity-70">YEARS EXPERIENCES</div>
                            </div>

                            <div className="h-10 w-[1px] opacity-70 border-dotted bg-white border-1"></div>

                            <div className="flex flex-row text-white items-center gap-x-4">
                                <div className="text-[15px] md:text-2xl font-bold">250</div>
                                <div className="text-[10px] opacity-70">TYPES OF COURSES</div>
                            </div>
                        </div>
                    </div>
                
            </div>

            
            <div className="mx-auto w-fit flex flex-row gap-x-8 mt-20">
                <Button linkTo={'/category/web-development'} active={true}>Browse Courses</Button>
                <Button linkTo={'/signup'} active={false}>Book a demo</Button>
            </div>

            
        </div>
    )
}

export default SkillsBox;