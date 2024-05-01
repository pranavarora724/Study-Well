

const Profile = require('../models/Profile');
const User = require('../models/User');
const Course = require('../models/Course');
const imageDelete = require('../utils/imageDelete');


// Take input from the Of all the fields
// Perform all the validations
// Finfd profile id from user 
// Update the profile as we have already created during USer creation


async function updateProfile(req , res)
{
    const gender = req.body.gender;
    const dob = req.body.dob;
    const about = req.body.about;
    const contactNumber = req.body.contactNumber;

    const userId = req.userDetails.id;

    const existingUser  = await User.findById({userId});
    const profileId = existingUser.profile;

    const profileObject = await Profile.findByIdAndUpdate(
        {profileId},
        {
        gender:gender,
        dob:dob,
        about:about,
        contactNumber:contactNumber
    },
    {new:true}
    );


    return res.status(200).json({
        success:true,
        message:'Profile Successfullty updated',
        profile:profileObject
    })
}


async function deleteAccount(req , res)
{
  try {

    const userId = req.userDetails.id;

    const existingUser = await User.findById({userId});
    const profileId = existingUser.profile;
    const coursesId = existingUser.courses;

    await Profile.findByIdAndDelete({profileId});

    // If sudent remove that student's id from courses he was enrolled
    if(existingUser.accountType === "Student")
    {
        coursesId.forEach( async(singleCourse)=>{
            const updatedCourse = await Course.findByIdAndUpdate(
                {singleCourse},
                {$pull:{studentsEnrolled:userId}},
                {new:true}
            )
        } )
    }
    
    // If instructor delete all courses created by instructor
    if(existingUser.accountType === "Instructor")
    {
        coursesId.forEach( async(singleCourse)=>{
            await Course.findByIdAndDelete({singleCourse})
        } )
    }

    await User.findByIdAndDelete({userId});

    return res.status(200).json(
        {
            success:true,
            message:'User Successfuly deleted'
        }
    )
    
  } catch (error) {
    
    return res.status(400).json(
        {
            success:false,
            message:error.message
        }
    )
  }
}


async function getProfile( req , res)
{
    try {

        
    const userId = req.userDetails.id;

    const profile = User.findById({userId}).
                    populate("profile").
                    exec();
    
    if(!profile)
    {
        return res.status(401).json(
            {
                success:false,
                message:'Invalid profile id'
            }
        )
    }

    return res.status(200).json(
        {
            success:true,
            body:profile
        }
    )
        
    } catch (error) {

        return res.status(500).json(
            {
                success:false,
                message:error.message,
                body:'erro while displaying profile'
            }
        )
        
    }
}

// Controller to upate profile pic 
async function updateProfilePic(req , res)
{
    try {

        

    // If profile pic is not set to null 
    // Matlab vo ek baar already upoased hai cloudinar ype
    // Ou duty is to delete the old profile pic from cloudinary FIRST

    const userId = req.userDetails.id;

    const existingUser = await User.findById({userId});
    if(existingUser.imagePublicId != null)
    {
        // NOW delete old profile pic
        const public_id = existingUser.imagePublicId;
        await imageDelete(public_id);
    }

    const uploadedFile = req.files.profilePic;
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

    const updatedUser = await User.findByIdAndUpdate(
                                                  {userId} , 
                                                  {
                                                    imageUrl:response.secure_url ,
                                                    imagePublicId:response.public_id
                                                  },
                                                  {new:true}
                                                  )

    return res.status(200).json({
        success:true,
        message:'profile pic Successfully updated',
        body:updatedUser
    })
        
    } catch (error) {

        return res.status(500).json(
            {
                success:false,
                message:error.message,
                body:'error in updating profie pic'
            }
        )
        
    }
}

module.exports = {
    updateProfile,
    deleteAccount,
    getProfile , 
    updateProfilePic
}

function isFileTypeSupported(filename , supportedTypes)
{
    console.log("FILENAME = ", filename);
    const x = filename.lastIndexOf(".");
    const type = filename.substring(x+1);
    console.log("File type = " , type);

    return supportedTypes.includes(type);
}