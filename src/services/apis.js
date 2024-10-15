// process.env.config();

const BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL


// AUTH ENDPOINTS
export const authEndpoints = {
    SENDOTP_API: BASE_URL + "/auth/generateOtp",
    SIGNUP_API: BASE_URL + "/auth/signIn",
    LOGIN_API: BASE_URL + "/auth/logIn",
    RESET_PASSWORD_GENERATE_TOKEN_API: BASE_URL + "/auth/resetPasswordLink",
    RESET_PASSWORD_API: BASE_URL + "/auth/resetPassword",
} 

export const categoryEndponts = {
    GET_CATEGORIES_API:BASE_URL + "/course/getCategories",
    GET_CATEGORY_PAGE_DETAILS:BASE_URL + "/course/getCategoryPageDetails"
}

// SETTINGS - profile pic ,update password
export const settingsAPI = {
    UPDATE_PROFILE_PIC: BASE_URL + "/profile/updateProfilePic",
    UPDATE_PROFILE_DETAILS: BASE_URL + "/profile/updateProfile",
    UPDATE_PASSWORD: BASE_URL + "/auth/changePassword"
}

// Create Course - 
export const createCourseAPI = {
    // GET
    GET_ALL_COURSES:BASE_URL + "/course/getAllCourses",
    GET_SINGLE_COURSE: BASE_URL + "/course/getSingleCourse",
    GET_SINGLE_COURSE_WITH_PROGRESS:BASE_URL + "/course/getSingleCourseWithProgress",
     GET_INSTRUCTOR_COURSES:BASE_URL + "/course/getInstructorCourses", 

    // POST
    CREATE_COURSE: BASE_URL + "/course/createCourse",
    UPDATE_COURSE:BASE_URL+"/course/updateCourse",
    UPDATE_COURSE_PROGRESS:BASE_URL + "/course/updateCourseProgress",

    ADD_SECTION: BASE_URL + "/course/addSection",
    UPDATE_SECTION:BASE_URL + "/course/updateSection",
    DELETE_SECTION:BASE_URL + "/course/deleteSection",

    ADD_SUB_SECTION:BASE_URL +  "/course/addSubSection",
    UPDATE_SUB_SECTION:BASE_URL + "/course/updateSubSection",
    DELETE_SUB_SECTION:BASE_URL + "/course/deleteSubSection",

    PUBLISH_COURSE: BASE_URL + "/course/publishCourse",
    
    CREATE_REVIEW:BASE_URL + "/course/createReview",
    GET_REVIEWS_OF_COURSE:BASE_URL + "/course/getReviewsOfCourse",
    GET_AVEARGE_RATINGS:BASE_URL + "/course/getAverageRatings",
    GET_ALL_REVIEWS:BASE_URL + "/course/getAllReviews",

    GET_INSTRUCTOR_DASHBOARD:BASE_URL + "/profile/getInstructorDashboard"
}

export const paymentEndpoints = {
    GET_API_KEY:BASE_URL + "/payment/getApiKey",
    CREATE_ORDER:BASE_URL + "/payment/capturePayment",
    VERIFY_SIGNATURE:BASE_URL + "/payment/verifySignature"
}