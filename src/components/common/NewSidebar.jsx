import { RxCrossCircled } from "react-icons/rx";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { IoMdArrowDropdown } from "react-icons/io";
import { useEffect, useState } from "react";
import { apiConnector } from "../../services/apiConnector";
import { categoryEndponts } from "../../services/apis";

function NewSidebar() {
  const token = useSelector((state) => state.auth.token);
  const location = useLocation();
  const { contextSafe } = useGSAP();

  
  const [category, setCategory] = useState([]);
  const [displayCategory, setDisplayCategory] = useState(false);

  const closeSidebarHandler = contextSafe(() => {
    gsap.to(".sidebar", {
      x: -220,
      duration: 1,
    });
  });

  function displayCategoryHandler() {
    if (displayCategory == true) setDisplayCategory(false);
    else setDisplayCategory(true);
  }

  console.log("Localtion == ", location.pathname);

  async function getCategories() {
    try {
      const response = await apiConnector(
        "GET",
        `${categoryEndponts.GET_CATEGORIES_API}`
      );
      // console.log("CAtegory API RESPONSE");
      console.log(response);
      let categories = await response?.data?.body;
      // console.log("categories = ", categories);
      setCategory(categories);
    } catch (error) {
      console.log("Error in fetching categories");
      console.log(error);
    }
  }

  useEffect(()=>{
    getCategories();
  } , [])

  return (
    <div
      className="
        sidebar
        md:hidden
        h-[100vh] -translate-x-[220px] z-20 max-[768px]:absolute max-[768px]:top-0 max-[768px]:left-0"
    >
      <div className="h-[100%] flex flex-col pt-10 bg-richblack-700  w-[220px]">
        <div className="text-xl text-white absolute top-2 right-2 md:hidden">
          <RxCrossCircled onClick={closeSidebarHandler} />
        </div>

        {!token ? (
          <div>
            <NavLink
              className={`flex flex-row gap-x-4 p-4 cursor-pointer hover:bg-richblack-800 text-white font-semibold items-center
                        ${
                          "/" == location.pathname
                            ? `bg-yellow-400 hover:bg-yellow-300`
                            : ``
                        }`}
              to={"/"}
            >
              Home
            </NavLink>

            <NavLink
              className={`flex flex-row gap-x-4 p-4 cursor-pointer hover:bg-richblack-800 text-white font-semibold items-center
                        ${
                          "/about" == location.pathname
                            ? `bg-yellow-400 hover:bg-yellow-300`
                            : ``
                        }`}
              to={"/about"}
            >
              About
            </NavLink>

            {/* <NavLink className={`flex flex-row gap-x-4 p-4 cursor-pointer hover:bg-richblack-800 text-white font-semibold items-center
                        ${("/contact" == location.pathname) ? (`bg-yellow-400 hover:bg-yellow-300`) : (``)}`} to={'contact'}>Contact Us</NavLink> */}
            <div className="block md:hidden">
              <div
                onClick={displayCategoryHandler}
                className="flex flex-row gap-x-4 p-4 cursor-pointer hover:bg-richblack-800 text-white font-semibold items-center"
              >
                <div>Catalog</div>
                <IoMdArrowDropdown />
              </div>

              {displayCategory == true ? (
                // displaying categories
                <div className="flex flex-col">
                  {category.map((cat, index) => {
                   const link = "/category/" + cat.name.toLowerCase().replace(' ','-');
                    return (
                      <NavLink
                      to={link}
                        className={`p-4 cursor-pointer hover:bg-richblack-800 text-white font-semibold text-[12px]
                            ${((link) == location.pathname)?('bg-yellow-400'):('')}
                            `}
                        key={index}
                      >
                        {cat.name}
                      </NavLink>
                    );
                  })}
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        ) : (
          <div>
            <NavLink
              className={`flex flex-row gap-x-4 p-4 cursor-pointer hover:bg-richblack-800 text-white font-semibold items-center
                        ${
                          "/" == location.pathname
                            ? `bg-yellow-400 hover:bg-yellow-300`
                            : ``
                        }`}
              to={"/"}
            >
              Home
            </NavLink>

            <NavLink
              className={`flex flex-row gap-x-4 p-4 cursor-pointer hover:bg-richblack-800 text-white font-semibold items-center
                        ${
                          "/dashboard/my-profile" == location.pathname
                            ? `bg-yellow-400 hover:bg-yellow-300`
                            : ``
                        }`}
              to={"/dashboard/my-profile"}
            >
              Dashboard
            </NavLink>

            <div className="block md:hidden">
              <div
                onClick={displayCategoryHandler}
                className="flex flex-row gap-x-4 p-4 cursor-pointer hover:bg-richblack-800 text-white font-semibold items-center"
              >
                <div>Catalog</div>
                <IoMdArrowDropdown />
              </div>

              {displayCategory == true ? (
                // displaying categories
                <div className="flex flex-col">
                  {category.map((cat, index) => {
                    const link = "/category/" + cat.name.toLowerCase().replace(' ','-');
                    return (
                      <NavLink
                      to={link}
                        className={`p-4 cursor-pointer hover:bg-richblack-800 text-white font-semibold text-[12px]
                            ${((link) == location.pathname)?('bg-yellow-400'):('')}
                            `}
                        key={index}
                      >
                        {cat.name}
                      </NavLink>
                    );
                  })}
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default NewSidebar;
