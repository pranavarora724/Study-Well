

const express = require('express');
const router = express.Router();

const {createCourse , getAllCourses , getSingleCourse } = require('../controllers/Course');
const {createTag , getTags} = require('../controllers/Tag');
const {createCategory , getCategories , getCategoryPageDetails} = require('../controllers/Category');
const {addSection , deleteSection , updateSection} = require('../controllers/CourseSection');
const {addSubSection , deleteSubSection , updateSubSection} = require('../controllers/CourseSubSection');
const{createReviewAndRating , getAllRatingsAndReviews , getAllReviewsAndRtingsOfACourse , getAverageRatings} = require('../controllers/RatingAndReview');

// We need middlewares also
const {isValid , isStudent , isInstructor , isAdmin} = require('../middlewares/auth');



// First CATEGORY ROUTES
// OPEN FOR ALL NON LOGGED IN USER ALSO
router.post('/createCategory'  , isValid , isAdmin , createCategory);
router.get('/getCategories' ,  getCategories);
router.get('/getCategoryPageDetails' ,  getCategoryPageDetails);



// Getting Course Details
// OPEN FOR ALL NON LOGGED IN USES ALSO
router.get('/getAllCourses' ,  getAllCourses);
router.get('/getSingleCourse' ,  getSingleCourse);




// Creating ALL Courses
router.post('/createCourse' , isValid , isInstructor , createCourse);
router.post('/addSection' , isValid , isInstructor , addSection);
router.put('/updateSection' , isValid , isInstructor , updateSection);
router.delete('/deleteSection' , isValid , isInstructor , deleteSection);
router.post('/addSubSection' , isValid , isInstructor , addSubSection);
router.put('/updateSubSection' , isValid , isInstructor , updateSubSection);
router.delete('/deleteSubSection' , isValid , isInstructor , deleteSubSection);


// Creating RatingsAndReviews Routes
router.post('/createReview' , isValid , isStudent , createReviewAndRating);
router.get('/getReviewsOfCourse' , isValid , getAllReviewsAndRtingsOfACourse);
router.get('/getAverageRatings' ,  isValid , getAverageRatings);
router.get('/getAllReviews' ,  isValid , getAllRatingsAndReviews);

module.exports = router;