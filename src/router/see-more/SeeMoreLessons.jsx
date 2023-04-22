import React, { useEffect, useState } from 'react'
import { AiFillLike } from 'react-icons/ai'
import axios from "../../api/axios"
import Loader from '../../components/loader/Loader'
import student from "../../assets/student-icon.webp"
import lessonsImg from "../../assets/lessons.svg"
import { NavLink } from 'react-router-dom'
import loader from "../../assets/spinder.svg"
const SeeMoreLessons = () => {
    const [ data,setData ] = useState([])
    const [ data2,setData2 ] = useState([])
    const [ loading,setLoading] = useState(false)
    const [ proCount,setProCount ] = useState(24)

    const [createLoading, setCreateLoading] = useState(true);

    useEffect(()=>{
        axios.get(`/lesson/see-more-lessons/${proCount}`)
        .then(res=> {
            setData(res.data)
            // setData2(res.data.data)
            setLoading(false)
        })
        .catch(err=> console.log(err))
    },[proCount])
  return (
    data.state || data?.length ?
    <div className='w-[100%] bg-slate-50 min-h-screen pb-14 '>
      <div className="w-[98%]  mx-auto flex flex-wrap content-between ">
         {
           data.data?.reverse().map((lesson,inx) => (
            <div key={inx} className="lesson pb-3 bg-white my-2 w-[47%] mx-auto md:w-[32%] lg:w-[22%]  ">
               <NavLink to={`/lesson-single-page/${lesson._id}`}>
               <div className="imgs w-[100%] h-[150px] relative ">
                 <img className=' w-[100%] h-[100%] object-cover ' src={lesson.urls[0]} alt="Darslik rasmi" />
                 <div className="absolute top-0 right-0 inline-block bg-red-800 py-[2px] px-[4px] ">
                   <h1 className='text-xs md:text-lg lg:text-xl text-white '>{lesson.type}</h1>
                 </div>
               </div>
               <div className="title">
                  <h1 className='text-lg'> {lesson.title} </h1>
                  <h1 className='text-xs md:text-lg lg:text-xl  '>Ustoz: {lesson.owner}</h1>

               </div> 
               <div className="info flex items-center justify-between px-2">

                {/* <div className="flex items-center justify-between ">
                 <div className="flex items-center mr-1">
                  <h1 className='text-xs text-blue-700 mx-1'>{lesson.like}</h1>
                  <AiFillLike className='text-blue-700' />
                 </div>
                 <div className="flex items-center ml-1">
                  <AiFillLike className='rotate-180 text-red-800 '  />
                  <h1 className='text-xs text-red-800  ml-1'>{lesson.disLike}</h1>
                 </div>
                </div> */}

                <div className="student flex items-center">
                   <img className='w-4 h-4 mr-1' src={student} alt="Student" />
                   <h1>{lesson.students.length}</h1>
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

        <div className={` flex items-center justify-center w-[100%] my-4 ${ proCount > data.data?.length ? " h-0 overflow-hidden " : " h-auto " } `}>
                    <button
                     className=' py-3 px-8 bg-green-700 text-white border-none rounded-xl '
                     onClick={() => {
                      setProCount(j => j += 24)
                     }}
                    >
                        Ko'proq ko'rish
                    </button>
        </div>
    </div>
    :
    <div className="w-[100%] h-screen flex items-center justify-center ">
      <img src={loader} alt="" />
    </div>
  )
}

export default SeeMoreLessons