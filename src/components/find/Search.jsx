import React,{useEffect,useState} from 'react'
import axios from "../../api/axios"
import { MdOutlineSearch } from 'react-icons/md'
import { useHistory } from 'react-router-dom'


const Search = ( {searchStateM, setSearchStateM} ) => {
    const [resultState,setResultState] = useState(false)
    const [searchState,setSearchState] = useState(false)
    const [searchText,setSearchText] = useState("")
    const [data,setData] = useState([])
    // console.log(data);
    const history = useHistory()
    useEffect(() => {
        if (!searchText) {
            return 
        }
        axios.get(`/lesson/search/${searchText}`)
            .then( lessons => {
                setData([])
                if (lessons.data.state) {
                    lessons.data.data.forEach(lesson => {
                        setData(j => [...j,lesson])
                    });
                }
                axios.get(`/theme/search/${searchText}`)
                    .then( themes => {
                        if (themes.data.state) {
                            themes.data.data.forEach(theme => {
                                setData(j => [...j,theme])
                            });
                        }
                        axios.get(`/teacher/search/${searchText}`)
                            .then( teachers => {
                                if (teachers.data.state) {
                                    teachers.data.data.forEach(teacher => {
                                        setData(j => [...j,teacher])
                                    });
                                }

                            })
                            .catch(err => {
                                console.log("search teachers error");
                            })
                    })
                    .catch(err => {
                        console.log("search themes, error");
                    })
            } )
            .catch(err => {
                console.log("search lesson error" , err);
            })
    },[searchText])
  return (
    <div className=' relative   ' >
           <div className="md:bg-slate-700 bg-slate-50  border-2 border-slate-50 md:border-slate-600 ">
                <div 
                onClick={()=> {
                    setSearchState(true)
                    setResultState(true)
                }}
                className="search_container bg-white w-[95%] mx-auto border-none rounded-full overflow-hidden pl-2  my-1">
                    <div className="   s flex  "> 
                        <div className="flex-1  flex justify-end ">
                                    <input
                                        className=" w-[98%]  m-auto  outline-none  "
                                        required
                                        onChange={(e) =>
                                            setSearchText( e.target.value )
                                        }
                                        value={searchText}
                                        type="text"
                                        placeholder="Darslik, Mavzu, Ustoz... "
                                    />
                        </div>
                        <div 
                        
                            className=" p-2  bg-slate-100 flex  "> <MdOutlineSearch className='text-xl ' />
                        </div>
                    </div>
                
                    
                </div>
           </div>
            <div className={`results bg-[#00000068]  w-[100%]   ${ resultState || searchStateM ? " h-[95vh]  " : "h-0 overflow-hidden " } `}>
                {
                    data.length ? 
                    <div   className="result flex h-[100%] ">
                          <div  onClick={() => {
                             setResultState(false)
                             setSearchStateM(false)
                             }} className="exit w-[5%] bg-[#0000008a]  ">
                           </div>
                        <div className="results w-[83%] bg-[#000000ee] h-[100%] pb-10 pl-1 lg:px-5 overflow-y-auto ">
                            {
                                data.map((element,inx) => (
                                    <div  onClick={ ()=> {
                                        history.push(element.title ? `/lesson-single-page/${element._id}` : element.theme? `/theme-single-page/${element._id}` : `/teacher-single-page/${element._id}`) 
                                        setData([])
                                        setResultState(false)
                                        setSearchStateM(false)
                                        setSearchText("")
                                    }
                                        } className=" w-[100%] flex hover:cursor-pointer "
                                         key={inx}>
                                        <div className="imgs  ">
                                            {
                                                element.image ?
                                                <img className={`w-24 h-20 lg:w-60 lg:h-40 border-none rounded-md my-2 `} src={element.image} alt="Darslik Rasmi " />
                                                :
                                                <div className={`  my-2  ${element.name ? " mx-6 w-14 h-14 border-none rounded-full overflow-hidden " : " w-24 h-20 lg:w-60 lg:h-40 "} `}>
                                                    <img className={`w-[100%] h-[100%] object-cover `} src={element.urls[0]} alt="Rasm" />
                                                </div>
                                            }
                                        </div>
                                        <div className={`${element.name ? "  min-h-14  " : " min-h-20 "}   pt-2  border-none rounded-md pl-3 flex flex-wrap flex-1 items-stretch justify-start   `}>
                                            <h1 className='text-white w-[100%] '>
                                                {
                                                    element.title || element.theme || element.username
                                                }
                                            </h1>
                                            <div className="  flex w-[100%] pr-4 pb-1 items-end justify-end">
                                               <h1 className='text-slate-400 text-sm'>
                                                
                                                {
                                                    element.owner || element.teacher 
                                                } 
                                               </h1> 
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                        <div  onClick={() => {
                            setResultState(false)
                            setSearchStateM(false)
                            }} className="exit  w-[12%] bg-[#00000068] ">
                        </div>
                    </div>
                    :
                    <div
                        onClick={() => {
                            setResultState(false)
                            setSearchStateM(false)
                        }}
                     className=" h-[100%] bg-[#00000098] ">

                        
                    </div>
                }
            </div>
    </div>
  )
}

export default Search