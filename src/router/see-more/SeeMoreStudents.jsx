import React,{useState,useEffect} from 'react'
import axios from "../../api/axios"
import Loader from '../../components/loader/Loader'
import avatar from "../../assets/avatar1.png"
import { useHistory } from 'react-router-dom'

const SeeMoreStudents = () => {

    const [data,setData] = useState([])
    const [studentCount,setStudentCount] = useState(24)
    const [ loading,setLoading] = useState(false)

    const history = useHistory()
    useEffect(()=>{
        setLoading(true)
        axios.get(`/student/see-more-student/${studentCount}`)
            .then(res => {
                setData(res.data);
                setLoading(false)
            })
            .catch(err => {
                console.log(err);
            })
    },[studentCount])
  return (
    data.state ?
     <div className="p-3 md:flex md:flex-wrap ">
        {
            data.data?.map((student,inx) => (
                <div onClick={()=>{
                    history.push(`/student-single-page/${student._id}`)
                }} key={inx} className="student flex items-center md:w-[50%] lg:w-[33%] my-5 px-4 ">
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


        <div className={` flex items-center justify-center w-[100%] my-4 ${ studentCount > data.data?.length ? " h-0 overflow-hidden " : " h-auto " } `}>
                    <button
                     className=' py-3 px-8 bg-green-700 text-white border-none rounded-xl '
                     onClick={() => {
                        setStudentCount(j => j += 24)
                     }}
                    >
                        Ko'proq ko'rish
                    </button>
        </div>
     </div>
    :
     <Loader />
  )
}

export default SeeMoreStudents