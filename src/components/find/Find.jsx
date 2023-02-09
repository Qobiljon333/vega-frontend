import React,{useState} from 'react'
import SeeMoreLessons from '../../router/see-more/SeeMoreLessons'
import SeeMoreTeachers from '../../router/see-more/SeeMoreTeachers'

const Find = () => {
    const [ catalog,setCatalog] = useState("lessons")
  return (
    <div className='bg-slate-50 border  max-w-[100%] overflow-y-hidden '>
        <div className="search"></div>
        <div className="catalog max-w-[100%] overflow-y-hidden ">
            <div className="catalog_btn my-5 w-[100%] flex overflow-y-auto ">
                    <div className="News block mx-auto bg-slate-900 py-[4px] px-4  border-none rounded-sm"><span onClick={()=> setCatalog("lessons")} className={`text-white text-sm borderB ${catalog === "lessons" ? "boderBF" : "borderB"}`}>Darslar</span></div>
                    <div className="lessons block mx-auto bg-slate-900 py-[4px] px-4   border-none rounded-sm"><span onClick={()=> setCatalog("teachers")} className={`text-white text-sm borderB ${catalog === "teachers" ? "boderBF" : "borderB"}`}>O'qituvchilar</span></div>
                    <div className="Students block mx-auto bg-slate-900 py-[4px] px-4   border-none rounded-sm"><span onClick={()=> setCatalog("students")} className={`text-white text-sm borderB ${catalog === "students" ? "boderBF" : "borderB"}`}>O'rganuvchilar</span></div>
            </div>
            <div className="w-[100%] flex overflow-hidden">
            <div className={`max-w-[100%] min-w-[100%]  transition_slow  ${catalog === "lessons" ? "ml-0 ":  "ml-[-100%]  overflow-x-hidden"}`}>
                <SeeMoreLessons />
            </div>
            <div className={`max-w-[100%] min-w-[100%]  transition_slow ${catalog === "teachers" ? "ml-0" : catalog === "lessons"? "ml-[101%] overflow-y-hidden " :"ml-[-101%] overflow-y-hidden"} `}>
                {/* <h1>O'qitvchilar</h1> */}
                <SeeMoreTeachers />
            </div>
            <div className={`max-w-[100%] min-w-[100%]  transition_slow ${catalog === "students" ? "ml-0" : catalog === "lessons"? "ml-[301%] overflow-y-hidden " :"ml-[101%] overflow-y-hidden"} `}>
                <h1>O'quvchilar:</h1>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Find