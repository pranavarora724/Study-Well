
const instance = require('../config/razorpay');
const User = require('../models/User');
const Course = require('../models/Course');
const sendMail = require('../config/emailSender');
const courseEnrollmentTemplate = require('../mailTemplates/courseEnrollmentTemplate');

// We create 2 constrollers
// 1 - To create an order via instance
// Fetch user_id and course_id
// Perform validations
// Create an options object for razorpay
// create the order 
// Retun response


async function capturePayment(req  , res)
{

    try {

        const courseId = req.body.courseId;
        const userId = req.userDetails.id;
    
        const existingUser = await User.findById({userId});
        const existingCourse = await User.findById({courseId});
    
        if(!courseId)
        {
            return res.status(400).json(
                {
                    success:false,
                    message:'Courseid is missing'
                }
            )
        }
    
        if(!existingCourse)
        {
            return res.status(400).json(
                {
                    success:false,
                    message:'Course not exists'
                }
            )
        }
    
        const uid = new mongoose.Types.ObjectId(userId);
    
        const studentsEnrolled = existingCourse.studentsEnrolled;
    
        if(studentsEnrolled.contains(uid) == true)
        {
            return res.status(401).json(
                {
                    success:false,
                    message:'Student is already enrolled for the course'
                }
            )
        }


        // NOW CEATING THE order: 
        const amount = existingCourse.price;
        const currency = "INR";

        const options = {
            amount:amount*100,
            // earlier only 'currency' was written
            currency:currency,
            receipt:Math.random(Date.now()).toString(),
        // Why we add "Course,User id in notes"  => So that We can access later
            notes:{
                courseId:courseId,
                userId:userId
            }
        } 

        const paymentResponse = await instance.orders.create(options);

        console.log("pymentResponse = " , paymentResponse);

        return res.status(200).json(
            {
                success:true,
                message:'Order created',
                courseName:existingCourse.name,
                courseDescription:existingCourse.description,
                thumbnail:existingCourse.thumbnail,
                orderId:paymentResponse.id,
                currency:paymentResponse.currency,
                amount:paymentResponse.amount
            }
        );

    } catch (error) {
        
        return res.status(400).json(
            {
                success:false,
                message:error.message
            }
        )

    }

}


// Now vwerifying signature
// How to authorize paymnet ? ?
// When payment is completed -> 
// Razorpay sends a URL  with a secret n ENCODED format
// So Encode our own secret present in SERVER then compare both encoded secrets
// If verified then enroll student in course

async function verifySignature(req , res)
{
    try {

        const webHookSecret = "12345678";

    // Signature sent by razorpray
    const signature = req.headers["x-razorpay-signature"];

    const shasum = crypto.createHmac("sha256" , webHookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");


    if(signature === digest){
        console.log("Payment is authorized");

        const courseId = req.body.payload.payment.entity.notes.courseId;
        const userId = req.body.payload.payment.entity.notes.userId;

        // So we earlier stored courseId and userId so that wecan get it later
        // 

        const existingUser = await User.findById({userId});

        const updatedCourse = await Course.findByIdAndUpdate(
            {courseId},
            {$push:{studentsEnrolled:userId}},
            {new:true}
        );

        const updatedUser = await User.findByIdAndUpdate(
            {userId},
            {$push:{courses:courseId}},
            {new:true}
        );
        

        // Now Send confirmation MAil to Student
        const mailBody = courseEnrollmentTemplate(updatedCourse.name , updatedUser.firstName);
        const emailResponse = await sendMail(updatedUser.email , "Confirmation Mail" , mailBody);

        console.log("Mail response = " , emailResponse);

        return res.status(200).json(
            {
                success:true,
                message:'Verification Successful'
            }
        )


    }

    // Whn verifiacrion fails
    else{
        return res.status(400).json(
            {
                success:false,
                message:'Verification failed'
            }
        )
    }
        
    } catch (error) {
       
        return res.status(400).json(
            {
                success:false,
                message:'Error while Verification',
                body:error.message
            }
        )
    }
}


module.exports = {
    capturePayment , 
    verifySignature
}