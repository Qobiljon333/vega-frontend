import React, { useEffect, useState } from 'react'
import { AiFillLike } from 'react-icons/ai'
import student from "../../../assets/student-icon.webp"
import lessonsImg from "../../../assets/lessons.svg"
import { NavLink } from 'react-router-dom'
import axios from "../../../api/axios"
const SpecialLessons = ({teacherName,state}) => {
  
  const [lessons,setlessons] = useState([])
  
  console.log(teacherName);
  useEffect(()=> {
    axios.get(`/lesson/special/${teacherName}`)
      .then(res => {
        setlessons(res.data.data)
        console.log(res.data ,"ASKDKLWA;L")
      })
      .catch(err => {
        console.log(err);
      })
  },[teacherName])
    
  return (
    lessons?.length === 0 ?
        <div className="empty flex items-center justify-center">
        <h1 className='text-xl lg:text-[40px]'>Darslik mavjud emas</h1>
      </div>
    :
    <div className={`w-[100%]    ${state === "darsliklar" ? " h-auto  " :" h-0 overflow-hidden"}`}>
      <div className="w-[98%]  mx-auto flex flex-wrap content-between ">
        {
          lessons?.map((lesson,inx) => (
            <div key={inx} className="lesson pb-3 bg-white my-4  w-[47%] mx-auto md:w-[32%] lg:w-[22%]  ">
              <NavLink   to={`/teacher/add-lesson/${lesson._id}`}>
              <div className="imgs w-[100%] h-[150px] relative ">
                <img className=' w-[100%] h-[100%] object-cover ' src={lesson.urls[0]} alt="Darslik rasmi" />
                <div className="absolute top-0 right-0 inline-block bg-red-800 py-[2px] px-[4px] ">
                  <h1 className='text-xs md:text-lg lg:text-xl text-white '>{lesson.type}</h1>
                </div>
              </div>
              <div className="title">
                  <h1> {lesson.title} </h1>
                  <h1 className='text-xs md:text-lg lg:text-xl  '>Ustoz: {lesson.owner}</h1>

              </div> 
              <div className="info flex items-center justify-between px-2">

                <div className="flex items-center justify-between ">
                <div className="flex items-center mr-1">
                  <h1 className='text-xs text-blue-700 mx-1'>{lesson.like}</h1>
                  <AiFillLike className='text-blue-700' />
                </div>
                <div className="flex items-center ml-1">
                  <AiFillLike className='rotate-180 text-red-800 '  />
                  <h1 className='text-xs text-red-800  ml-1'>{lesson.disLike}</h1>
                </div>
                </div>

                <div className="student flex items-center">
                  <img className='w-4 h-4 mr-1' src={student} alt="Student" />
                  <h1>{lesson.students}</h1>
                </div>
                <div className="student flex items-center ">
                  <img className='w-4 h-4 mr-1' src={lessonsImg} alt="Student" />
                  <h1>{lesson.lessons.length}</h1>
                </div>

              </div>
              </NavLink>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default SpecialLessons