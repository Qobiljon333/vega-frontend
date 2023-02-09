import React,{useState,useEffect} from 'react'
import ReactPlayer from 'react-player'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import axios from '../../../api/axios'
import MainLoader from '../../../components/loader/MainLoader'
import Comments from '../../comment/Comments'
import ThemaSingleP from '../thema-single/ThemaSingleP'



const LessonSingleP = (
    {
        match: {
          params: { id },
        },
      }
) => {

  const [singleLesson,setSingleLesson] = useState([])

  const [Thema,setThema ] = useState({
    thema:"",
    desc:"",
    video:"",
    task:"",
    githubLink :"",


  })
  const [themaState,setThemaState] = useState(false)
  // console.log(themaState );
  const [commentsState,setCommentsState] = useState(false)
  const [createLoading, setCreateLoading] = useState(false);

  useEffect(()=>{
    axios.get(`/lesson/single-lesson/${id}`)
            .then(res => {
                setSingleLesson(res.data)
                // console.log(res.data)
            })
            .catch(err => {
                console.log(err);
            })
  },[createLoading])

  // learn

  const history = useHistory()

  const studentLoc= useSelector(j => j.student)
  const [learnState, setLearnState] = useState(false)
  const [refresh,setRefresh] = useState(false)
  console.log(learnState,"learn state");

  const [Student,setStudent] = useState(null)
  console.log(Student," failk adla wdoiawkld awk");
    useEffect(()=> {
      if (studentLoc != null) {
        axios.get(`/student/${studentLoc.id}`)
        .then(res => {
          setStudent(res.data.data[0])
          if(res.data.data[0].mainLessons.includes(id)){
            setLearnState(true)
          }
          // console.log(res);
        })
        .catch(err => {
          console.log(err);
        })
      }
    },[refresh])
  // console.log(Student ,"student");
  const LearnBtn = () =>{
    if(studentLoc === null){
      return history.push("/login-student")
    }

   if (Student.mainLessons?.includes(id)){
     console.log("noo");
    
   } else{
    console.log("ok");
    axios.patch(`/student/add-mainLesson/${Student._id}`,{mainLesson:id})
      .then(res => {
        console.log( res);
        // window.location.reload(true)   refresh berish
        setRefresh(j => !j)
      })
      .catch(err => {
        console.log( err);
      })
   }

  } 
  // console.log( studentLoc );
  return (
    singleLesson.state ?
    
    <div className={`w-[100%]  relative `}>
        <ThemaSingleP themaState={themaState}  setThemaState={setThemaState} Thema={Thema} />

    <div  className={` overflow-hidden  ${themaState? "h-0": "h-auto"} `}>

      <div className="Cart lg:flex">
        <div className="img lg:w-[50%] lg:h-[350px]  flex items-center justify-center ">
          <div className="h-[100%]">
             <img className=' h-[100%] ' src={singleLesson.data[0]?.urls[0]} alt="Darslik rasmi" />
          </div>

        </div>
        <div className="Info lg:w-[50%] py-3 lg:py-6 mx-1">
          <div className="flex w-[100%] justify-between ">
            <h1 className='max-w-[70%] pr-1'>Nomi: <span className='text-xl'>{singleLesson.data[0]?.title} bo'yicha dars</span></h1>
           
           
            <div onClick={LearnBtn} className={`learn ${learnState? "bg-slate-600" :"bg-red-800"} text-white py-1 flex items-center justify-center hover:cursor-pointer h-[40px] w-[100px] mr-[3%] box_shadow `}>
              {
                learnState ? 
                <h1 className='text-xl'>Unlearn</h1>
                :
                <h1 className='text-xl'>Learn</h1>

              }
            </div>
          
          
          </div>
          <div className="">
            <h1>Kurs Turi: {singleLesson.data[0]?.type}</h1>
            <h1>Ustoz: {singleLesson.data[0]?.owner}</h1>
            <h1>O'rganuvchilar: {singleLesson.data[0]?.students}</h1>
            <h1 className='opacity-100'>Malumot: <span>{singleLesson.data[0]?.desc}</span></h1>
          </div>
        </div>
      </div>

      <div className="lessons my-10 mx-3 ">
        {
          singleLesson.data[0]?.lessons?.map((lesson,inx) => (
            <div onClick={()=> {
              setThema(lesson)
              setThemaState(true)
            }} key={inx} className="lesson flex items-center justify-between my-4 h-[65px]">
              <div className="lesson_video w-[25%] h-[65px] ">
               <ReactPlayer width="100%" height="100%" className="object-cover"  light url={lesson? lesson.video :""} />
              </div>
              <div className="w-[65%] h-[100%] overflow-hidden  px-2">
                <h1 className='text-center '>
                  {lesson? lesson.thema : ""}
                </h1>
              </div>
              <div className="count w-[40px] h-[40px] flex items-center justify-center h- bg-red-800 ">
                <h1 className='text-white text-xl'>
                  {
                    inx + 1
                  }
                </h1>
              </div>
            </div>
          ))
        }
      </div>


        <div onClick={()=>setCommentsState(true)} className="Comments">
          <Comments singleLesson={singleLesson} createLoading={createLoading} setCreateLoading={setCreateLoading}   id={singleLesson.data[0]?._id}  />
     
        </div>


    </div>
    </div>
    
    :
    <MainLoader />
  )
}

export default LessonSingleP