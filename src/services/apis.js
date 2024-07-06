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
    GET_CATEGORIES_API:BASE_URL + "/course/getCategories"
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

    // POST
    CREATE_COURSE: BASE_URL + "/course/createCourse",

    ADD_SECTION: BASE_URL + "/course/addSection",
    UPDATE_SECTION:BASE_URL + "/course/updateSection",
    DELETE_SECTION:BASE_URL + "/course/deleteSection?id",

    ADD_SUB_SECTION:BASE_URL +  "/course/addSubSection",
    UPDATE_SUB_SECTION:BASE_URL + "/course/updateSubSection",
    DELETE_SUB_SECTION:BASE_URL + "/course/deleteSubSection?id",

}