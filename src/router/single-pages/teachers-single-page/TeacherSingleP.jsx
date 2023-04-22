import React,{useState,useEffect} from 'react'
import axios from "../../../api/axios"
import avatar from "../../../assets/avatar1.png"
import Announcement from '../../../components/announcement/Announcement'
import TeachersLessonW from './TeachersLessonW'
import TeachersStudent from './TeachersStudent'

const TeacherSingleP = (
  {
    match: {
      params: { id },
    },
  }
) => {
  const [singleTeacher,SetSingleTeacher] = useState([])

  const [createLoading, setCreateLoading] = useState(false);

  const [pathState,setPathState] = useState("elonlar")
  useEffect(()=>{
    axios.get(`/teacher/single-teacher/${id}`)
            .then(res => {
              SetSingleTeacher(res.data)
              setCreateLoading(false)
                // console.log(res.data)
            })
            .catch(err => {
                console.log(err);
            })
  },[id])

  return (
    <div>
      {
        singleTeacher.data?.map((teacher,inx ) => (
          <div key={inx} className="">
            <div className="self w-[100%] bg-black text-white lg:flex lg:pl-40 lg:py-5 ">
                <div className="img lg:w-[350px] lg:h-[350px] "> 
                  {/* <img src={singleTeacher.data[0]?.urls[0]} alt="" /> */}
                      <img className='w-[100%] h-[100%] object-cover ' src={teacher?.urls.length ?  teacher.urls[0] : avatar} alt="Ustoz rasmi" />
                </div>
                <div className="info px-2 lg:px-10">
                  <h1 className='my-1'><span className='opacity-80 text-xs'>Ism:</span> <span className='text-white'>{teacher.name}</span></h1>
                  <h1 className='my-1'><span className='opacity-80 text-xs'>Fan:</span> <span className='text-white'>{teacher.type}</span></h1>
                    <div className="desc">
                      <h1 className='my-1'><span className='opacity-80 text-xs'>Malumot:</span> <span className='text-white'>{teacher.desc}</span></h1>
                    </div>
                  <h1 className='my-1'><span className='opacity-80 text-xs'>Aloqa:</span> <span className='text-white text-sm'>{teacher.connection}</span></h1>
                
                </div>
                
            </div>
            <div className="data">
              <div className="Path mt-10 flex ">
                    <div className="hover:cursor-pointer News block m-auto bg-slate-900 py-[4px] px-4  border-none rounded-sm"><span onClick={()=> setPathState("elonlar")} className={`text-white text-sm borderB ${pathState === "elonlar" ? "boderBF" : "borderB"}`}>E'lonlar</span></div>
                    <div className="hover:cursor-pointer lessons block m-auto bg-slate-900 py-[4px] px-4   border-none rounded-sm"><span onClick={()=> setPathState("darsliklar")} className={`text-white text-sm borderB ${pathState === "darsliklar" ? "boderBF" : "borderB"}`}>Darsliklar</span></div>
                    <div className="hover:cursor-pointer Students block m-auto bg-slate-900 py-[4px] px-4   border-none rounded-sm"><span onClick={()=> setPathState("o'rganuvchilar")} className={`text-white text-sm borderB ${pathState === "o'rganuvchilar" ? "boderBF" : "borderB"}`}>O'rganuvchilar</span></div>
                  </div>
                  <div className="w-[100%] ">
                    <Announcement announcements={teacher.news}  state={pathState} />
                    <TeachersLessonW teacherName={teacher.username} state={pathState} />
                    <TeachersStudent teacherName={teacher.username} state={pathState}  />
                  </div>
            </div>
          </div>
        ))
      }
  
    </div>
  )
}

export default TeacherSingleP