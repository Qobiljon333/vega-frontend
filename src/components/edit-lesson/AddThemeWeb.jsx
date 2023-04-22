import React,{useState,useEffect} from 'react'
import axios from '../../api/axios'
import { ToastContainer, toast } from "react-toastify";
import MainLoader from '../loader/MainLoader';
import Loader from '../loader/Loader';
import ReactPlayer from 'react-player/youtube';
import Comments from '../../router/comment/Comments';
import { useSelector } from 'react-redux';
import sendIcon from "../../assets/ios-send.png"
import { MdDelete } from 'react-icons/md';
import AddTheme from '../../router/single-pages/teachers-single-page/AddTheme';
import { NavLink } from 'react-router-dom';
const AddThemeWeb = (
    {
        match: {
          params: { id },
        },
      }
) => {

    const teacher = useSelector(j => j.teacher)
    const [checking,SetChecking] = useState(false)
    
    const [thisLesson,setLesson] = useState([])
    const [Themes,setThemes] = useState([])
    

 
  const [createLoading, setCreateLoading] = useState(false);


    useEffect(()=> {
        axios.get(`/lesson/single-lesson/${id}`)
            .then(res => {
                
                setLesson(res.data)
                if(res.data.data[0].owner === teacher.userName){
                  SetChecking(true)
                }
            })
            .catch(err => {
                console.log(err);
            })
        axios.get(`/theme/special/${id}`)
            .then(res => {
              setThemes(res.data.data);
              console.log(Themes);
            })
            .catch(err  => {
              console.log(err);
            })

    },[createLoading])


   
   
    const deleteTheme = (ThemeId) => {
       if(window.confirm("OKmi ?")){
        console.log(ThemeId);
        axios.delete(`/theme/${ThemeId}`)
           .then(res => {
             console.log(res);
             axios.get(`/student/groupmates/${id}`)
                  .then(students => {
                    if (students.data.state) {
                        students.data.data?.forEach(student => {
                            axios.patch(`/student/remove-theme-count/${student._id}`)
                                .then(res => {
                                    console.log(res);
                                })
                                .catch(err => {
                                    console.log(err);
                                })
                        })
                    }
                  })
                  .catch(err => {
                    console.log(err);
                  })
             setCreateLoading(j => !j)
           })
           .catch(err => {
             console.log(err);
           })
       }else{
        console.log("No");
       }
    }
    
  return (
    thisLesson.state  && teacher !== null && checking ? <div className="">

        <div className="w-[90%] mx-auto border-none rounded-md lg:flex my-10 bg-slate-200  p-8  ">
                <div className=" mx-auto w-[100%] lg:w-[45%]    md:w-auto md:mr-3  h-[300px]  ">
                    <img className=' w-[100%] md:w-auto  h-[100%] object-cover ' src={thisLesson.data[0]?.urls[0] } alt="" />
                </div>
                <div className=" mx-auto   lg:w-[45%] ">
                    <h1 className='text-xl'>{thisLesson.data[0]?.title}</h1>
                    <h1 className='opacity-95'>{thisLesson.data[0]?.desc}</h1>
                    <h1>Mavzular soni: <span>{thisLesson.data[0]?.lessons.length}</span></h1>
                </div>

        </div>

  
      <AddTheme id={thisLesson.data[0]?._id} teacher={thisLesson.data[0]?.owner} image={thisLesson.data[0]?.urls[0]} setRefresh={setCreateLoading} />




          
        <h1 className='text-lg my-5 text-center '> Qo'shilgan mavzular</h1>
        <div className="created_lessons flex flex-wrap">
           
            {
                Themes?.map((theme,inx) => (
                  <div key={inx} className=" w-[100%] mx-auto my-5 md:w-[46%] lg:w-[24%] ">
                    <NavLink to={`/theme-single-page/${theme._id}`} >
                      <div className="image w-[100%] h-[250px] ">
                        <img className='w-[100%] h-[100%] object-cover ' src={theme.image} alt="" />
                      </div>
                    </NavLink>
                    <h1 className=' min-h-[35px]'>{theme.theme}</h1>
                    <div className="flex my-3">
                      <div className="flex-1"></div>
                      <div className="p-2 bg-slate-200 border-none rounded-md">
                        <MdDelete onClick={ ()=> deleteTheme(theme._id)} className='text-red-900 text-xl' />
                      </div>
                    </div>
                  </div>
               ))
            }
        </div>
        <div className="comments w-[100%] mt-10">
        <Comments singleLesson={thisLesson} createLoading={createLoading} setCreateLoading={setCreateLoading}   id={id}  />

        </div>
        <ToastContainer />
    </div>
    : !checking ? <div className=" w-[100%] h-screen flex items-center justify-center  ">
        <h1 className="text-3xl">Menimcha Adashib qoldingiz... 🤨</h1>
    </div>
    : teacher === null ? <div className=" w-[100%] h-screen flex items-center justify-center ">
      <h1 className="text-3xl">Are you a teacher? 🤨 </h1>
    </div>
    :
    <MainLoader/>
  )
}

export default AddThemeWeb