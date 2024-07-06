 Q1  - How to Add Back ground image in REACT using Taailwind CSS ? 
 bg-[url('../public/pics/bghome.svg')]

Copy paste that imgae in public folder
then url of that public folder 
As REACT not supports direct src='../assests/'


Q2 - How to use useForm Hook()  in 'ContactUsForm.jsx' 
 <input
                                type="number"
                                name="phoneNumber"
                                className="bg-richblack-700 p-2 w-[100%] rounded-lg mt-1"
                                id="phoneNumber"
                                placeholder="12345 67890"
                                {...register("phoneNumber" , {
                                    <!--  -->
                                    <!-- Bt passing the message then and here only -->
                                    <!--  -->
                                    required:{value:true , message:"Please Enter Phone Number"},
                                    minLength:{value:8 , message:'At least 8 digits required'},
                                    maxLength:{value:10 , message:'Cannot be greater than 10 digits'}
                                })}
></input>

{
    errors.phoneNumber && (
        <p>{errors.phoneNumber.message}</p>
    )
}