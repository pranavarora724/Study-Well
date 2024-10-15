import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { categoryEndponts } from "../services/apis";
import { apiConnector } from "../services/apiConnector";
import { getCategoryPageDetails, getCourseDetails } from "../services/operations/createCourseAPI";
import { useDispatch, useSelector } from "react-redux";
import RatingStars from "../components/common/RatingStars";
import Footer from '../components/common/Footer';
import GetAvgRating from "../utils/avgRating";
import NewSidebar from "../components/common/NewSidebar";
import CourseReviewStars from "../components/Dashboard/ViewCourse/CourseReviewStars";

function CategoryDetails() {
  const { categoryName } = useParams();
  const [catName, setCatName] = useState(categoryName);
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelecteCategory] = useState("");
  const token = useSelector((state) => state.auth.token);

  const [selectedCategoryCourses, setSelectedCategoryCourses] = useState([]);
  const [differentCategoryCourses, setDifferentCategoryCourses] = useState([]);
  const [mostSellingCourses, setMostSellingCourses] = useState([]);

  const list1 = [
    {
      name: "Web D Bootcamp",
      price: 10,
      thumbnail:
        "https://res.cloudinary.com/dzop42vnu/image/upload/v1714571908/StudyNotion/xxauxm9y01yb5vycm8if.jpg",
    },
    {
      name: "Web D Bootcamp",
      price: 10,
      thumbnail:
        "https://res.cloudinary.com/dzop42vnu/image/upload/v1714571908/StudyNotion/xxauxm9y01yb5vycm8if.jpg",
    },
    {
      name: "Web D Bootcamp",
      price: 10,
      thumbnail:
        "https://res.cloudinary.com/dzop42vnu/image/upload/v1714571908/StudyNotion/xxauxm9y01yb5vycm8if.jpg",
    },
    {
      name: "Web D Bootcamp",
      price: 10,
      thumbnail:
        "https://res.cloudinary.com/dzop42vnu/image/upload/v1714571908/StudyNotion/xxauxm9y01yb5vycm8if.jpg",
    },
    {
      name: "Web D Bootcamp",
      price: 10,
      thumbnail:
        "https://res.cloudinary.com/dzop42vnu/image/upload/v1714571908/StudyNotion/xxauxm9y01yb5vycm8if.jpg",
    },
    {
      name: "Web D Bootcamp",
      price: 10,
      thumbnail:
        "https://res.cloudinary.com/dzop42vnu/image/upload/v1714571908/StudyNotion/xxauxm9y01yb5vycm8if.jpg",
    },
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(categoryName);

  async function getCategories() {
    try {
      const response = await apiConnector(
        "GET",
        `${categoryEndponts.GET_CATEGORIES_API}`
      );
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

  async function getCategoryPage(categoryId) {
    const response = await getCategoryPageDetails(
      categoryId,
      token,
      dispatch,
      navigate
    );
    console.log("Page detis = " + response);

    setSelectedCategoryCourses(response?.data?.data?.selectedCategory?.courses);
    setDifferentCategoryCourses(
      response?.data?.data?.differentCategory?.courses
    );
    setMostSellingCourses(response?.data?.data?.mostSellingCourses);
  }

  async function showDetailsHandler(course)
  {
      const result =await  getCourseDetails(course._id , token , dispatch , navigate);
     console.log("COURSE DETAILS = " , result?.data?.body);
      localStorage.setItem('courseDetails' , JSON.stringify(result?.data?.body));
      navigate('/dashboard/courseDetails');
  }

  useEffect(() => {
    getCategories();
  }, []);

//   console.log("Categoery = " , category);
//     const ans = category.filter((el, index) => {
//       return el.name.toLowerCase() === categoryName.replace("-", " ");
//     });
//     console.log("ANS === ", ans[0]);
    // setSelecteCategory(ans[0])
    // setCategory(ans[0]);


  useEffect(() => {
    console.log(category);

    if(category.length>0)
    {
        const ans = category.filter((el, index) => {
            return el.name.toLowerCase() === categoryName.replace("-", " ");
          });
          console.log("ANS === ", ans[0]);
      
          setSelecteCategory(ans[0]);
          getCategoryPage(ans[0]?._id);
      
    }
    // console.log("Category id = ", ans[0]?._id);

    // getCategoryPage(ans[0]?._id);

    // const result = await getCategoryPageDetails(ans[0]._id , token , dispatch , navigate);
    // console.log("CATEGORY PAGE RSULT === " , result);
  }, [ category, categoryName]);

//   console.log("Selected category = ", selectedCategory);

  return (
    <div className="bg-white">
      <NewSidebar></NewSidebar>
      <div className="bg-richblack-700">
        <div className="max-w-[1080px] w-[90%] mx-auto py-14">
          <div className="text-richblack-300">
            Home / Categories /{" "}
            <span className="text-yellow-100">{selectedCategory?.name}</span>
          </div>
          <div className="text-3xl mt-2 text-white">
            {selectedCategory?.name}
          </div>
          <div className="mt-2 text-richblack-100">
            {selectedCategory?.description}
          </div>
        </div>
      </div>

      {
        selectedCategoryCourses && <div className="mt-10">
        <div className="max-w-[1080px] w-[90%] mx-auto ">
          <div className="text-3xl text-richblack-900 font-semibold">
            Courses to get you Started
          </div>
          <div
            className="mt-6 gap-2 grid min-[600px]:grid-cols-[repeat(2,minmax(270px,280px))] min-[900px]:grid-cols-[repeat(3,minmax(270px,280px))] justify-center"
          >
            {selectedCategoryCourses.map((el, index) => {
              return (
                <div  className="text-richblack-900 cursor-pointer hover:scale-95 transition-all duration-150">
                  <div onClick={()=>{showDetailsHandler(el)}} >
                    <img
                      className="w-[250px] h-[250px] object-cover"
                      src={`${el.thumbnail}`}
                    ></img>

                    <CourseReviewStars courseId={el._id}></CourseReviewStars>
                    {/* <div className="flex flex-row items-center gap-x-2">
                        <div className="text-yellow-100">{GetAvgRating(el?.ratingAndReviews)}</div>
                        <div><RatingStars Review_Count={GetAvgRating(el?.ratingAndReviews)}></RatingStars></div>
                        <div className="text-white">({el.ratingAndReviews.length} Reviews)</div>
                        <div className="text-white">{courseDetails.studentsEnrolled.length} Students Enrolled</div>
                    </div> */}
                  </div>

                  <div className="font-semibold">{el?.name}</div>
                  <div>By -  <span className="text-richblack-300">{el?.instructor?.firstName} {el?.instructor?.lastName}</span></div>
                  <div>Rs. {el?.price}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      }

{
        mostSellingCourses && <div className="mt-10">
        <div className="max-w-[1080px] w-[90%] mx-auto ">
          <div className="text-3xl text-richblack-900 font-semibold">
            Top Selling Courses
          </div>
          <div
            className="mt-6 gap-2 grid min-[600px]:grid-cols-[repeat(2,minmax(270px,280px))] min-[900px]:grid-cols-[repeat(3,minmax(270px,280px))] justify-center"
          >
            {mostSellingCourses.map((el, index) => {
              return (
                <div  className="text-richblack-900 cursor-pointer hover:scale-95 transition-all duration-150">
                  <div onClick={()=>{showDetailsHandler(el)}}>
                    <img
                      className="w-[250px] h-[250px] object-cover"
                      src={`${el.thumbnail}`}
                    ></img>

                   <div className="flex flex-row items-center gap-x-2">
                        <div className="text-yellow-100">{GetAvgRating(el?.ratingAndReviews)}</div>
                        <div><RatingStars Review_Count={GetAvgRating(el?.ratingAndReviews)}></RatingStars></div>
                        <div className="text-white">({el.ratingAndReviews.length} Reviews)</div>
                        {/* <div className="text-white">{courseDetails.studentsEnrolled.length} Students Enrolled</div> */}
                    </div>
                  </div>

                  <div className="font-semibold">{el?.name}</div>
                  {/* <div>By -  <span className="text-richblack-300">{el?.instructor?.firstName} {el?.instructor?.lastName}</span></div> */}
                  <div>Rs. {el?.price}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      }

      <Footer></Footer>
    </div>
  );
}
export default CategoryDetails;
