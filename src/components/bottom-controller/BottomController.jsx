import React,{useState} from 'react'
import { AiFillHome,AiOutlineSearch } from 'react-icons/ai'
import { FaSearch } from 'react-icons/fa'
import { MdAccountCircle, MdPlayLesson } from 'react-icons/md'
import { NavLink,useLocation,useHistory  } from 'react-router-dom'
import { useSelector } from "react-redux";

const BottomController = () => {
    const admin = useSelector(j=> j.user)
    const teacher = useSelector(j => j.teacher)
    const student = useSelector(j => j.student)
    const history = useHistory()

    const [modalState,setModalState] = useState("")
    console.log(modalState);
    const toAccount = () => {
        if(admin !== null && teacher !== null && student !== null){
            
            return setModalState("all")
        }
         else if(admin !== null && teacher !== null ){
           return setModalState("admin-teacher")
        }
         else if(admin !== null && student !== null ){
           return setModalState("admin-student")
        }
        else if(teacher !== null && student !== null){
           return setModalState("teacher-student")
        }
        else if(admin !== null ){
           return history.push('/admin')
        }
        else if(teacher !== null ){
            return history.push('/teacher')
        }
        else if(student !== null){
           return history.push('/student')
        }else{
            return history.push("/login-container")
        }
    }
    const {pathname} = useLocation()
    if( pathname === "/login"  ){
        return <></>
    }

    


 
  return (
    <div className={`w-[100%] h-[40px] bg-slate-900  fixed left-0 bottom-0 md:hidden  `}>
        <div className={`controlls_nav relative w-[100%] h-[100%] flex items-center justify-between px-5 `}>
            <NavLink onClick={()=> setModalState("")} to={`/`}>
              <AiFillHome className='text-[23px] text-white' />
            </NavLink>
            <NavLink onClick={()=> setModalState("")} to={`/find`}>
              <FaSearch className='text-[23px]  text-white' />
            </NavLink>
            {
              student === null ? ""
              :
              <NavLink onClick={()=> setModalState("")} to={`/lessons-learning`}>
               <MdPlayLesson className='text-[23px]  text-white' />
              </NavLink>
            }
            <MdAccountCircle onClick={()=> toAccount()} className='text-[23px] text-white' />

        <div className={`absolute transition-all  ${modalState === "all" ? "top-[-143px] " : modalState === "" ? "top-[200px]" : "top-[-112px]" } w-[150px]  box_shadow right-1`}>
          { 
            modalState === "all"? <div className="">   
              <NavLink onClick={()=> setModalState("")}  to={`/admin`}>
                <div className="w-[95%] my-3 py-1 mx-auto  bg-slate-900 flex items-center justify-center ">
                  <h1 className='text-white'>Admin</h1>
                </div>
              </NavLink>
              <NavLink onClick={()=> setModalState("")}  to={`/teacher`}>
                <div className="w-[95%] my-3 mx-auto py-1 bg-slate-900 flex items-center justify-center ">
                  <h1 className='text-white'>O'qituvchi</h1>
                </div>
              </NavLink>
              <NavLink onClick={()=> setModalState("")}  to={`/student`}>
                <div className="w-[95%] my-3 mx-auto py-1 bg-slate-900 flex items-center justify-center ">
                  <h1 className='text-white'>O'quvchi</h1>
                </div>
              </NavLink>
            </div>


            : modalState === "admin-teacher" ? <div className="py-1">
              <NavLink onClick={()=> setModalState("")}  to={`/admin`}>
                <div className="w-[95%] my-3 mx-auto py-1 bg-slate-900 flex items-center justify-center ">
                  <h1 className='text-white'>Admin</h1>
                </div>
              </NavLink>

              <NavLink onClick={()=> setModalState("")}  to={`/teacher`}>
                <div className="w-[95%] my-3 mx-auto py-1 bg-slate-900 flex items-center justify-center ">
                  <h1 className='text-white'>O'qituvchi</h1>
                </div>
              </NavLink>
            </div>


            : modalState === "admin-student" ? <div className="">
              <NavLink onClick={()=> setModalState("")}  to={`/admin`}>
                <div className="w-[95%] my-3 mx-auto py-1 bg-slate-900 flex items-center justify-center ">
                  <h1 className='text-white'>Admin</h1>
                </div>
              </NavLink>

              <NavLink onClick={()=> setModalState("")}  to={`/student`}>
                <div className="w-[95%] my-3 mx-auto py-1 bg-slate-900 flex items-center justify-center ">
                  <h1 className='text-white'>O'quvchi</h1>
                </div>
              </NavLink>

              
            </div>
            : modalState === "teacher-student" ? <div className="">
              <NavLink onClick={()=> setModalState("")}  to={`/teacher`}>
                <div className="w-[95%] my-3 mx-auto py-1 bg-slate-900 flex items-center justify-center ">
                  <h1 className='text-white'>O'qituvchi</h1>
                </div>
              </NavLink>

              <NavLink  onClick={()=> setModalState("")} to={`/student`}>
                <div className="w-[95%] my-3 mx-auto py-1 bg-slate-900 flex items-center justify-center ">
                  <h1 className='text-white'>O'quvchi</h1>
                </div>
              </NavLink>
            </div>

            : <div className=""></div>
          }
        </div>
        </div>

    </div>
  )
}

export default BottomController