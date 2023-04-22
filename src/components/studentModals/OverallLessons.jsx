import React,{useState,useEffect} from 'react'
import ReactPlayer from 'react-player';
import { useHistory } from 'react-router-dom';
import axios from "../../api/axios"

const OverallLessons = ({lessons,learnedLessons,state}) => {
  const history = useHistory()
  const [data,setData] = useState([])
  const [count,setCount] = useState(0)
  // console.log(data);
  const [loading,setLoading] = useState(true)
  const [page,setPage] = useState("unlearned")
  useEffect(()=>{
    if (!lessons) {
      return 
    }
    if (!lessons[0]?.mainLesson) {
      return 
    }
    lessons.forEach(element => {
      axios.get(`/lesson/${element.mainLesson}`)
        .then(res => {
          axios.get(`/theme/special/${element.mainLesson}`)
            .then(res2 => {
              setData(j => [...j,{mainLesson:res.data.data[0], themes:res2.data.data}])
            })
            .catch(err => {
              setData(j => [...j,{mainLesson:res.data.data[0], themes:[]}])
            })
        })
        .catch(err => {
          console.log(err);
        })
        
    });
  },[lessons])
  // const timer = () => {
  //   setTimeout(()=>{
      
  //     if (!lessons?.length) {
  //         setLoading(j => !j)
  //         setCount(j => j+1)
  //     }
  //   },2000)
  // }
  // if (count < 10){
  //   timer()
  // }
  return (
    data.length?
    <div className={`text-black w-[100%] overflow-x-hidden ${ state === "overallLessons"? "h-screen overflow-y-auto" : "h-0 overflow-hidden" }`}>
      <div className="nav w-[100%] flex items-center ">
        <div onClick={() => setPage("unlearned")} className="  bg-slate-900 border-none rounded-sm mx-5 py-[3px] px-5 "><h1 className={`text-white  ${page === "unlearned" ? "border-solid border-b-2 border-white" : ""}`}>O'rganilmagan </h1></div>
        <div onClick={() => setPage("learned")} className="  bg-slate-900 border-none rounded-sm mx-5 py-[3px] px-5 "><h1 className={`text-white  ${page === "learned" ? "border-solid border-b-2 border-white" : ""}`}>O'rganilgan   </h1></div>
      </div>
      <div className="o'rganilmagan ">
        { 
          data.map((lesson,inx) => (
            <div key={inx} className="w-[100%] py-1 my-10   ">
              <div className="bg-emerald-800 border-none rounded-tr-full  text-white py-[3px] pl-3 pr-12  inline-block">
               <h1> {lesson.mainLesson.title} </h1> 
              </div>
              {
                page === "unlearned" ?
                <div className="w-[100%] unlearned pl-3">
                {
                  lesson.themes.length ?
                  lesson.themes?.map(((theme,inx) => (
                    ! learnedLessons.includes(theme._id) ?
                    <div onClick={()=> {
                      history.push(`/theme-single-page/${theme._id}`)
                    }} key={inx} className="flex w-[100%] my-3 ">
                      <img className=' w-[5.5rem] h-[4rem] ' src={theme.image} alt="" />
                      <h1 className='ml-1'>{theme.theme} </h1>
                    </div>
                    :
                    <div key={inx} className=""></div>
                  )))
                  :
                  <div key={inx} className="">
                    <h1 className='text-xl mt-2'>Mavjular Yo'q</h1>
                  </div>
                }
              </div>
              :
              <div className="w-[100%] learned pl-3">
                {
                  lesson.themes.length ?
                  lesson.themes?.map(((theme,inx) => (
                    learnedLessons.includes(theme._id) ?
                    <div onClick={()=> {
                      history.push(`/theme-single-page/${theme._id}`)
                    }} key={inx} className="flex w-[100%] my-3 ">
                      <img className=' w-[5.5rem] h-[4rem] ' src={theme.image} alt="" />
                      <h1 className='ml-1'>{theme.theme} </h1>
                    </div>
                    :
                    <div key={inx} className="">  </div>
                  )))
                  :
                  <div className="">
                    <h1 className='text-xl mt-2'></h1>
                  </div>
                }
              </div>
              }
              
              

            </div>
          ))
         
        }
      </div>
      <div className="">

      </div>
    </div>
    :
    <div className={`text-black w-[100%] ${ state === "overallLessons"? "h-screen overflow-y-hidden" : "h-0 overflow-hidden" }`}>
      <h1>
        O'rganilayotgan mavzular yo'q
      </h1>
    </div>
  )
}

export default OverallLessons