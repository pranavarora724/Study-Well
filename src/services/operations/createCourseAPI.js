import { apiConnector } from '../apiConnector'
import toast from 'react-hot-toast'
// import {setCourse} from '../../slices/courseSlice'
import {categoryEndponts, createCourseAPI} from '../apis'
import { setStep , setCourseObject} from '../../slices/courseSlice'
import{resetCart} from '../../slices/cartSlice'
import {setToken} from '../../slices/authSlice'
import {setProfile} from '../../slices/profileSlice'

export async function createCourse(name ,
     description ,
      instructor ,
       whatWillYouLearn ,
        price ,
         thumbnailmage ,
          tag ,
           category ,
            instructions ,
             dispatch ,
            step,
        token ,
    navigate)
{

    const toastId = toast.loading('Loading...');
    try {

        const obj = {
            thumbnailmage:thumbnailmage
          };
          const json = JSON.stringify(obj);
          const blob = new Blob([json], {
            type: 'application/json'
          });

        const response = await apiConnector("POST" , `${createCourseAPI.CREATE_COURSE}` , 
            {
                name:name,
                description:description,
                price:price,
                tag:JSON.stringify(tag),
                category:category,
                whatWillYouLearn:whatWillYouLearn,
                instructions:JSON.stringify(instructions),
                thumbnailImage:thumbnailmage,
                instructor:instructor,
            },
            {
                
                "Content-Type": "multipart/form-data",
                'Accept': 'application/json',
                 Authorisation: `Bearer ${token}`,
            }
        )

        console.log("Printing Add Course Info  Response");
        console.log(response);

        if (response?.data?.success == false)
            throw new Error(response?.data?.message);

        toast.success('Course Details Added Successfully');

        // Add to locl storage and update value of step
        localStorage.setItem("course" , JSON.stringify(response?.data?.body));
        localStorage.setItem("step" , step+1);
        dispatch(setStep(step+1));
        dispatch(setCourseObject(response?.data?.body));
        
    } catch (error) {
        console.log(error);
        if(error?.response?.data?.message?.message)
        {
            toast.error(error?.response?.data?.message?.message)
            dispatch(setToken(null));
            dispatch(setProfile(null));
            dispatch(resetCart());
        
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate('/')
        }
            
        else
        {
            console.log(error?.response?.data?.message);
        toast.error(error?.response?.data?.message);
        }
        
    }

    toast.remove(toastId);
}

export async function editCourseFunction(
    course_id,
    name ,
     description ,
       whatWillYouLearn ,
        price ,
          tag ,
            instructions ,
            status ,
             dispatch ,
        token ,
    navigate)
{

    const toastId = toast.loading('Loading...');
    try {

        const response = await apiConnector("PUT" , `${createCourseAPI.UPDATE_COURSE}` , 
            {
                name:name,
                description:description,
                price:price,
                tag:JSON.stringify(tag),
                // category:category,
                whatWillYouLearn:whatWillYouLearn,
                instructions:JSON.stringify(instructions),
                course_id:course_id,
                status:status
                // thumbnailImage:thumbnailmage,
                // instructor:instructor,
            },
            {
                
                "Content-Type": "multipart/form-data",
                'Accept': 'application/json',
                 Authorisation: `Bearer ${token}`,
            }
        )

        console.log("Printing edit course Info  Response");
        console.log(response);

        if (response?.data?.success == false)
            throw new Error(response?.data?.message);

        toast.success('Course Details updated Successfully');
        toast.remove(toastId);

        return response;

    } catch (error) {
        console.log(error);
        if(error?.response?.data?.message?.message)
        {
            toast.error(error?.response?.data?.message?.message)
            dispatch(setToken(null));
            dispatch(setProfile(null));
            dispatch(resetCart());
        
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate('/')
        }
            
        else
        {
            console.log(error?.response?.data?.message);
        toast.error(error?.response?.data?.message);
        }
        
    }

    toast.remove(toastId);
}

export async function createCourseSection(name , courseId , dispatch ,token , navigate)
{
    const toastId = toast.loading('Loading...')
    try {

        const response = await apiConnector("POST" , `${createCourseAPI.ADD_SECTION}` , 
            {
                name:name,
                course_id:courseId
            },
            {
                // "Content-Type": "multipart/form-data",
                Authorisation: `Bearer ${token}`,
            }
        )

        console.log("Printing Add Section Response ");
        console.log(response);

        if (response?.data?.success == false)
            throw new Error(response?.data?.message);

        toast.success('Course Section Created');
        localStorage.setItem("course" , JSON.stringify(response?.data?.body));
        localStorage.setItem("courseDetails" , JSON.stringify(response?.data?.body));

        dispatch(setCourseObject(response?.data?.body));
        
    } catch (error) {
        console.log(error);
        if(error?.response?.data?.message?.message)
            {
                toast.error(error?.response?.data?.message?.message)
                dispatch(setToken(null));
                dispatch(setProfile(null));
                dispatch(resetCart());
            
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                navigate('/')
            }
                
            else
            {
                console.log(error?.response?.data?.message);
            toast.error(error?.response?.data?.message);
            }
    }
    toast.remove(toastId);
}

