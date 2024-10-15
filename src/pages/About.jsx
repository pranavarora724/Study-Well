
import about1 from '../assets/Images/aboutus1.webp';
import about2 from '../assets/Images/aboutus2.webp';
import about3 from '../assets/Images/aboutus3.webp';
import { BiSolidQuoteSingleRight } from "react-icons/bi";
import { BiSolidQuoteSingleLeft } from "react-icons/bi";
import Section2 from '../components/core/About Page/Section2';
import GridSection from '../components/core/About Page/GridSection';
import ContactUsForm from '../components/common/ContactUsForm';
import NewSidebar from '../components/common/NewSidebar';

function About() {
    return (
        <div>

            <NewSidebar></NewSidebar>
            {/* Section 1 */}
            {/* Parent Div Of Section 1 */}
            <div>
                <div className="bg-richblack-700 pt-20 pb-48 relative ">
                    <div className="text-2xl text-white font-semibold max-w-[600px] w-[80%] mx-auto text-center">Driving Innovation in Online Education for a <span className="text-blue-300"> Brighter Future </span></div>
                    <div className="text-sm text-richblack-300 font-semibold mt-4 max-w-[600px] w-[80%] mx-auto text-center">Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</div>

                    {/* Images */}
                    <div className='absolute translate-y-[90%] min-[500px]:translate-y-[65%] sm:translate-y-[45%] md:translate-y-[30%] lg:translate-y-[20%] w-[100%]  z-[10]  mx-auto'>
                        <div className='grid grid-cols-3 max-w-[800px] w-[90%]  gap-x-4 mx-auto'>
                            <img className='' src={about1}></img>
                            <img className='' src={about2}></img>
                            <img className='' src={about3}></img>
                        </div>
                    </div>
                </div>

                <div className='mt-40 text-richblack-100 mx-auto  font-semibold border-white max-w-[900px] w-[80%] text-2xl text-center'> <span className='pb-2 text-lg inline-block text-richblack-600'><BiSolidQuoteSingleLeft /></span> We are passionate about revolutionizing the way we learn. Our innovative platform <span className='text-blue-300'> combines technology </span>, expertise, and community to create an unparalleled educational experience. <span className='pb-2 text-lg inline-block text-richblack-600'> <BiSolidQuoteSingleRight /> </span> </div>
            
            </div>

            {/* Section 2 */}
            <Section2></Section2>

            {/* Grid Section */}
            <GridSection></GridSection>

            {/* Contact us form */}
            <div className='mt-20 text-white'>
                <div className='text-2xl text-center text-richblack-800 font-bold'>Get in Touch</div>
                <div className='text-sm mt-2 text-center text-richblack-400'>We would love to hear from you , please fill this form</div>
                <ContactUsForm></ContactUsForm>
            </div>


        </div>
    )
}

export default About;