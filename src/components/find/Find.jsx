import React,{useState} from 'react'
import SeeMoreLessons from '../../router/see-more/SeeMoreLessons'
import SeeMoreStudents from '../../router/see-more/SeeMoreStudents'
import SeeMoreTeachers from '../../router/see-more/SeeMoreTeachers'
import Search from './Search'

const Find = () => {
    const [ catalog,setCatalog] = useState("lessons")
    const [searchState,setSearchState] = useState(false)
  return (
    <div className='bg-slate-50 border  max-w-[100%] overflow-y-hidden relative'>
        <div className="search w-[100%] fixed z-50  top-0 left-0">
            <Search />
        </div>
        <div className="catalog max-w-[100%] mt-[45px] overflow-y-hidden ">
            <div className="catalog_btn my-3 w-[100%] flex overflow-y-auto ">
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
                <SeeMoreStudents />
            </div>
            </div>
        </div>
    </div>
  )
}

export default Find