export async function updateCourseSection(name , sectionId , dispatch ,token , navigate){

    const toastId = toast.loading('Loading...');

    try {

        const response = await apiConnector("PUT" , `${createCourseAPI.UPDATE_SECTION}` , 
            {
                name:name,
                section_id:sectionId
            },
            {
                "Content-Type": "multipart/form-data",
                Authorisation: `Bearer ${token}`,
            }
        )

        console.log("Printing Update Section Response ");
        console.log(response);

        if (response?.data?.success == false)
            throw new Error(response?.data?.message);

        localStorage.setItem("course" , JSON.stringify(response?.data?.body));
        localStorage.setItem("courseDetails" , JSON.stringify(response?.data?.body));

        dispatch(setCourseObject(response?.data?.body));
        

        toast.success('Course Section Updated');
        
    } catch (error) {
        if(error?.response?.data?.message?.message)
            {
                toast.error(error?.response?.data?.message?.message)
                dispatch(setToken(null));
                dispatch(setProfile(null));
                dispatch(resetCart());
            
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                navigate('/')
            }
                
            else
            {
                console.log(error?.response?.data?.message);
            toast.error(error?.response?.data?.message);
            }
    }

    toast.remove(toastId);

}

export async function deleteSection(sectionId , dispatch , token , navigate)
{
    const toastId = toast.loading('Loading...');

    try {

        const response = await apiConnector("DELETE" , `${createCourseAPI.DELETE_SECTION}`,
            {},
            {
                // "Content-Type": "multipart/form-data",
                Authorisation: `Bearer ${token}`,
            },
            {
                id:`${sectionId}`
            }
        )
        console.log("Printing Delete Section Response ");
        console.log(response);

        if (response?.data?.success == false)
            throw new Error(response?.data?.message);

        toast.success('Course Section Deleted');

        localStorage.setItem("course" , JSON.stringify(response?.data?.body));
        localStorage.setItem("courseDetails" , JSON.stringify(response?.data?.body));

        dispatch(setCourseObject(response?.data?.body));
        
        
    } catch (error) {
        if(error?.response?.data?.message?.message)
            {
                toast.error(error?.response?.data?.message?.message)
                dispatch(setToken(null));
                dispatch(setProfile(null));
                dispatch(resetCart());
            
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                navigate('/')
            }
                
            else
            {
                console.log(error?.response?.data?.message);
            toast.error(error?.response?.data?.message);
            }
           }

    toast.remove(toastId);
}

export async function createSubSection(title , description , videoFile , section_id ,  videoObject , dispatch ,token , navigate)
{
    const toastId = toast.loading('Loading...')

    try {

        const response = await apiConnector("POST" , `${createCourseAPI.ADD_SUB_SECTION}` ,
            {
                title:title,
                description:description,
                videoFile:videoFile,
                section_id:section_id,
                videoObject:videoObject
            },
            {
                "Content-Type": "multipart/form-data",
                Authorisation: `Bearer ${token}`,
            }
        )

        console.log("Printing Create SubSection Section Response ");
        console.log(response);

        if (response?.data?.success == false)
            throw new Error(response?.data?.message);

        toast.success('Sub Section Created');

        localStorage.setItem("course" , JSON.stringify(response?.data?.body));
        localStorage.setItem("courseDetails" , JSON.stringify(response?.data?.body));

        dispatch(setCourseObject(response?.data?.body));

        
        
    } catch (error) {
        if(error?.response?.data?.message?.message)
            {
                toast.error(error?.response?.data?.message?.message)
                dispatch(setToken(null));
                dispatch(setProfile(null));
                dispatch(resetCart());
            
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                navigate('/')
            }
                
            else
            {
                console.log(error);
                console.log(error?.response?.data?.message);
            toast.error(error?.response?.data?.message);
            }
    }

    toast.remove(toastId);
    toast.dismiss(toastId);
}

