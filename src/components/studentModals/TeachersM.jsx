import React,{useState,useEffect} from 'react'
import { NavLink } from 'react-router-dom'
import axios from "../../api/axios"
import students from "../../assets/students.png"
const TeachersM = ({teachers,state}) => {
  const [data,setData]  = useState([])
  const [loading,setloading] = useState(true)
  useEffect(()=> {
    if(!teachers){
      return setloading(j => !j)
    }
    teachers.forEach(username => {
      axios.get(`/teacher/${username}`)
      .then(res => {
          setData(j => [...j,res.data.data[0]])
      })
      .catch(err => {
        console.log(err)
      })
    });
    
  },[loading])
  return (
    teachers?.length ?
    <div  className={` overflow-y-auto text-black ${state === "teachers" ? "h-screen" : "h-0 overflow-hidden"}`}>
      <h1 className='text-black '>Ustozlar:</h1>
      <div className="container">
        {
          data?.map((teacher,inx) => (
            <NavLink key={inx} to={`/teacher-single-page/${teacher._id}`}>
              <div  className="w-[99%] mx-auto content bg-slate-50 py-[3px] border-none rounded-sm box_shadow_2 px-3 my-5 flex items-center justify-between">
              <div className="img w-[50px] h-[50px] flex items-center ">
                <img src={teacher.urls[0]} alt="" />
              </div>
              <div className="info">
                <h1>{teacher.name}</h1>
              </div>
              <div className="flex items-center">
                <h1> <span className='text-lg mr-1'>{teacher.students.length}</span></h1>
                <img className='w-[42px]  h-[42px] ' src={students} alt="" />
              </div>
            </div>
            </NavLink>
          ))
        }
      </div>
    </div>
    :
    <div className={`${state === "teachers" ? "h-auto" : "h-0 overflow-hidden"}`}>
      <h1 className='text-black'>
      Sizda hozircha ustozlar yo'q
      </h1>
    </div>
  )
}

export default TeachersM