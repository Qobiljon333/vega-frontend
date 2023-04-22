import React,{useState,useEffect} from 'react'
import axios from "../../../api/axios"
import exit from  "../../../assets/exit-icon-png-2.jpg"
import offlineL from "../../../assets/offlineL.png"
import themes from "../../../assets/web-design.png"
import { FaChalkboardTeacher } from 'react-icons/fa';
import { MdPlayLesson } from 'react-icons/md';
import OverallLessons from '../../../components/studentModals/OverallLessons';
import {GoKebabVertical} from "react-icons/go"
import TeachersM from '../../../components/studentModals/TeachersM'




const StudentSingleP = (
  {
    match: {
      params: { id },
    },
  }
) => {
  const [student,setStudent] = useState([])
  useEffect(()=>{
    axios.get(`/student/${id}`)
      .then(res => {
         console.log(res);
         setStudent(res.data.data[0])
         
      })
      .catch(err =>{
        console.log(err);
      })

  },[id])
  const [descState,setDescState] = useState(false)
  const [modalState,setModalState] = useState(false)
  const [pathState,setPathState] = useState("")

  return (
    <div className='relative bg-slate-900 text-white min-h-screen'>
    
     

      <div className="father relative transition_3 w-[150px] h-[150px] border-none rounded-[50%] overflow-hidden mx-auto ">
        <img className='w-[100%] h-[100%] object-cover ' src={student.image} alt="" />
      </div>


      <div className="transition_3 self min-h-screen pb-2 px-[3px]">

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


      </div>
       
      <div className={`fixed w-[100%]  bg-white h-[100vh] border-none rounded-tl-3xl transition_3 rounded-tr-3xl p-2 pb-[55px]  left-0 ${modalState ? "top-[5vh] lg:top-[10vh] " : "top-[110vh]"}`}>
        <div onClick={()=> setModalState(false)} className="bg-white p-[5px] border-none rounded-md absolute top-[-32px] hover:cursor-pointer right-2 w-[27px] h-[27px] ">
          <img src={exit} alt="" />
        </div>
          <TeachersM teachers={student.teachers} state={pathState}/>
          <OverallLessons lessons={student.overallLessons} learnedLessons={student.lessons} state={pathState} />
      </div>
      
    </div>
  )
}

export default StudentSingleP