import {sidebarLinks} from '../../data/dashboard-links'
import SidebarLink from './SidebarLink';
import { CgLogOut } from "react-icons/cg";
import {Logout} from '../../services/operations/authAPI'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import ConfirmationModal from './ConfirmationModal';
import { IoMdArrowDropdown } from "react-icons/io";
import { useEffect } from 'react';
import { apiConnector } from "../../services/apiConnector";
import { categoryEndponts } from '../../services/apis'
import { RxCrossCircled } from "react-icons/rx";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';


function Sidebar()
{
    const [category, setCategory] = useState([]);
    const [displayCategory , setDisplayCategory] = useState(false);

    const user = useSelector((state) => state.profile.user);
    const token = useSelector((state) => state.auth.token);


    // Fetching categories for catalog Section
    async function getCategories() {
        try {
            const response = await apiConnector("GET", `${categoryEndponts.GET_CATEGORIES_API}`)
            console.log("CAtegory API RESPONSE");
            console.log(response);
            let categories = await response?.data?.body;
            console.log("categories = ", categories);
            setCategory(categories);

        } catch (error) {
            console.log("Error in fetching categories");
            console.log(error);
        }
    }

    useEffect(() => {
        getCategories();
    }, [])

    function displayCategoryHandler()
    {
        if(displayCategory == true)
            setDisplayCategory(false);

        else
        setDisplayCategory(true);
    }

    const navigate = useNavigate();
    const dispatch = useDispatch();

    console.log("Sidebar Lonks - " , sidebarLinks);

    const [displayModal , setDisplayModal] = useState(false);

    const {contextSafe} = useGSAP();

//    GSAP animation for closing of sidebar
    const closeSidebarHandler = contextSafe(()=>{
        gsap.to('.sidebar',{
            x:-220,
            duration:1
        })
        
    })

    console.log("Inside sidebar");
    return(
       <div className='sidebar
       h-[100vh] -translate-x-[220px] z-20 max-[768px]:absolute max-[768px]:top-0 max-[768px]:left-0 md:relative md:translate-x-0'>
           <div className="bg-richblack-700  w-[220px] lg:w-[300px]  h-[100%] flex flex-col pt-10 md:pt-0">
            
           {/* CROSS Button */}
           <div className='text-xl text-white absolute top-2 right-2 md:hidden'>
           <RxCrossCircled  onClick={closeSidebarHandler}/>
           </div>
           
            {
                sidebarLinks.map((element , index)=>{
                    return(
                        <div key={index}>
                            {
                                (token)?(<SidebarLink  linkTo={`${element.path}`} iconName={`${element.icon}`} name={`${element.name}`} accountType={`${element.type}`}></SidebarLink>):(<div></div>)
                            }
                        </div>
                    )
                })

            }

            {/* Dotted Line */}
            <div className='h-[1px] w-[100%] border border-dotted border-white border-opacity-80 opacity-80'></div>

            {/* Settings and Logout */}
            <div>
                {
                    (token)?(<SidebarLink linkTo={'/dashboard/settings'} iconName={'VscSettingsGear'} name={'Settings'} accountType={'All'}></SidebarLink>):(<div></div>)
                }
            </div>

            {/* About us */}
            <div className='block md:hidden'>
                <SidebarLink linkTo={'/about'} iconName={'VscInfo'} name={'About'} accountType={'All'}></SidebarLink>
            </div>

            {/* Contact us */}
            <div className='block md:hidden'>
                <SidebarLink linkTo={'/contact'} iconName={'VscMail'} name={'Contact'} accountType={'All'}></SidebarLink>
            </div>

           {/* Catalog */}
           <div className='block md:hidden'>
               <div onClick={displayCategoryHandler} className='flex flex-row gap-x-4 p-4 cursor-pointer hover:bg-richblack-800 text-white font-semibold items-center'>
                   <div>Catalog</div>
                   <IoMdArrowDropdown />
               </div>

               {
                (displayCategory == true) ? 
                // displaying categories
                (<div className='flex flex-col'>
                    {
                        category.map((cat , index) =>{
                            return(
                                <div className='p-4 cursor-pointer hover:bg-richblack-800 text-white font-semibold text-[12px]' key={index}>{cat.name}</div>
                            )
                        })
                    }
                </div>):(<div></div>)
               }
               
           </div>

            {/* Logout */}
            <div onClick={()=>{setDisplayModal(true)}} className='flex flex-row gap-x-4 p-4 text-white font-semibold cursor-pointer hover:bg-richblack-800 items-center'>
                <CgLogOut />
                <div>Logout</div>
            </div>
        </div>
        {
            (displayModal)?(<ConfirmationModal displayModal={displayModal} setDisplayModal={setDisplayModal} />):(<div></div>)
        }

       </div>
    )
}

export default Sidebar;