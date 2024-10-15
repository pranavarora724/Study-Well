import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoCloudUploadOutline } from "react-icons/io5";


function VideoFile({ name, label, register, errors, setValue, getValues , videoObject  }) {

    const [uploadedFile, setUploadedFile] = useState(videoObject);    
    const [fileURL, uploadedFileURL] = useState("");
    const [isVideo , setIsVideo] = useState(false);
    console.log("uploadedfile = " , uploadedFile);

    useEffect(() => {
        register(name, {
            required: true
        })
    }, []);

    useEffect(() => {
        setValue(name, uploadedFile)
    }, [uploadedFile])


    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setUploadedFile(e.target.files[0]);
            // setVideoObjectFlag(e.target.files[0]);

            console.log("Image changed");
            console.log("Uploaded file = " , uploadedFile?.name);

            const name = e.target.files[0].name;
            console.log("File name = " , name);
            const index = name.lastIndexOf(".");
            const extension = name.substring(index+1);

            const allowed_extension =["mp4" , "mov"];

            if(allowed_extension.includes(extension) == false)
            {
                toast.error("Only ideo Files Allowed");
            }
            else{
                setIsVideo(true);
            }
        }
    };

    function removeHandler() {
        setUploadedFile();
    }

    return (
        <div>
            <div className="flex flex-col mt-7">
                <label htmlFor={`${name}`} className="text-white">{label}</label>

                {
                    uploadedFile && isVideo==true && (
                        <div className="max-w-[500px] w-[95%] mx-auto mt-4 ">
                            {/* <img className="w-[100%]" src={URL.createObjectURL(uploadedFile)}></img> */}
                            
                            <video width="" className="w-[100%] h-[400px]" controls>
                                <source src={URL.createObjectURL(uploadedFile)} />
                            </video>
                        </div>
                    )
                }
                {
                    !uploadedFile && (
                        <label htmlFor={`${name}`} className="max-w-[500px] mt-4 mx-auto p-4 rounded-lg bg-richblack-700 flex flex-col items-center gap-y-4 pt-4">
                            <div className="w-[50px] h-[50px] rounded-full text-yellow-50 bg-yellow-800 flex justify-center items-center">
                                <IoCloudUploadOutline />
                            </div>

                            <div className="text-richblack-400">Choose a Video by clicking on the Button below</div>
                            {/* 
                            <div className="flex flex-row gap-x-6">
                                <div>Aspect Ratio 16:9</div>
                                <div>Recommended Size 1024 X 576</div>


                            </div> */}
                        </label>
                    )
                }
                <div className="mt-4 w-[95%] max-w-[500px] mx-auto flex flex-row items-center justify-center gap-x-6">
                    <div>
                        <label htmlFor={`${name}`} className="text-black bg-yellow-50 px-2 py-1 rounded-lg hover:scale-95 transition-all duration-200"> Choose life </label>
                        <input
                            id={`${name}`}
                            type="file"
                            className="bg-yellow-50 text-black hidden"
                            onChange={imageChange}
                        >
                        </input>
                    </div>

                    <div onClick={removeHandler} className="text-white bg-richblack-700 px-2 py-1 rounded-lg hover:scale-95 transition-all duration-200" >Remove Image</div>
                </div>
                {
                    errors[name] && (
                        <span className="text-pink-100">Choose a file</span>
                    )
                }
            </div>
        </div>
    )
}

export default VideoFile;