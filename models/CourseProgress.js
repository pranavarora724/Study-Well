
const mongoose = require('mongoose');

const courseProgressSchema = new mongoose.Schema(
    {
        courseId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course"
        },

        completedVideos:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"CourseSubSection"
        }]
    }
)

const CourseProgress = mongoose.model("CourseProgress" , courseProgressSchema);
module.exports = courseProgressSchema;