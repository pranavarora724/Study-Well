
import image1 from '../../../assets/Images/FoundingStory.png'

function Section2()
{
    return(
        <div>
            <div className="mt-20 flex flex-col min-[888px]:flex-row items-center max-w-[900px] justify-center gap-x-6 lg:gap-x-20  mx-auto   w-[80%]">

                {/* LEft div */}
                <div className="text-richblack-300 font-semibold max-w-[600px] min-[888px]:w-[60%]">
                    <div className="text-pink-500 text-3xl">Our Founding Story</div>
                    <div className="text-sm mt-6">Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</div>
                    <div className="text-sm mt-5">As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</div>
                </div>

                {/* Right div */}
                <div className='mt-8 min-[888px]:mt-0'>
                    <img src={image1}></img>
                </div>

            </div>


            <div className="mt-20  flex flex-col min-[888px]:flex-row items-center max-w-[900px] justify-center gap-x-6 lg:gap-x-20  mx-auto   w-[80%]">

                {/* Left div */}
                <div className='font-semibold'>
                    <div className='text-brown-400 text-2xl'>Our Vision</div>
                    <div className='mt-10 text-richblack-300'>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</div>
                </div>

                {/* Right div */}
                <div className='mt-10 min-[888px]:mt-0 font-semibold'>
                    <div className='text-2xl text-blue-300'>Our Mission</div>
                    <div className='mt-10 text-richblack-300'>our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</div>
                </div>
            </div>

            <div className='bg-richblack-700 py-10 mt-20 flex flex-row justify-evenly item-center'>
                <div className='font-semibold'>
                    <div className='text-white text-lg sm:text-2xl text-center'>5K</div>
                    <div className=' text-richblack-300'>Active Students</div>
                </div>

                <div className='font-semibold'>
                    <div className='text-white text-lg sm:text-2xl text-center'>10+</div>
                    <div className=' text-richblack-300'>Mentors</div>
                </div>

                <div className='font-semibold'>
                    <div className='text-white text-lg sm:text-2xl text-center'>200+</div>
                    <div className=' text-richblack-300'>Courses</div>
                </div>

                <div className='font-semibold'>
                    <div className='text-white text-lg sm:text-2xl text-center'>50+</div>
                    <div className=' text-richblack-300'>Awards</div>
                </div>

            </div>
        </div>
    )
}

export default Section2;