import React,{useEffect,useState} from 'react'
import axios from "../../api/axios"
import { useSelector } from "react-redux";
import img from "../../assets/data-not-found-1965034-1662569.webp"
import Loader from '../loader/Loader';
import { useHistory } from 'react-router-dom';

const LessonsLearning = () => {
    const student = useSelector(j => j.student)
    const [data,setData] = useState([])
    const history = useHistory()
    useEffect(()=>{
        axios.get(`lesson/lessons-learning/${student?.id}`)
            .then(res => {
                setData(res.data);
            })
            .catch(err => {
                console.log(err)
            })
    },[])
    //  console.log(student)
  return (
    
        data.state === true ? <div className="w-[100%]  pb-14  md:flex md:flex-wrap ">
            {
                data.data?.map((lesson,inx) => (
                    <div onClick={() => history.push(`/lesson-single-page/${lesson._id}`)} className="lesson w-[93%] my-7 md:my-3 mx-auto md:w-[31%] lg:w-[23%] hover:cursor-pointer h-[400px] md:h-[270px] " key={inx}>
                        <div className="img w-[100%] h-[320px] md:h-[200px]  ">
                            <img className='w-[100%] h-[100%] object-cover ' src={lesson.urls[0]} alt="" />
                        </div>
                        <div className="text">
                            <h1>{lesson.title}</h1>
                        </div>
                    </div>
                ))
            }
        </div>
        : data.state === false ? 
        <div className="w-[100%] h-[100vh] flex items-center justify-center  ">
            <img src={img} alt="Darsliklar topilmadi." />
        </div>
        :
        <div className="w-[100%] h-[100vh] flex items-center justify-center  ">
            <Loader/>
        </div>
        
    
  )
}

export default LessonsLearning