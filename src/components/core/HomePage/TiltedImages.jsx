import compare_with_others from '../../../assets/Images/Compare_with_others.png';
import know_your_progress from '../../../assets/Images/Know_your_progress.png';
import plan_your_lesson from '../../../assets/Images/Plan_your_lessons.png';
import Button from './Button';


function TiltedImages()
{
    return(
        <div className="w-10/12 mx-auto mt-24">

                {/* heading */}
            <div className="text-lg sm:text-2xl font-bold text-center">Your Swiss Knife for <span className="text-blue-400">learning any language</span></div>
            <div className="mx-auto text-center max-w-[600px] w-[80%] mt-4 text-sm text-richblack-600 font-semibold">Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.</div>

            {/* .Images */}
            <div className='flex flex-row gap-x-2 mx-auto justify-center items-center flex-wrap mt-20'>
                <img className='w-[300px] h-[300px]' src={know_your_progress}></img>
                <img className='w-[300px] h-[300px]' src={compare_with_others}></img>
                <img className='w-[300px] h-[300px]' src={plan_your_lesson}></img>
            </div>

            {/* Button */}
            <div className='flex flex-row w-fit mx-auto mt-12'>
                <Button className='justify-center mx-auto ' active={true} linkTo={'/signup'}>Learn More</Button>
            </div>

        </div>
    )
}

export default TiltedImages;