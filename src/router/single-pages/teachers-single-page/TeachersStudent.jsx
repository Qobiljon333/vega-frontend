import React,{useState,useEffect} from 'react'
import axios from "../../../api/axios"
import avatar from "../../../assets/avatar1.png"
const TeachersStudent = ({teacherName,state}) => {
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)

    useEffect(()=> {
        if (!teacherName) {
            return setLoading(j => !j)
        }
        axios.get(`/student/special/${teacherName}`)
            .then(res => {
                setData(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    },[loading])
  return (
    <div className={`px-2 ${state === "o'rganuvchilar" ? "h-auto" : "h-0 overflow-hidden"}`}>
        {
            data.data?.map((student,inx) => (
                <div key={inx} className="student flex items-center  my-5">
                    <div className="img w-[48px] bg-white border-none rounded-[50%] overflow-hidden  h-[48px] flex items-center justify-center ">
                        <img className='w-[90%] h-[90%] object-cover ' src={student.image ? student.image : avatar} alt="" />
                    </div>
                    <div className=" pl-4 flex items-center justify-between flex-1">
                        <div className="name">
                            <h1>{student.name}</h1>
                            <h1 className='text-sm opacity-80'> {student.username} </h1>
                        </div>
                        <div className="">
                            <h1> <span className='text-red-800' >{student.overallLessons.length}</span> / <span className='text-green-900'>{student.lessons.length}</span></h1>
                        </div>
                    </div>
                </div>
            ))
        }
    </div>
  )
}

export default TeachersStudent