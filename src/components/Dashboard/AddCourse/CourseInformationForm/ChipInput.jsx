import { useEffect, useState } from "react";
import { RxCrossCircled } from "react-icons/rx";


function ChipInput({name , label , errors , register ,  setValue , getValues , editValue})
{

    const [tag , setTag] = useState("");
    const [tagArray , setTagArray] = useState(editValue?editValue:[]);

    useEffect(()=>{
        register(name , {
            required:true
        })
    } , []);

    useEffect(()=>{
        setValue(name , tagArray)
    } , [tagArray])

    
    function addTagHandler(chip)
    {
        if(chip)
        {
            setTagArray((prevArrray)=>[
                ...prevArrray , chip
            ])
        }
        setTag("");
    }

    function removeTagHandler(index)
    {
        setTagArray((prevArray =>{
            return prevArray.filter((_, i) => i !== index)
        }));
    }

    const handleKeyDown = (event) => {
        // Check if user presses "Enter" or ","
        if (event.key === "Enter" || event.key === ",") {
          // Prevent the default behavior of the event
          event.preventDefault()
          // Get the input value and remove any leading/trailing spaces
          const chipValue = event.target.value.trim()
          // Check if the input value exists and is not already in the chips array
          if (chipValue && !tagArray.includes(chipValue)) {
           addTagHandler(chipValue);
            event.target.value = ""
          }
        }
      }

    return(
        <div>
            <div className="flex flex-col mt-7">
                
                {/* Label */}
                <label className="text-white" htmlFor={`${name}`}>{label}</label>
                
                {/* Displaying TAGS */}
                {
                    tagArray.length>0 && (
                        <div className="flex flex-row items-center gap-x-4 mt-2">
                            {
                                tagArray.map((element , index)=>{
                                    return(
                                        <div key={index} className="bg-yellow-500 rounded-full px-2 py-1 text-white flex flex-row items-center gap-x-2">
                                            <div>{element}</div>
                                            <div onClick={()=>{removeTagHandler(index)}}>
                                            <RxCrossCircled />
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                }

                {/* Input Tag */}
                <input
                type="text"
                name={`${name}`}
                placeholder="Enter Tag"
                value={tag}
                onChange={(e)=>{setTag(e.target.value)}}
                onKeyDown={handleKeyDown}
                className="text-white mt-2 p-2 bg-richblack-700 border-none rounded-lg"
                >
                </input>

                {
                    errors[name] && (
                        <span className="text-pink-200">Tag is required</span>
                    )
                }

            </div>
        </div>
    )
}

export default ChipInput;