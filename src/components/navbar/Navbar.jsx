import React,{useState,useEffect} from 'react'
import { BsSearch } from 'react-icons/bs'
import { MdAccountCircle } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { NavLink, useHistory, useLocation } from 'react-router-dom'
import Search from '../find/Search'
const Navbar = () => {

  const admin = useSelector(j=> j.user)
  const teacher = useSelector(j => j.teacher)
  const student = useSelector(j => j.student)
  const history = useHistory()

  const [modalState,setModalState] = useState("")
  const [searchState,setSearchState] = useState(false)
  
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
  const [path,setPath] = useState(pathname)
  if( pathname === "/login"  ){
    return <></>
}
 
  return (
    <div className=' w-[100%] px-11 h-9 bg-slate-900   items-center boderBF hidden md:flex'>
        <NavLink to="/">
          <h1 className='text-white text-xl mx-5 font-serif'>Logo</h1>
        </NavLink>
        <div className="  ">
           <div className=" relative  items-center  flex">
              <div className='lg:ml-16 ' onClick={() => setPath("/all-lessons")}>
                <NavLink onClick={()=> setModalState("")}  to="/all-lessons">
                  <h1 className={`text-white lg:text-lg  ${path === "/all-lessons" ? "boderBF" :"borderB"}`}>Darsliklar</h1>
                </NavLink> 
              </div>
              <div className='lg:mx-6 mx-5' onClick={() => setPath("/all-teachers")}>
                <NavLink onClick={()=> setModalState("")}  to="/all-teachers">
                  <h1 className={`text-white lg:text-lg  ${path === "/all-teachers" ? "boderBF" :"borderB"}`}>O'qituvchilar</h1>
                </NavLink>
              </div>
              <div className='lg:mx-6' onClick={() => setPath("/all-students")}>
                <NavLink onClick={()=> setModalState("")}  to="/all-students">
                  <h1 className={`text-white lg:text-lg  ${path === "/all-students" ? "boderBF" :"borderB"}`}>O'rganuvchilar</h1>
                </NavLink>
              </div>
           </div>

        </div>
        <div className={`search w-[100%]  z-50  top-0 left-0 my-1  ${ searchState ? "fixed" : "hidden" }`}>
          <Search searchStateM={searchState} setSearchStateM={setSearchState} />
         </div>

        <div className="flex-1"></div>
        
        <div 
          onClick={() => {
            setSearchState(true)
          }}
        className=" mr-7 p-[.32rem] bg-slate-600   border-none rounded-full hover:cursor-pointer ">
          <BsSearch  className='text-white' />
        </div>

        <div className=" relative">
            <MdAccountCircle onClick={()=> toAccount()} className='text-[33px] text-white' />
      
            <div className={`absolute z-50 bg-white transition-all  ${modalState === "all" ? "top-[43px] " : modalState === "" ? "top-[-200px]" : "top-[42px]" } w-[150px]  box_shadow right-1`}>
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

export default Navbar