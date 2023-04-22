import React ,{useState,useEffect} from 'react'
import axios from "../../../api/axios"
import { ToastContainer, toast } from "react-toastify";
import ReactPlayer from 'react-player'
import { Link, NavLink, useHistory } from 'react-router-dom'
import exit from "../../../assets/exit-icon-png-2.jpg"
import MainLoader from '../../../components/loader/MainLoader'
import now from "../../../assets/now.png"
import ok from "../../../assets/ok.jpg"
import okay from "../../../assets/yes.png"
import { useSelector } from 'react-redux'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { MdPlayLesson } from 'react-icons/md';
// {Thema,setThemaState,themaState}
const ThemaSingleP = ({
    match: {
      params: { id },
    },
  }) => {
    const [Theme,setTheme] = useState([])
    const [lesson,setLesson] = useState([])
    const [currentThemeInx,setCurrentThemeInx] = useState(0)
    const [studentAccount,setStudentAccount] = useState([])
    const [learnedTasks,setLearnedTasks] = useState([])
    const [isLoading,setIsLoading] = useState(false)
    const student = useSelector(state => state.student);
    const history = useHistory()
    useEffect(()=>{
        axios.get(`/theme/${id}`)
            .then(res => {
                setTheme(res.data.data)
                axios.get( `/lesson//lesson-of-themes/${res.data.data._id}`)
                    .then(lesson => {
                        setLesson(lesson.data.data[0]);
                        lesson.data.data[0]?.lessons?.forEach((theme,inx) => {
                            console.log(theme , inx);
                            if (theme === id) {
                                setCurrentThemeInx(inx)
                                console.log(inx);
                            }
                        })
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
            .catch(err => {
                console.log(err);
            })
        axios.get(`/student/${student?.id}`)
            .then(res => {
                if (res.data.state) {
                    setStudentAccount(res.data.data[0])
                }
            })
            .catch(err => {
                console.log(err);
            })
    },[isLoading,id])
    
    const addTheme = () => {
        if (Theme) {
            if (learnedTasks.length) {
                if (Theme.task.length === learnedTasks.length) {
    
                    axios.patch(`/student/add-theme/${student?.id}`,{lesson:Theme._id})
                        .then(res => {
                            if (res.data.state) {
                                toast.success("Mavzu o'rganilganlar qatoriga qo'shildi", {
                                    position: "top-right",
                                    autoClose: 5000,
                                  });
                                setIsLoading(j => !j)
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        })
                }
            }
        }
    }

  return (
    Theme?
    <div className={`w-[100%] transition-all min-h-screen bg-white absolute   `}>
        
        <div className="title px-2 my-5 mb-14 w-[100%] flex items-center justify-center">
            <h1 className=' text-xl  '>  <span className='text-3xl font-medium'> {Theme.theme} </span> </h1>
        </div>
        {
            Theme.content?.map((content,inx) => (
                content.type === "story" ?
                <div key={inx} className=" w-[100%] bg-white ">
                    <div className="heading">
                        <h1 className='text-center text-xl font-medium'>{content.title}</h1>
                    </div>
                    <div className="desc w-[100%] lg:w-[80%] lg:mx-auto px-4 ">
                        <p>{content.desc}</p>
                    </div>
                </div>
                :content.type === "videoContent" ?
                <div className="VideoContent w-[100%] my-7">
                    <div className="video w-[100%] flex items-center justify-center py-2 ">
                        <ReactPlayer  controls light url={content.video} />
                    </div>
                    <div className="heading lg:w-[80%] lg:mx-auto pt-3">
                        <h1 className='px-5 text-xl font-medium'>{content.title}</h1>
                    </div>
                    <div className="desc  w-[100%]  lg:w-[80%] lg:mx-auto px-4 ">
                        <p>{content.desc}</p>
                    </div>
                </div>
                : content.type === "glossary" ?
                <div className="glossary my-7 ">
                    <div className="flex lg:flex-nowrap flex-wrap items-center justify-center w-[100%] ">
                        <div className="glossary lg:w-[20%] w-[70%] bg-amber-300  border-2 border-slate-900 p-2 lg:p-10 ">
                            <h1 className='text-xl font-medium '>
                                {
                                    content.word
                                }
                            </h1>
                        </div>
                        <div className="flex items-center justify-center w-[100%] lg:w-[7%] ">
                         <div className="line bg-slate-700 lg:w-[100%] w-2 h-4 lg:h-2  "></div>
                        </div>
                        <div className="desc w-[90%] lg:w-[50%] bg-orange-300 border-2 border-slate-900 p-2 flex items-center max-w-[100%] ">
                            <p className=' max-w-[100%] break-all ' >
                                {
                                    content.desc
                                }
                            </p>
                        </div>
                    </div>
                </div>
                 : content.type === "dictionary"?
                 <div className="dictionary my-4">
                     <div className="">
                         <div className="words flex lg:flex-nowrap flex-wrap items-center justify-center w-[100%]">
                             <div className="word lg:w-[25%] w-[70%] bg-slate-50 border-2 border-slate-900 p-2 lg:px-10 lg:py-4 ">
                                <h1 className='text-xl font-medium '>
                                    {
                                        content.word
                                    }
                                </h1>
                             </div>

                             <div className="flex items-center justify-center w-[100%] lg:w-[7%] ">
                             <div className="line bg-slate-700 lg:w-[100%] w-2 h-4 lg:h-2  "></div>
                             </div>

                             <div className="translation lg:w-[25%] w-[70%] bg-slate-50 border-2 border-slate-900 p-2 lg:px-10 lg:py-4 ">
                                <h1 className='text-xl font-medium '>
                                    {
                                        content.translation
                                    }
                                </h1>
                             </div>
                         </div>
                         <div className="w-[100%] flex justify-center lg:justify-start "> <div className="  bg-slate-700 lg:ml-[25%] lg:h-12 w-2 h-4   "></div></div>
                         <div className="definition w-[95%] lg:w-[57%] mx-auto bg-slate-50 border-2 border-slate-900 p-2">
                             <p>
                                {
                                    content.definition
                                }
                             </p>
                         </div>
                     </div>
                 </div>
                 :content.type === "imageContentL" ?
                 <div className="Image L my-10">
                     <div className="flex flex-wrap lg:flex-nowrap  w-[100%] justify-center ">
                         <div className="image w-[97%] mx-auto lg:w-[36%]   h-[450px] lg:mr-5 ">
                          <img  className='w-[100%] h-[100%] object-contain '  src={content.image} alt="Mavju bo'yicha rasm" />
                         </div>
                         <div className="text w-[92%]  mx-auto lg:w-[36%] lg:ml-5 ">
                            <h1 className='text-xl font-medium '>
                                    {
                                        content.title
                                    }
                            </h1>
                             <p>
                                {
                                    content.desc
                                }
                             </p>

                         </div>
                     </div>
                 </div>
                 :content.type === "imageContentR" ?
                 <div className="Image L my-10">
                     <div className="flex flex-wrap lg:flex-nowrap  w-[100%] justify-center ">
                         <div className="text w-[92%] lg:mx-auto lg:w-[36%] mb-5 lg:mr-5 ">
                            <h1 className='text-xl font-medium '>
                                    {
                                        content.title
                                    }
                            </h1>
                             <p>
                                {
                                    content.desc
                                }
                             </p>

                         </div>
                         <div className="image w-[97%] mx-auto lg:w-[36%]   h-[450px] lg:ml-5 ">
                          <img className='w-[100%] h-[100%] object-contain ' src={content.image} alt="Mavju bo'yicha rasm" />
                         </div>
                     </div>
                 </div>
                  : content.type === "link" ? 
                  <div className="link w-[80%] my-2  ">
                      <div className="link pl-5 ">
                       
                       <a href={`${content.link}`} target="_blank" > <h1 className='text-sky-500 italic'>{content.title}</h1> </a>
                      </div>
                  </div>
                :
                <div className="">else</div>
            ))
        }



        <div className="task mt-32 mb-16">
            <h1 className='flex items-center '>Berilgan topshiriqlarni bajaring va  <img className=' w-[25px] h-[25px] mx-1 ' src={ok} alt="" /> ni bosing </h1>
            {
                Theme.task?.map((task,inx) => (
                    <div key={inx} className=" flex items-center py-2 my-3 px-4 w-[80%] lg:w-[30%] border-none rounded-tr-full rounded-br-full bg-slate-900 text-white">
                        <h1 className='text-xl flex-1' >{task.task}</h1>
                        {
                            studentAccount?.lessons?.includes(id) ?
                            <div className="">
                               <img className=' w-[30px] h-[30px]  ' src={okay} alt="" />
                            </div>
                            :
                            (
                                
                                    learnedTasks?.includes(task.task) ?
                                    <div onClick={()=> {
                                        learnedTasks.pop(task.task)
                                        setIsLoading(j => !j)
                                        }} className=""> 
                                      <img className=' w-[30px] h-[30px]  ' src={now} alt="" />
                                    </div>
                                    :
                                    <div onClick={()=> {
                                        learnedTasks.push(task.task)
                                        setIsLoading(j => !j)
                                        addTheme()
                                        }}  className="">
                                      <img className=' w-[30px] h-[30px]  ' src={ok} alt="" />
                                    </div>
                                
                            )
                        }
                        
                    </div>
                ))
            }
        </div>
        

        <div className="other_themes w-[80%] mx-auto flex  items-center justify-around ">
           <div 
            onClick={()=>{
                if (currentThemeInx === 0) {
                    return
                }
                history.push( `/theme-single-page/${lesson.lessons[(+currentThemeInx) - 1 ]}`)
            }}
            
           className={` py-2  px-4 bg-green-800 ${currentThemeInx === 0 ? "opacity-50 cursor-not-allowed " : " hover:cursor-pointer "} `}>
             <FaArrowLeft className='text-white' />
           </div>
           <div 
               onClick={()=>{
                history.push( `/lesson-single-page/${lesson._id}`)
                 }}
               className=" bg-teal-800 py-2 px-4 hover:cursor-pointer">
                 <MdPlayLesson className='text-[23px] text-white ' />
           </div>
           <div
                onClick={()=>{
                    if (currentThemeInx === (lesson.lessons.length -1 )) {
                        return
                    }
                    history.push( `/theme-single-page/${lesson.lessons[(+currentThemeInx) + 1 ]}`)
                }}
            className={` py-2 px-4 bg-green-800 ${currentThemeInx === (lesson?.lessons?.length -1 ) ? "opacity-50 cursor-not-allowed " : "hover:cursor-pointer"} `}>
                <FaArrowRight className='text-white' />
           </div>
        </div>

        <div className="teacher flex my-12 px-7">
            <div className="flex-1"></div>
            <h1 className=' text-xl opacity-80 font-semibold italic '>
                {
                    Theme.teacher
                }
            </h1>
        </div>
        <ToastContainer />
    </div>
    :
    <MainLoader />
  )
}

export default ThemaSingleP