export async function updateSubSection(title , description , videoFile , subSection_id , videoObject , dispatch , token , navigate)
{
    const toastId = toast.loading('Loading...')

    try {

        const response = await apiConnector("PUT" , `${createCourseAPI.UPDATE_SUB_SECTION}` ,
            {
                title:title,
                description:description,
                videoFile:videoFile,
                subSection_id:subSection_id,
                videoObject:videoObject
            },
            {
                "Content-Type": "multipart/form-data",
                Authorisation: `Bearer ${token}`,
            }
        )

        console.log("Printing Update Sub Section Response ");
        console.log(response);

        if (response?.data?.success == false)
            throw new Error(response?.data?.message);

        toast.success('Course Sub Section Updated');
        localStorage.setItem("course" , JSON.stringify(response?.data?.body));
        localStorage.setItem("courseDetails" , JSON.stringify(response?.data?.body));

        dispatch(setCourseObject(response?.data?.body));
        
        return response;
        
    } catch (error) {
        if(error?.response?.data?.message?.message)
            {
                toast.error(error?.response?.data?.message?.message)
                dispatch(setToken(null));
                dispatch(setProfile(null));
                dispatch(resetCart());
            
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                navigate('/')
            }
                
            else
            {
                console.log(error?.response?.data?.message);
            toast.error(error?.response?.data?.message);
            }    
    }

    toast.remove(toastId);
    toast.dismiss(toastId);
}

export async function deleteSubSection(subSectionId , dispatch , token , navigate)
{
    const toastId = toast.loading('Loading...')

    try {

        const response = await apiConnector("DELETE" , `${createCourseAPI.DELETE_SUB_SECTION}` ,
            {},
            {
                Authorisation: `Bearer ${token}`,
            },
            {
                id:`${subSectionId}`
            }
        )

        console.log("Printing Delete Sub Section API Response");
        console.log(response);

        if (response?.data?.success == false)
            throw new Error(response?.data?.message);

        toast.success('Sub Section Deleted');

        localStorage.setItem("course" , JSON.stringify(response?.data?.body));
        localStorage.setItem("courseDetails" , JSON.stringify(response?.data?.body));

        dispatch(setCourseObject(response?.data?.body));
        
    } catch (error) {
        if(error?.response?.data?.message?.message)
            {
                toast.error(error?.response?.data?.message?.message)
                dispatch(setToken(null));
                dispatch(setProfile(null));
                dispatch(resetCart());
            
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                navigate('/')
            }
                
            else
            {
                console.log(error?.response?.data?.message);
            toast.error(error?.response?.data?.message);
            }     
    }

    toast.remove(toastId);
    toast.dismiss(toastId);
}

export async function getInstructorCourses(instructorId , instructorName  ,token , dispatch , navigate)
{
    const toastId = toast.loading('Loading...');
    console.log("ins id"  ,instructorId);

    try {

        const response = await apiConnector("POST" , `${createCourseAPI.GET_INSTRUCTOR_COURSES}` ,
            {
                instructorId:instructorId,
                user_name:instructorName
            },
            
    );

        console.log("Printing Get Instucor Courses API Response");
        console.log(response);

        if (response?.data?.success == false)
            throw new Error(response?.data?.message);

        toast.dismiss(toastId);
        return response;
        
    } catch (error) {
        console.log(error);
        if(error?.response?.data?.message?.message)
            {
                toast.error(error?.response?.data?.message?.message)
                dispatch(setToken(null));
                dispatch(setProfile(null));
                dispatch(resetCart());
            
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                navigate('/')
            }
                
            else
            {
                console.log(error?.response?.data?.message);
            toast.error(error?.response?.data?.message);
            }
    }

    toast.dismiss(toastId);
}

export async function publishCourse(courseId , token , dispatch , navigate , instructor_id)
{
    const toastId = toast.loading('Loading...');

    try {

        const response = await apiConnector("PUT" , `${createCourseAPI.PUBLISH_COURSE}`,
            {
            course_id:courseId
            },
            {
                Authorisation: `Bearer ${token}`
            }
        )
        
        console.log("Printing Publishing Course API Response");
        console.log(response);

        if (response?.data?.success == false)
            throw new Error(response?.data?.message);

        toast.success('Course Published');
        navigate(`/dashboard/my-courses/${instructor_id}`);
        dispatch(setCourseObject(null));
        dispatch(setStep(1))
        localStorage.removeItem('step');
        localStorage.removeItem('course');
        
    } catch (error) {
        if(error?.response?.data?.message?.message)
            {
                toast.error(error?.response?.data?.message?.message)
                dispatch(setToken(null));
                dispatch(setProfile(null));
                dispatch(resetCart());
            
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                navigate('/')
            }
                
            else
            {
                console.log(error);
                console.log(error?.response?.data?.message);
            toast.error(error?.response?.data?.message);
            }
    }

    toast.remove(toastId)
}

