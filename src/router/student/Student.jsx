import React,{useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from "../../api/axios"
import { ToastContainer, toast } from "react-toastify";
import { SIGN_OUT_STUDENT } from '../../context/action/actionTypes';
import exit from  "../../assets/exit-icon-png-2.jpg"
import offlineL from "../../assets/offlineL.png"
import themes from "../../assets/web-design.png"
import { FaChalkboardTeacher } from 'react-icons/fa';
import { MdPlayLesson } from 'react-icons/md';
import TeachersM from '../../components/studentModals/TeachersM';
import { NavLink } from 'react-router-dom';
import OverallLessons from '../../components/studentModals/OverallLessons';
import {GoKebabVertical} from "react-icons/go"

import {BiImageAdd} from "react-icons/bi"
import ChangeImage from '../../components/studentModals/ChangeImage';
import Groupmates from '../../components/studentModals/Groupmates';
const Student = () => {
  const studentId = useSelector(j => j.student)
  const [student,setStudent] = useState([])
  const [refresh,setRefresh] = useState(false)
  useEffect(()=>{
    axios.get(`/student/${studentId?.id}`)
      .then(res => {
         console.log(res);
         setStudent(res.data.data[0])
         
      })
      .catch(err =>{
        console.log(err);
      })

  },[refresh])
  
  const [descState,setDescState] = useState(false)
  const [modalState,setModalState] = useState(false)
  const [menuState,setMenuState] = useState(false)
  const [pathState,setPathState] = useState("")

  const dispatch = useDispatch()

  const signOut = () =>{
    dispatch({type:SIGN_OUT_STUDENT})
  }
  return (
    <div className='relative bg-slate-900 text-white min-h-screen'>
    
     <div className={`flex w-[100%] ${modalState ? "opacity-10" : "opacity-100"}`}>
      <div onClick={() => setMenuState(false)} className="flex-1"></div>
      <div className={` pt-[8px]`}>
        <GoKebabVertical onClick={() => setMenuState(j => !j)} className={` text-white text-xl ml-[80%]`} />
        <div className={` bg-white overflow-hidden my-1 transition_3 ${menuState ? "h-[60px]" : " h-0 overflow-hidden"}`}>
          <button disabled={modalState ? true : false} className='bg-red-800 text-white py-1 px-2 my-4 mx-2 border-none rounded-[5px] ' onClick={signOut}>
            Akkountdan Chiqish
          </button>
        </div>
      </div>
     </div>

      <div onClick={() => setMenuState(false)} className="father relative transition_3 w-[150px] h-[150px] border-none rounded-[50%] overflow-hidden mx-auto ">
        <img className='w-[100%] h-[100%] object-cover ' src={student.image} alt="" />
        <div onClick={()=> {
          setModalState(true)
          setPathState("changeImage")
        }} className="transition_3 flex items-center justify-center absolute w-[100%] bottom-[-35%] left-0 h-[35%] bg-[#00000081] child hover:cursor-pointer  ">
          <BiImageAdd className='text-3xl ' />
        </div>
      </div>


      <div onClick={() => setMenuState(false)} className="transition_3 self min-h-screen pb-2 px-[3px]">

        <h1 className='text-center pt-4 text-2xl'>{student.name}</h1>
        <h1 className='text-xl text-center mb-6'>@ <span className='text-lg font-mono '> {student.username}</span></h1>

        <div className="score">
          <h1 onClick={() => {
            setModalState(true)
            setPathState("teachers")
          }} className='text-sm my-2 bg-slate-900 text-white px-2 py-1 border-solid border rounded-md flex items-center border-slate-600'><FaChalkboardTeacher className='text-2xl'/>  <span className='text-xl ml-5'> {student.teachers?.length}</span></h1>
          <h1 onClick={() => {
            setModalState(true)
            setPathState("offlineLessons")
          }}  className='text-sm my-2 bg-slate-900 text-white px-2 py-1 border-solid border rounded-md flex items-center border-slate-600'><img src={offlineL} className={`w-[25px] h-[25px] `} alt="" /> <span className='text-xl ml-5'>{student.offLineLesson?.length}</span></h1>
          <NavLink to={`/lessons-learning`}>
            <h1 onClick={() => {
              setPathState("mainLessons")
            }}  className='text-sm my-2 bg-slate-900 text-white px-2 py-1 border-solid border rounded-md flex items-center border-slate-600'><MdPlayLesson className='text-2xl' /> <span className='text-xl ml-5  '> {student.mainLessons?.length}</span>
            </h1>
          </NavLink>
          <h1 onClick={() => {
            setModalState(true)
            setPathState("overallLessons")
          }}  className='text-sm bg-slate-900 text-white px-2 py-1 border-solid border rounded-md flex items-center border-slate-600'><img src={themes} className={`w-[25px] h-[25px] `} alt="" /> <span className='text-green-800 text-xl ml-5 mr-1'>{student.overallLessonsCount}</span> / <span className='text-xl ml-1'>{student.lessons?.length}</span></h1>
        </div>
        <div className="connection py-4">
          <h1 className='text-sm'> <span className='text-base'>{student.connection}</span></h1>
        </div>
          
        <div onClick={() => setDescState(j => !j)} className={`my-2 bg-slate-900 text-white px-2 py-1 border-solid border-l-2 border-b-2 rounded-md flex items-center border-slate-600 desc text-sm ${descState ? " h-auto " :"h-auto overflow-hidden"} `}>
           
          <span className='text-base ml-2'>
            {student.desc}
          </span>
        </div>

        <div className="groupmates">
        <Groupmates mainLessons={student.mainLessons} />
        </div>


      </div>
       
      <div className={`fixed w-[100%]  bg-white h-[100vh] border-none rounded-tl-3xl transition_3 rounded-tr-3xl p-2 pb-[55px]  left-0 ${modalState ? "top-[5vh] lg:top-[10vh] " : "top-[110vh]"}`}>
        <div onClick={()=> setModalState(false)} className="bg-white p-[5px] border-none rounded-md absolute top-[-32px] hover:cursor-pointer right-2 w-[27px] h-[27px] ">
          <img src={exit} alt="" />
        </div>
          <TeachersM teachers={student.teachers} state={pathState}/>
          <OverallLessons lessons={student.overallLessons} learnedLessons={student.lessons} state={pathState} />
          <ChangeImage id={student._id} state={pathState} setRefresh={setRefresh} setModalState={setModalState} />
      </div>
      
    </div>
  )
}

export default Student