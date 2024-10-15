import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux";
import Thumbnail from "../CourseInformationForm/Thumbnail";
import VideoFile from "./VideoFile";
import { useEffect, useState } from "react";
import {createSubSection , updateSubSection} from "../../../../services/operations/createCourseAPI"
import { useNavigate } from "react-router-dom";



function CourseModal({modalData , setModalData , view , add , edit})
{
    // const [videoObjectFlag , setVideoObjectFlag] = useState((JSON.parse(modalData?.ideoObject)?(JSON.parse(modalData?.ideoObject):(null))));
    const {
        register,
        getValues,
        setValue,
        handleSubmit,
        formState:{errors}
    } = useForm();

    const token = useSelector((state)=>state.auth.token);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function onSubmit(data)
    {
        console.log("Form Data" , data);

        if(add == true)
        {
            createSubSection(data.lectureTitle , data.lectureDesc , data.lectureVideo , modalData , JSON.stringify(data.lectureVideo) ,dispatch , token , navigate);
        }

        if(edit == true)
        {
            updateSubSection(data.lectureTitle , data.lectureDesc , data.lectureVideo , modalData._id ,  JSON.stringify(data.lectureVideo) , dispatch , token , navigate);
        }

        setModalData(null);
    }

    useEffect(()=>{
        if(view == true || edit == true)
        {
            setValue("lectureTitle" , modalData.title);
            setValue("lectureDesc" , modalData.description);
            setValue("lectureVideo" , modalData.videoUrl);
        }
    },[])

    return(
        <div>
            <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm ">
               <div className="relative max-w-[600px] w-[90%] mx-auto p-4 bg-richblack-400 rounded-xl">
               <div className="text-lg text-white mb-4">
                    {
                    (view==true)?(<p className="inline">Viewing</p>):(add==true)?(<p className="inline">Adding</p>):(edit==true)?(<p className="inline">Editing</p>):("")
                    } Lecture
                </div>

                

                <div onClick={()=>{setModalData(null)}} className="cursor-pointer absolute top-1 right-3 text-lg font-semibold text-white">X</div>

              {/* Form */}
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        {/* Lecture Name */}
                    <div className="flex flex-col">
                    <label htmlFor="lectureTitle" className="text-white">Lecture Title <sup className="text-pink-300">*</sup></label>
                    <input
                          id="lectureTitle"
                          type="text"
                          placeholder="Enter Lecture Title"
                        //   contentEditable={`${(view==true)?("false"):("true")}`}
                          readOnly={(view==true)?(true):(false)}
                          className="text-white mt-2 p-2 bg-richblack-700 border-none rounded-lg"
                          
                          {...register("lectureTitle" , {required:true})}
                    ></input>

                    {
                        errors.lectureTitle  && (
                            <span className="text-pink-100">Please Enter Title</span>
                        )
                    }
                </div>

                {/* Lecture Desc */}
                <div className="flex flex-col mt-7">
                    <label htmlFor="lectureDesc" className="text-white">Lecture Short Desciption <sup className="text-pink-300">*</sup></label>
                    
                    <textarea
                    id="lectureDesc"
                    {...register("lectureDesc" , {required:true})}
                    placeholder="Enter Lecture Description"
                    rows={5}
                    // contentEditable={`${(view==true)?("false"):("true")}`}
                    readOnly={(view==true)?(true):(false)}
                    className="text-white mt-2 p-2 bg-richblack-700 border-none rounded-lg"
                    ></textarea>

                    {
                        errors.lectureDesc  && (
                            <span className="text-pink-100">Please Enter Description</span>
                        )
                    }
                    </div>

                     {/* Upload image */}
                {
                    (view==true)?
                    (
                        <div className="max-w-[500px] w-[95%] mx-auto mt-4">
                            <video width="" className="w-[100%] h-[400px]" controls>
                                <source src={modalData.videoUrl} />
                            </video>
                        </div>
                       
                    ):(edit == true)?
                    (
                        <VideoFile 
                        name="lectureVideo"
                        label="Choose Video"
                        errors={errors}
                        register={register}
                        setValue={setValue}
                        getValues={getValues}
                        videoObject={JSON.parse(modalData.videoObject)}
                        // setVideoObjectFlag={setVideoObjectFlag}
                        />
                    ):(
                        <VideoFile 
                        name="lectureVideo"
                        label="Choose Video"
                        errors={errors}
                        register={register}
                        setValue={setValue}
                        getValues={getValues}
                        videoObject={null}
                        // setVideoObjectFlag={setVideoObjectFlag}
                        />
                    )
                }

                <div className="flex justify-between mt-2">
                    <div className="h-[1px]"></div>
                    <div className="flex flex-row gap-x-2">
                        {/* submit */}
                        {
                            (view == false)?
                            (
                                <button type="submit" className="flex justify-between items-center p-2 rounded-lg bg-yellow-100">
                            {
                                (add==true)?(<p>Submit</p>):(edit==true)?(<p>Edit</p>):(view==true)?(<div></div>):(<div></div>)
                            }
                        </button>
                            ):
                            (<div></div>)
                        }
                        <div onClick={()=>{setModalData(null)}} className="text-pink-400 font-semibold  p-2 cursor-pointer hover:scale-95 transition-all duration-200">Close</div>
                    </div>
                </div>
                    </form>
                </div>

                <div className="flex flex-row justify-between">
                    <div className="w-[1px]"></div>
                    
                </div>

               
               </div>
            </div>
        </div>
    )
}

export default CourseModal