import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
import axios from "../../api/axios"
import { ToastContainer, toast } from "react-toastify";


const Student = () => {
  const [descState,setDescState] = useState(false)
  const [modalState,setModalState] = useState("")
  const [pathState,setPathState] = useState("")
  return (
    <div>
      <div className="self py-2 px-1">
        <h1 className='text-center py-4 text-2xl'> ISM,Familiya{}</h1>
        <h1 className='text-sm my-2'>userName: <span className='text-lg'>Someone {}</span></h1>

        <div className="score">
          <h1 className='text-sm my-2'>Ustozlari: <span className='text-lg'> 3{}</span></h1>
          <h1 className='text-sm my-2'>Kurslar: <span className='text-lg'>5{}</span></h1>
          <h1 className='text-sm my-2'>Mustaqil o'rganilgan mavzular: <span className='text-lg'>35 {}</span></h1>
          <h1 className='text-sm'>Kursda o'rganilgan mavzular: <span className='text-green-800 text-lg'>{25}</span> / <span className='text-lg'>{12}</span></h1>
        </div>
        <div className="connection py-4">
          <h1 className='text-sm'>Aloqa: <span className='text-base'> telefon:+998998182464, telegram: @qobiljon2464 instagram: @qobiljon2464{}</span></h1>
        </div>

        <div onClick={() => setDescState(j => !j)} className={`desc text-sm ${descState ? " h-auto " :"h-auto overflow-hidden"} `}>
          Malumotlar:  
          <span className='text-base ml-2'>
             Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto beatae perferendis illo fugit excepturi sapiente dicta corporis, culpa perspiciatis esse ratione? Placeat dolor dolore maxime quidem modi sunt sint adipisci?
          </span>
        </div>


        
      <div className={`w-[100%] ${modalState === "" ? "h-auto" :"h-0 overflow-hidden" } `}>
        <div className="Path mt-10 flex ">
          {/* <div className="News block m-auto bg-slate-900 py-[4px] px-4  border-none rounded-sm"><span onClick={()=> setPathState("elonlar")} className={`text-white text-sm borderB ${pathState === "elonlar" ? "boderBF" : "borderB"}`}>E'lonlar</span></div> */}
          <div className="lessons block m-auto bg-slate-900 py-[4px] px-4   border-none rounded-sm"><span onClick={()=> setPathState("darsliklar")} className={`text-white text-sm borderB ${pathState === "darsliklar" ? "boderBF" : "borderB"}`}>Darsliklar</span></div>
          <div className="Students block m-auto bg-slate-900 py-[4px] px-4   border-none rounded-sm"><span onClick={()=> setPathState("Ustozlar")} className={`text-white text-sm borderB ${pathState === "Ustozlar" ? "boderBF" : "borderB"}`}>Ustozlar</span></div>
        </div> 
        <div className="w-[100%] ">
          {/* <Announcement announcements={teacherData?.news}  state={pathState} /> */}
          {/* <SpecialLessons teacherName={teacherData?.username} state={pathState} /> */}
        </div>
      </div>
      </div>
    </div>
  )
}

export default Student