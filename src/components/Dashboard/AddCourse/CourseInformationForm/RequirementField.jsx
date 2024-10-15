import { useEffect, useState } from "react";

function RequirementField({name , label , register , errors , setValue , getValues , editValue})
{

    
    const [requirement , setRequirement] = useState("");
    const [requirementList , setRequirementList] = useState(editValue ? editValue:[]); 
    

    // Q- IMP => Where will you use 'register' hook
    // NOTE - Inside UseEffect Hook
    // Not inside the input tag

    useEffect(()=>{
        register(name , {
            required:true
        })
    } , []);

    useEffect(()=>{
        setValue(name , requirementList)
    } , [requirementList])

    
    function handleAddRequirement()
    {
        console.log(requirement);
        if(requirement && !(requirementList.includes(requirement)) )
            {
                setRequirementList( (prevArray)=>[
                    ...prevArray , requirement
                ])
                setRequirement("");
            }
            console.log(requirementList);
    }

    function handleRemoveRequirement(index)
    {
        // const newRequirementList = requirementList.splice(index, 1);
        setRequirementList((prevArray =>{
            return prevArray.filter((_, i) => i !== index)
        }));
    }

    return(
        <div>
            <div className="flex flex-col mt-7">
                <label className="text-white" htmlFor={`${name}`}>{label}</label>

                <input
                type="text"
                id={`${name}`}
                placeholder="Enter Reqirement"
                value={requirement}
                onChange={(e)=>setRequirement(e.target.value)}
                // {...register(`${name}` , {required:true})}
                className="text-white mt-2 p-2 bg-richblack-700 border-none rounded-lg"
                >
                </input>

                {
                    errors[name] && (
                        <span className="text-pink-200">Enter Requirements</span>
                    )
                }

                <div onClick={handleAddRequirement} className="text-yellow-50 font-semibold mt-2 cursor-pointer">Add</div>
            </div>

            <div  className="mt-2">
                
                {
                    // V IMP
                    requirementList.length>0 &&
                    
                    // if(req)>0
                    requirementList.map((element , index)=>{
                        return(
                            <div key={index} className="flex flex-row gap-x-2">
                                <div className="text-white">{element}</div>
                                <div onClick={()=>{handleRemoveRequirement(index)}} className="text-richblack-300 cursor-pointer">Remove</div>
                            </div>
                        )
                    })
                }
                
            </div>
        </div>
    )
}

export default RequirementField;