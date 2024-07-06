
import { useForm } from "react-hook-form";
import Button from "../core/HomePage/Button";
import { useEffect } from "react";
// import { Form } from "react-router-dom";
import data from '../../data/countrycode.json';

function ContactUsForm()
{

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors , isSubmitSuccessful}
    }=useForm();

    
    // Hadling form Submission
    function formSubmitHandler(data)
    {
        console.log("formData");
        console.log(data);

    }


    // Reset the form when it gests submitted
    // Hook gets activated when 'isSubmitSuccessfully Value gets chnged'
    useEffect(()=>{
        if(isSubmitSuccessful == true)
            {
                reset(
                    {
                        firstName:"",
                        lastName:"",
                        email:"",
                        phoneNumber:"",
                        message:"",
                    } 
                )
            }
    } , [reset , isSubmitSuccessful] )

    return(
        <div>
            <div className="max-w-[400px] w-[80%] text-white mx-auto mt-10">
                <form onSubmit={handleSubmit(formSubmitHandler)} className='flex flex-col '>

                   {/* First and Last NAme */}
                    <div className="flex flex-row gap-x-5 mt-4 text-white">
                        {/* Firs Name */}
                        <div className="w-[47%]">
                            <label htmlFor="firstName">First Name</label>
                            <input
                            className="bg-richblack-700 w-[100%] p-2 pr-0 rounded-lg mt-1"
                              type="text"
                              name='firstName'
                              id='firstName'

                              {...register("firstName" , {
                                required:true
                              }) }

                              placeholder="Enter First Name"
                            ></input>

                            {/* Displaying ERROR */}
                            {
                                errors.firstName && (
                                    <p className="text-pink-300 text-sm">Pease Enter Your first Name</p>
                                )
                            }
                        </div>
                        {/* LAst Name */}
                        <div className="w-[47%]">
                            <label htmlFor="lastName">Last Name</label>
                            <input
                            className="bg-richblack-700 w-[100%] p-2 pr-0 rounded-lg mt-1"
                              type="text"
                              name="lastName"
                              id="lastName"

                              {...register("lastName" , {
                                required:true
                              })}

                              placeholder="Enter Last Name"
                            ></input>

                            {/* Displaying ERROR */}
                            {
                                errors.lastName && (
                                    <p className="text-pink-300 text-sm">Enter last Name</p>
                                )
                            }
                        </div>
                    </div>

                    {/* Email Address */}
                    <div className="mt-5 flex flex-col">
                        <label htmlFor="email">Email</label>
                        <input
                        className="bg-richblack-700 p-2 rounded-lg mt-1"
                          type="email"
                          name="email"
                          id="email"

                          {...register("email" , {
                            required:true
                          })}

                          placeholder="Enter Email Address"
                        ></input>

                        {/* dsiplying ERROR */}
                        {
                            errors.email && (
                                <p className="text-pink-300 text-sm">Please Enter email</p>
                            )
                        }
                    </div>

                    {/* Phone Number */}
                    <div>
                        <label className="mt-5 flex flex-col">Phone Number</label>
                        <div className="flex flex-row gap-x-5 items-center">
                            {/* Counry CODES */}
                            <div className="w-[130px] mt-1">
                                <select
                                className="w-[130px] p-2 bg-richblack-700 rounded-lg"
                                name="coutryCode"
                                id="countryCode"
                                {...register("countryCode" , {
                                    required:{value:true , message:'Please Select a Country Code'}
                                })}

                                >

                                    {/* Now options TAGS */}
                                    {
                                        data.map((element , index)=>{
                                            return(
                                                <option key={index} className="bg-richblack-700">{element.code } - { element.country}</option>
                                            )
                                        })
                                    }

                                </select>
                            </div>
                            {/* Phone Number */}
                            <div className="w-[62%]">
                                <input
                                type="number"
                                name="phoneNumber"
                                className="bg-richblack-700 p-2 w-[100%] rounded-lg mt-1"
                                id="phoneNumber"
                                placeholder="12345 67890"
                                {...register("phoneNumber" , {
                                    required:{value:true , message:"Please Enter Phone Number"},
                                    minLength:{value:8 , message:'At least 8 digits required'},
                                    maxLength:{value:10 , message:'Cannot be greater than 10 digits'}
                                })}
                                ></input>
                            </div>
                        </div>
                        {/* Displying error */}
                        {
                            errors.phoneNumber && (
                                <p className="text-pink-300 text-sm">{errors.phoneNumber.message}</p>
                            )
                        }
                        {
                            errors.countryCode && (
                                <p className="text-pink-300 text-sm">{errors.countryCode.message}</p>
                            )
                        }
                    </div>

                    {/* MEssage Field*/}
                    <div className="mt-5 flex flex-col">
                        <label htmlFor="message">Message</label>
                        <textarea
                        className="bg-richblack-700 p-2 rounded-lg mt-1"
                        name="message"
                        id="message"

                        {...register("message" , {
                            required:true
                        })}

                        rows={10}
                        placeholder="Enter Message"
                        ></textarea>
                        {/* Displaying error */}
                        {
                            errors.message && (
                                <p className="text-pink-300 text-sm">Enter Message Please</p>
                            )
                        }
                    </div>
                    
                    {/* Submit Button */}
                    <div className="mt-4 flex justify-center">
                    <button  className='mx-auto bg-yellow-50 p-2 px-4 rounded-lg text-black hover:scale-95 transition-all duration-200' >Submit</button>
                    </div>

                </form>
            </div>
        </div>

    )
}

export default ContactUsForm;