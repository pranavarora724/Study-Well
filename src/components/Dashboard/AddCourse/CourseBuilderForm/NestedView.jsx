import { useDispatch, useSelector } from "react-redux";
import { RxDropdownMenu } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { RxDividerVertical } from "react-icons/rx";
import { FaCaretDown } from "react-icons/fa";
import { deleteSection , deleteSubSection} from '../../../../services/operations/createCourseAPI'
import { useNavigate } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { useState } from "react";
import CourseModal from "./CourseModal";


function NestedView({ handleEditButton }) {
    const course = useSelector((state) => state.course.course);
    const token = useSelector((state) => state.auth.token);
    console.log("Inside Nested View");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const[viewModal , setViewModal] = useState(null);
    const[editModal , setEditModal] = useState(null);
    const[addModal , setAddModal] = useState(null);


    return (
        <div>

            <div className="bg-richblack-700 text-white rounded-lg w-[90%] mx-auto mt-5 px-4 py-4">

                {
                    course.courseContent.map((section) => {

                        return (
                            <details className="p-2  border-richblack-200 mt-2" key={section._id} open>

                                <summary className="flex flex-row border-b-[1px] py-1 justify-between">

                                    <div className="flex items-center gap-x-2">
                                        <div>
                                            <RxDropdownMenu />
                                        </div>
                                        <div className="font-semibold">{section.sectionName}</div>
                                    </div>

                                    <div className="flex gap-x-2">
                                        <MdEdit onClick={() => { handleEditButton(section._id, section.sectionName) }} className="cursor-pointer" />
                                        <MdDelete onClick={() => { deleteSection(section._id, dispatch, token, navigate) }} className="cursor-pointer" />
                                        <RxDividerVertical />
                                        <FaCaretDown className="cursor-pointer" />

                                    </div>

                                </summary>

                                {
                                    (section.subSection.length === 0) ?
                                        (<div></div>) :
                                        (
                                            <div>
                                                {
                                                    section.subSection.map((subSection) => {
                                                        return (
                                                            <div className="px-10 flex flex-row justify-between border-b-[1px] border-richblack-500 py-1" key={subSection._id}>
                                                                
                                                                <div onClick={()=>{setViewModal(subSection)}} className="cursor-pointer flex items-center gap-x-2">
                                                                    <div>
                                                                        <RxDropdownMenu />
                                                                    </div>
                                                                    <div className="font-semibold">{subSection.title}</div>
                                                                </div>

                                                                <div className="flex gap-x-2">
                                                                    {/* <MdEdit onClick={()=>{setEditModal(subSection)}}  className="cursor-pointer" /> */}
                                                                    <MdDelete onClick={()=>{deleteSubSection(subSection._id , dispatch , token , navigate)}} className="cursor-pointer" />
                                                                </div>

                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        )
                                }
                                <div className="px-10 flex gap-x-2 text-yellow-100 items-center mt-4 ">
                                <IoMdAdd className="font-semibold"/>
                                <div onClick={()=>{setAddModal(section._id)}} className="cursor-pointer hover:scale-95 transition-all duration-200">Add Lecture</div>
                                </div>

                            </details>
                            )
                    })
                }
            </div>

            {
                (viewModal)?(<CourseModal modalData={viewModal} setModalData={setViewModal} view={true} add={false} edit={false}/>):
                (addModal)?(<CourseModal modalData={addModal} setModalData={setAddModal} view={false} add={true} edit={false}/>):
                (editModal)?(<CourseModal modalData={editModal} setModalData={setEditModal} view={false} add={false} edit={true}/>):(<div/>)
            }
        </div>
    )
}

export default NestedView;