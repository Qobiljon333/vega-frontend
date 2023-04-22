import React,{useState,useEffect} from 'react'
import axios from "../../api/axios"
import CreateAdmin from '../../components/create-admin/CreateAdmin'
import CreateTeacher from '../../components/create-teacher/CreateTeacher'
import {FaBook, FaChalkboardTeacher, FaImages} from "react-icons/fa"
import {GiTeacher} from "react-icons/gi"
import {ImUserPlus} from "react-icons/im"
import exit from "../../assets/exit-icon-png-2.jpg"
import { useDispatch, useSelector } from 'react-redux'
import MainLoader from '../../components/loader/MainLoader'
import CreateSubject from '../../components/admin-modals/CreateSubject'
import CreateStudentImage from '../../components/admin-modals/CreateStudentImage'
import { GoKebabVertical } from 'react-icons/go'
import { SIGN_OUT } from '../../context/action/actionTypes'
const Admin = () => {
  const [modal,setModal] = useState(false)
  const [modalPath,setModalPath] = useState("")
  const [admin,setAdmin] = useState()

  const [modalState,setModalState] = useState(false)
  const [menuState,setMenuState] = useState(false)

  const adminId = useSelector(j => j.user.id)

  const dispatch = useDispatch()
  const signOut = () =>{
    dispatch({type:SIGN_OUT})
  }

  useEffect(() => {
    axios.get(`/sign-in/${adminId}`)
      .then(res => {
        console.log(res);
        setAdmin(res.data.data);
      })
      .catch(err => {
        console.log(err);
      })
  },[])
  return (
    admin ?
    <div className="bg-slate-900">
      <div className={`flex w-[100%] ${modalState ? "opacity-10" : "opacity-100"}`}>
        <div onClick={() => setMenuState(false)} className="flex-1"></div>
          <div className={` pt-[8px]`}>
            <GoKebabVertical onClick={() => setMenuState(j => !j)} className={` text-white text-xl ml-[80%] cursor-pointer`} />
              <div className={` bg-white overflow-hidden my-1 transition_3 ${menuState ? "h-[60px]" : " h-0 overflow-hidden"}`}>
                  <button disabled={modalState ? true : false} className='bg-red-800 text-white py-1 px-2 my-4 mx-2 border-none rounded-[5px] ' onClick={signOut}>
                    Akkountdan Chiqish
                  </button>
              </div>
          </div>
      </div>
      <div  onClick={() => setMenuState(false)} className='bg-slate-900 min-h-screen relative'>
        <div className="self py-5">
          <div className={`img ${admin?.image ? "w-[200px] h-[200px]" : ""} border-none rounded-full overflow-hidden mx-auto flex items-end justify-center `}>
            {
              admin?.image? <img src={admin.image} alt="Admin rasmi" /> : ""
            }
          </div>
          <h1 className='text-white text-center text-xl'>{admin?.name}</h1>
          <h1 className='text-white text-center text-lg'>@ <span> {admin?.username} </span></h1>
        </div> 
        <div className=" w-[100%] flex flex-wrap  mt-14 items-center justify-around ">
          <div onClick={()=> {
            setModal(true)
            setModalPath("teachers")
          }} className="create_teachers   hover:cursor-pointer flex items-center justify-center    mb-5 border-solid border-2 border-slate-100 rounded-xl bg-slate-800 shadow_white w-[150px] h-[150px] ">
            <GiTeacher className='text-white text-[85px] '/>
          </div>
          <div onClick={()=> {
            setModal(true)
            setModalPath("subjects")
          }} className="create_subjects hover:cursor-pointer flex items-center justify-center    mb-5 border-solid border-2 border-slate-100 rounded-xl bg-slate-800 shadow_white w-[150px] h-[150px] ">
            <FaBook className='text-white text-[85px] ' />
          </div>
          <div onClick={()=> {
            setModal(true)
            setModalPath("images")
          }} className="create_tudent_imgs hover:cursor-pointer flex items-center justify-center   mb-5 border-solid border-2 border-slate-100 rounded-xl bg-slate-800 shadow_white w-[150px] h-[150px] ">
            <FaImages className='text-white text-[85px] '/>
          </div>
          <div onClick={()=> {
            setModal(true)
            setModalPath("admins")
          }} className={`create_admins    hover:cursor-pointer  flex items-center justify-center   mb-5 border-solid border-2 border-slate-100 rounded-xl bg-slate-800 shadow_white  ${ admin?.owner ? "w-[150px] h-[150px]" : " hidden " }`}>
            <ImUserPlus className='text-white text-[85px] ' />
          </div>
        </div>
        <div className={`modal overflow-y-auto pb-14 transition_3 fixed  w-[100%] h-[100%] left-0 bg-white border-none rounded-tl-xl rounded-tr-xl ${modal ? "top-7" : " top-[100%]"}`}>
        <div className="exit p-2 flex"> <div className="flex-1"></div> <div className=" bg-white p-1 "><img onClick={()=> setModal(false) } className='w-5 h-5 hover:cursor-pointer ' src={exit} alt="" /></div>  </div>
          {
            modalPath === "teachers" ? 
              <CreateTeacher /> 
            : modalPath === "admins" ?
              <CreateAdmin />
            : modalPath === "subjects" ?
            // <div className=""></div>
              <CreateSubject />
            : modalPath === "images" ?
              <CreateStudentImage />
            : <div className=""></div>
          }
        </div>
        {/* <CreateTeacher /> */}
      </div>
    </div>
    :
    <MainLoader />
  )
}

export default Admin