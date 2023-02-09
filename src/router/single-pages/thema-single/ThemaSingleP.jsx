import React from 'react'
import ReactPlayer from 'react-player'
import { Link } from 'react-router-dom'
import exit from "../../../assets/exit-icon-png-2.jpg"
const ThemaSingleP = ({Thema,setThemaState,themaState}) => {
  return (
    <div className={`overflow-hidden transition-all min-h-screen bg-white absolute  ${themaState? "left-0 w-[100%] " : "left-[100%] w-[0%] "}  `}>
        <div onClick={()=> setThemaState(false)} className="w-9 h-9 hover:rotate-[22deg] transition-all p-3 img m-2 bg-slate-300 border-none rounded-[50%] ">
            <img className='w-[100%] h-[100%]' src={exit} alt="" />
        </div>
        <div className="title my-5">
            <h1> Mavzu: <span> {Thema.thema} </span> </h1>
        </div>
        <div className="desc my-5">
            <h1>Taruf: <span>{Thema.desc}</span></h1>
        </div>
        <div className="video w-[100%]  my-5">
           <ReactPlayer width="100%" controls className="object-cover"  light url={Thema? Thema.video :""} />
        </div>

        <div className="task my-5">
            <h1>Vazifa: <span>{Thema.task}</span></h1>
        </div>
        {
                Thema.githubLink?
                <div className="Github">
                    <h1>GitHub-Link : <Link className='text-blue-700'>{Thema.githubLink}</Link></h1>
                </div>
                :
                ""
        }
        
    </div>
  )
}

export default ThemaSingleP