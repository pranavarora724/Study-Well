
import { Link, NavLink, useNavigate } from "react-router-dom";
import { NavbarLinks } from "../../data/navbar-links";
import Logo from '../../assets/Logo/Logo-Small-Light.png';
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileIcon from '../auth/ProfileIcon'
import { apiConnector } from "../../services/apiConnector";
import { categoryEndponts } from '../../services/apis'
import { useEffect, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { CgLogOut } from "react-icons/cg";
import {Logout} from '../../services/operations/authAPI'
import { RxHamburgerMenu } from "react-icons/rx";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";


function Navbar() {

    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const token = useSelector((state) => state.auth.token);
    const user = useSelector((state) => state.profile.user);
    const cartItems = useSelector((state) => state.cart.cartItems);
    const cartItemsLength = useSelector((state) => state.cart.cartItemsLength);
    const [category, setCategory] = useState([]);

    // console.log("Token = ", token);
    // console.log("User = ", user);
    // console.log("cartItems = ", cartItems);

    // let response = null;

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


    function matchRouteLocation(path) {
        if (path == location.pathname)
            return true;
        else
            return false;
    }

    function categoryHandler(link)
    {
        navigate(link);
    }

    // GSAP animation for opening of sidebar
    const {contextSafe} = useGSAP();

    const openSidebarHandler = contextSafe(()=>{
        gsap.to('.sidebar',{
            x:0,
            duration:1
        })
        gsap.from('.link' , {
            x:-20,
            duration:0.5,
            stagger:0.1,
            delay:0.6,
            opacity:0
        })
    })
    return (
        <div className="flex items-center justify-center  w-screen mt-2 bg-richblack-900">
            <div className="w-11/12 max-w-maxContent  flex flex-row mx-auto justify-between items-center">

               {/* Hamburger ICONN for Sidebar */}
               <div className="block md:hidden text-white text-2xl">
               <RxHamburgerMenu onClick={openSidebarHandler} />
               </div>


                {/* Logo */}
                <NavLink to={'/'}>
                <div className="">
                    <img className="" src={Logo}></img>
                </div>
                </NavLink>

                {/* Links */}
                <div className="hidden md:flex md:flex-row gap-x-4 text-white md:justify-center">

                    {

                        NavbarLinks.map((NavLink, index) => {

                            return (
                                (NavLink.title === "Catalog") ? (
                                    // Handling Catalog
                                    <div className="hover:cursor-pointer group relative" key={index}>
                                        {NavLink.title}
                                        <div key={index} className="invisible  transition-all duration-200 opacity-0 group-hover:opacity-90 group-hover:visible group-hover:flex group-hover:flex-col text-black bg-richblack-25   absolute rounded-xl w-[200px] p-4  -translate-x-[20%] z-50">
                                            {

                                                category.map((cat, index) => {

                                                    const link = "category/" + cat.name.toLowerCase().replace(' ','-');
                                                    console.log(link);
                                                    return (
                                                        <div onClick={()=>{categoryHandler(link)}} key={index} className="cursor-pointer hover:bg-richblack-100 p-2 rounded-xl"> 
                                                         {cat.name}
                                                         </div> 
                                                        // <NavLink to={`/category`}><div>{cat.name}</div></NavLink>
                                                    )
                                                })
                                            }

                                        </div>
                                    </div>) : (
                                    // Handling other parts
                                    <Link key={index} to={NavLink.path}>
                                        <div className={`${matchRouteLocation(NavLink.path) ? "text-yellow-100" : ""}`}>{NavLink.title}</div>
                                    </Link>
                                )
                            )
                        })
                    }

                </div>

                {/* Buttons */}
                <div className="flex items-center">
                    {
                        (token) ?
                            // User logged in
                            (<div className="flex flex-row gap-x-4 py-2 items-center text-white">

                                {/* Cart */}
                                {
                                    (user?.accountType === "Student") ?
                                        // Display cart
                                        (<Link to="/dashboard/cart" className="relative">
                                            <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
                                            {cartItemsLength > 0 && (
                                              <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                                                {cartItemsLength}
                                              </span>
                                            )}
                                          </Link>) :
                                        // Not Display Cart
                                        (<div></div>)
                                }
                                {/* PRofileICon */}
                                <div><ProfileIcon user={user} /></div>

                                {/* Drop DOwn Link */}
                                <div className="relative group">
                                    <div className="text-white text-2xl"><IoMdArrowDropdown /></div>
                                    <div className="invisible  transition-all duration-200 opacity-0 group-hover:opacity-90 group-hover:visible group-hover:flex group-hover:flex-col text-white bg-richblack-500   absolute rounded-xl w-fit p-4  gap-y-2 -translate-x-[20%] z-50">
                                        
                                        {/* Logout */}
                                        <div className="flex flex-row gap-x-4 items-center cursor-pointer">
                                            <CgLogOut />
                                            <div onClick={()=>{Logout(navigate , dispatch)}}>Log Out</div>
                                        </div>

                                        {/* Dashboard */}
                                        <NavLink to={'/dashboard/my-profile'} className='flex flex-row gap-x-4 items-center'>
                                           <CgProfile />
                                           <div>Dashboard</div>
                                        </NavLink>
                                    
                                    </div>
                                </div>


                            </div>) :
                            // USer not logged in
                            (<div className="flex flex-row gap-x-4">
                                <Link to={'/signup'}>
                                    <div className="px-4  py-2 my-2 rounded cursor-pointer bg-richblack-700 text-richblack-100 border border-richblack-400">Sign Up</div>
                                </Link>

                                <Link to={'/login'}>
                                    <div className="px-4 py-2  my-2 rounded cursor-pointer bg-richblack-700 text-richblack-100 border border-richblack-400">Log In</div>
                                </Link>
                            </div>)
                    }
                </div>

            </div>
        </div>
    )
}

export default Navbar;