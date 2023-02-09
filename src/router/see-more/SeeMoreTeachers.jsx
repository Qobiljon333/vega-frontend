import React,{useState, useEffect} from 'react'
import axios from "../../api/axios"
import Loader from '../../components/loader/Loader'
import avatar from "../../assets/avatar1.png"
import { NavLink } from 'react-router-dom'

const SeeMoreTeachers = () => {

  const [data,setData] = useState([])
  const [teacherCount,setTCount] = useState(24)
  const [ loading,setLoading] = useState(false)
  console.log("see-more-teachers");
  useEffect(()=>{
    setLoading(true)
    axios.get(`/teacher/see-more-teachers/${teacherCount}`)
    .then(res=> {
        setData(res.data)
        // console.log(res.data)
        setLoading(false)
    })
    .catch(err=> console.log(err))
},[teacherCount])
  return (
    data.state ?
   <div className="main py-5 bg-slate-50">
     <div className='flex flex-wrap  my-5' >
      {
        data.data?.map((teacher,inx) => (
          <div key={inx} className="teacher my-3 mx-auto w-[42%] md:w-[30%] lg:w-[21%] ">

            <NavLink to={`/teacher-single-page/${teacher._id}`}>
             <div className="img w-[100%] h-[200px] md:h-[250px] lg:h-[280px] border-none rounded-xl overflow-hidden ">
              <img className='w-[100%] h-[100%] object-cover ' src={teacher?.urls.length ?  teacher.urls[0] : avatar} alt="Ustoz rasmi" />
             </div>
            </NavLink>
            <div className="name w-[100%] my-1  ">
               <h1 className='text-slate-900'> {teacher.name} </h1>
            </div>
            <div className="type">
              <h1 className=' text-slate-800 text-sm '>{teacher.type} </h1>
            </div>
          </div>
        ))
      }
      
    </div>
   {
    teacherCount > data.data?.length ?
     <></> : 
     <button className='block bg-white py-2 px-5  border-none rounded-md mx-auto' disabled={loading} onClick={() => setTCount(j => j * 2)} >
     {
       loading? (
         <Loader
         config={{ size: 24, color: "#fff", display: "inline-block" }}
       />
       ) : (
         <>
           <span className=' text-black'>Ko'proq ko'rish . . .</span>
         </>
       )
     }
   </button> 
   }
   </div>
    : <Loader />
  )
}

export default SeeMoreTeachers