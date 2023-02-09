import axios from '../../api/axios';
import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux';
import MainLoader from '../loader/MainLoader';
import { Link, NavLink, useHistory } from 'react-router-dom';

const LessonsWrapper = () => {

    const history = useHistory()

    const teacher = useSelector(j => j.teacher)
    const teacher_name = teacher.userName
    // console.log(teacher_name);

    const [lessons,setLessons] = useState([])
    const [loading,setLoading] = useState(false)
    useEffect(()=> {
        setLoading(false)
        axios.get(`/lesson/special/${teacher_name}`)
            .then(res => {
                setLessons(res.data)
                setLoading(true)

                // console.log(res.data)
            })
            .catch(err => {
                // console.log(err);
                setLoading(true)

            })
    },[])
  return (
    
          loading ?
        <div  className="w-[98%] m-auto ">
        <h1>Darsliklar:</h1>
        {
            lessons.state ? 
            <div className="lessons_contair w-[100%] flex flex-wrap ">
            {
                lessons.data?.map((lesson,inx) => (
                    <div key={inx} className="lesson_content w-[47%] md:w-[32%] lg:w-[23%] my-3 mx-auto h-[325px] lg:h-[400px] box_shadow ">
                        <div className="imgs w-[100%] h-[58%] ">
                            <img className=' w-[100%] h-[100%] object-cover  ' src={lesson.urls[0]} alt="" />
                        </div>
                        <div className="w-[100%]  ">
                            <h1>{lesson.title}</h1>
                        </div>
                        <h1>Darslar: <span>{lesson.lessons.length}</span></h1>
                        <h1>O'rganuvchilar: <span>{lesson.students}</span></h1>

                        <div className="w-[100%] ">
                            <NavLink to={`/teacher/add-lesson/${lesson._id}`}>
                                <button className='my-3 m-auto block bg-green-800 py-2 px-3 border_radius_4 hover:scale-110 transition_3  text-white'>Darslik Qo'shish</button>
                            </NavLink>
                        </div>
                    </div>
                ))
            }
        </div>
            :
            <div className="">
                <h1>Darslik Topilmadi ! ! !</h1>
            </div>

        }
        

        </div>
         
         :
          <MainLoader />
    
   
  )
}

export default LessonsWrapper