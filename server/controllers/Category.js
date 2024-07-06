
const Category = require('../models/Category');
const mongoose = require('mongoose');
const Course = require('../models/Course');

async function createCategory(req , res)
{

    try {
        
        const name = req.body.name;
        const description = req.body.description;
    
        const newCategory = new Category(
            {
                name:name,
                description:description
            }
        )
    
        if(!name || !description)
        {
            return res.status(401).json(
               {
                success:false,
                message:'Fill all fields'
               }
            )
        }
    
        const existingCategory = await Category.findOne(
            {name:name}
        );
    
        if(existingCategory)
        {
            return res.status(401).json({
                success:false,
                message:'Category already exiss'
            })
        }
    
        const savedCategory = await newCategory.save(newCategory);
    
        return res.status(200).json(
        {
            success:true,
            message:'Category successfully created',
            category:savedCategory
        }
        )

    } catch (error) {
        
        return res.status(500).json(
            {
                success:false,
                message:error.message,
                body:'error while creating category'
            }
        )
    }
}

 async function getCategories(req , res)
    {
        console.log("Fetchng categories");
        try {
            console.log("Fetcing categories");
            const allCategories  =await Category.find({});

            return res.status(200).json(
                {
                success:true,
                message:'All categories are',
                body:allCategories
                }
            )
            
        } catch (error) {
            
            console.log(error.message);
            return res.status(400).json(
                {
                    success:false,
                    message:error.message
                }
            )
            
        }
}


    // Created this handler function to return 
    // Courses of same caegory
    // Courses of diff category
    // TOP selling courses throuh number of students enrolled

    async function getCategoryPageDetails(req , res)
    {
        try {

            const categoryId = req.body.categoryId;

            if(!categoryId)
            {
                return res.status(400).json(
                    {
                        success:false,
                        message:'Category Id is missing'
                    }
                )
            }

            const existingCategory = Category.findById({categoryId});

            if(!existingCategory)
            {
                return res.status(400).json(
                    {
                        success:false,
                        message:'Invalid category id'
                    }
                )
            }


            const categoryCourses = await Category.findById(
                                            {categoryId}    
                                        ).populate({path:'courses' , select:'name'})
                                        .exec();
            
            // Find Diff categories
            const diffCategories = await Category.findById(
                {_id: {$ne: new mongoose.Schema.Types.ObjectId(categoryId)}}
            ).populate("courses").exec(); 


            const topSellingCourses = Course.find(
                {},
            ).sort({studentsEnrolled : -1})
        .limit(5).exec();


        return res.status(200).json(
            {
                success:true,
                categoryCourses:categoryCourses,
                topSellingCourses:topSellingCourses
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

module.exports = {
    createCategory,
    getCategories,
    getCategoryPageDetails
}
