
const Course = require('../models/Course');
const User = require('../models/User');
const Category = require('../models/Category');
const Tag = require('../models/Tag');
const mongoose = require('mongoose');
const imageUploader = require('../utils/imageUploader');

// 1 - We needd to Create Courses
// 2 - Get all the requied details from the frontend
// 3 - Perform Validations
// 4 - Fetch USer ki id from req.user as stored earlier in middlewares "isValid"
// 5 - Add the course id in user
// 6 - Fetch Tag from id and the created course in tag 


 async function createCourse(req , res)
{
   try {

    const {
        name,
        description,
        price,
        tag,
        category,
        whatWillYouLearn ,
        instructions
      } = req.body;
      
    //   Vaidations on course data
      if(!name || !description || !price || !tag || !whatWillYouLearn || !category)
      {
        return res.status(401).json(
            {
                success:false,
                message:"Fill all the required fileds"
            }
        )
      }

    //   VAlidations on course data
      const existingCourse =await Course.find(
        {name:name}
      )

      if(existingCourse)
      {
        return res.status(400).json(
            {
                success:false,
                message:"Course with same already exisists"
            }
        )
      }

    //   Validations on Uploaded image

    const uploadedFile = req.files.thumbnailImage;
    const supportedTypes = ["jpg" , "jpeg" , "png"]

    if(isFileTypeSupported(uploadedFile.name , supportedTypes) == false)
    {
        return res.status(401).json({
            success:false,
            message:"File type is not supported"
        })
    }

    const fileSizeinMB = uploadedFile.size/(1024*1024);
    console.log("File size in mb = ",fileSizeinMB);

    if(fileSizeinMB>=1)
    {
        return res.status(402).json(
            {
                success:false,
                message:"Image too huge"
            }
        )
    }

    console.log("Uploading to StudyNotion folder");
    const response =  await imageUploader(uploadedFile , "StudyNotion");
    console.log("Response = " , response); 


    // aFTER performing all the validations

    const userId = req.userDetails.id;
    const id = new mongoose.Types.ObjectId(userId);

    // Uploading Course
    const uploadedCourse = await Course.create(
        {
            name:name,
            description:description,
            instructor:userDetails.id,
            whatWillYouLearn:whatWillYouLearn,
            price:price,
            thumbnail:response.secure_url,
            tag:tag,
            category:category,
            instructions:instructions,
            status:"Draft"
        }
    );

    // Update User and Tag and Category Schema by adding this course in it
    
    const updatedUser = await User.findOneAndUpdate(
        {_id: id},
        {$push: {courses:uploadedCourse._id}},
        {new:true}
    );

    const catId = new mongoose.Types.ObjectId(category);

    const updatedCategory = await Category.findOneAndUpdate(
        {_id: catId},
        {$push:{courses:uploadedCourse._id}},
        {new:true}
    );


// We will recerive an array of tags 
// So har tag ke schema k andar update course id

    // tag.forEach( async(singleTag , index) =>{
    //     const updatedTag = await Tag.findByIdAndUpdate(
    //         {singleTag},
    //         {$push:{courses:uploadedCourse._id}},
    //         {new:true}
    //     )
    // } );


    return res.status(200).json(
        {
            success:true,
            message:'Course created successfully',
            body:uploadedCourse
        }
    )
    
   } catch (error) {

    return res.status(500).json(
        {
            success:false,
           message:error.message,
           body:uploadedCourse
        }
    )
   }

}

// Create controller for Shwoing all courses lists

async function getAllCourses(req , res)
{
    try {

        const allCourses = Course.find({});

        return res.status(200).json(
            {
                success:true,
                message:'All courses are',
                body:allCourses
            }
        )
        
    } catch (error) {
        
        return res.status(400).json({
            success:false,
            message:error.message
        })
    }
}


// Get single course by pouating all the fields
// No object id should be present 
async function getSingleCourse(req , res)
{
    try {

        const courseId = req.body.courseId;

        const existingCourse = await Course.findById({courseId})
                                           .populate({path:"instructor", 
                                                                 populate:{
                                                                    path:"additionalDetails"
                                                                 } } )
                                           .populate({path:"studentsEnrolled" , select:"name -_id" } )
                                           .populate({path:"tag" , select:"name -_id"})
                                           .populate({path:"category" , select:"name -_id"})
                                           .populate({path:"ratingAndReviews" , select:"reveiw -id"})
                                           .exec();

    return res.status(200).json(
        {
            success:true,
            message:'Course details are',
            body:existingCourse
        }
    )
        
    } catch (error) {

        return res.status(500).json(
            {
                success:false,
                message:error.message,
                body:'error in displaying course'
            }
        )
    }

}


module.exports = {
    createCourse,
    getAllCourses,
    getSingleCourse
}


function isFileTypeSupported(filename , supportedTypes)
{
    console.log("FILENAME = ", filename);
    const x = filename.lastIndexOf(".");
    const type = filename.substring(x+1);
    console.log("File type = " , type);

    return supportedTypes.includes(type);
}