export async function getCourseDetails(courseId , token , dispatch , navigate)
{
    const toastId = toast.loading('Loading...');
    console.log("INide course details");

    try {
        const response = await apiConnector("POST" , `${createCourseAPI.GET_SINGLE_COURSE}`,
            {
            courseId:courseId
            },
            {
                Authorisation: `Bearer ${token}`
            }
        )
        
        console.log("Printing Fetching Course API Response");
        console.log(response);
        toast.remove(toastId);

        if (response?.data?.success == false)
            throw new Error(response?.data?.message);

        toast.remove(toastId);

        return response;

       
    } catch (error) {

        if(error?.response?.data?.message?.message)
            {
                toast.error(error?.response?.data?.message?.message)
                dispatch(setToken(null));
                dispatch(setProfile(null));
                dispatch(resetCart());
            
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                navigate('/')
            }
                
            else
            {
                console.log(error);
                console.log(error?.response?.data?.message);
            toast.error(error?.response?.data?.message);
            }
        
    }

    toast.remove(toastId)
}

export async function getCourseWithProgress(courseId , token , dispatch , navigate)
{
    const toastId = toast.loading('Loading...');

    try {

        const response = await apiConnector("POST" , `${createCourseAPI.GET_SINGLE_COURSE_WITH_PROGRESS}`,
            {
            courseId:courseId
            },
            {
                Authorisation: `Bearer ${token}`
            }
        )
        
        console.log("Printing Fetching Course API Response");
        console.log(response);
        toast.remove(toastId);

        if (response?.data?.success == false)
            throw new Error(response?.data?.message);

        toast.remove(toastId);
        return response;
        
    } catch (error) {
        
        if(error?.response?.data?.message?.message)
            {
                toast.error(error?.response?.data?.message?.message)
                dispatch(setToken(null));
                dispatch(setProfile(null));
                dispatch(resetCart());
            
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                navigate('/')
            }
                
            else
            {
                console.log(error);
                console.log(error?.response?.data?.message);
            toast.error(error?.response?.data?.message);
            }
        

    }
    toast.remove(toastId);
}

export async function updateCourseProgress(courseId , subSectionId , token , dispatch , navigate)
{
    const toastId = toast.loading('Loading...')

    try {

        const response = await apiConnector("POST" , `${createCourseAPI.UPDATE_COURSE_PROGRESS}`,
            {
            courseId:courseId,
            subSectionId: subSectionId
            },
            {
                Authorisation: `Bearer ${token}`
            }
        )

        console.log("Printing Fetching Course API Response");
        console.log(response);
        toast.remove(toastId);

        if (response?.data?.success == false)
            throw new Error(response?.data?.message);

        toast.remove(toastId);
        toast.success('Lecture Marked as Completed');
        return response;
        
    } catch (error) {
        
        if(error?.response?.data?.message?.message)
            {
                toast.error(error?.response?.data?.message?.message)
                dispatch(setToken(null));
                dispatch(setProfile(null));
                dispatch(resetCart());
            
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                navigate('/')
            }
                
            else
            {
                console.log(error);
                console.log(error?.response?.data?.message);
            toast.error(error?.response?.data?.message);
            }

    }

    toast.remove(toastId);
}
export async function getCategoryPageDetails(categoryId , token , dispatch , navigate)
{
    const toastId = toast.loading('Loading...');

    try {

        const response = await apiConnector("POST" , `${categoryEndponts.GET_CATEGORY_PAGE_DETAILS}`,
            {
            categoryId:categoryId
            },
            {
                Authorisation: `Bearer ${token}`
            }
        )

        
        console.log("Printing Fetching Course API Response");
        console.log(response);
        toast.remove(toastId);

        toast.remove(toastId);

        
        if (response?.data?.success == false)
            throw new Error(response?.data?.message);
        
        return response;
        
    } catch (error) {
        
        if(error?.response?.data?.message?.message)
            {
                toast.error(error?.response?.data?.message?.message)
                dispatch(setToken(null));
                dispatch(setProfile(null));
                dispatch(resetCart());
            
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                navigate('/')
            }
                
            else
            {
                console.log(error);
                console.log(error?.response?.data?.message);
            toast.error(error?.response?.data?.message);
            }

    }

    toast.remove(toastId);
}

export async function getInstructorDashboard(instructorId , token , dispatch , navigate)
{
    const toastId = toast.loading('Loading...');

    try {

        const response = await apiConnector("POST" , `${createCourseAPI.GET_INSTRUCTOR_DASHBOARD}`,
            {
              instructorId:instructorId
            },
            {
                Authorisation: `Bearer ${token}`
            }
        )

        
        console.log("Printing Fetching Course API Response");
        console.log(response);
        toast.remove(toastId);

        toast.remove(toastId);

        
        if (response?.data?.success == false)
            throw new Error(response?.data?.message);
        
        return response;
        
        
    } catch (error) {
        
        if(error?.response?.data?.message?.message)
            {
                toast.error(error?.response?.data?.message?.message)
                dispatch(setToken(null));
                dispatch(setProfile(null));
                dispatch(resetCart());
            
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                navigate('/')
            }
                
            else
            {
                console.log(error);
                console.log(error?.response?.data?.message);
            toast.error(error?.response?.data?.message);
            }
    }

    toast.remove(toastId);
}

