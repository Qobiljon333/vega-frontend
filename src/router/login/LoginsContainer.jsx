import React from 'react'
import { NavLink } from 'react-router-dom'

const LoginsContainer = () => {
  return (
    <div className={`w-[100%]  min-h-screen py-10 flex items-center justify-center`}>
            <div className="box_shadow p-2 w-[260px] md:w-[350px] h-[380px] ">
                <h1 className='text-sm text-center md:text-base'>Kim sifatida Ro'yhatdan o'tgansiz yoki Profilingiz mavjud ?</h1>

                <NavLink  to={`/login-student`}>
                    <div className="w-[95%] my-3 mx-auto py-1 bg-slate-900 flex items-center justify-center ">
                    <h1 className='text-white'>O'rganuvchi</h1>
                    </div>
               </NavLink>

               <NavLink  to={`/login-teacher`}>
                <div className="w-[95%] my-3 mx-auto py-1 bg-slate-900 flex items-center justify-center ">
                  <h1 className='text-white'>O'qituvchi</h1>
                </div>
              </NavLink>
              
             <NavLink   to={`/login`}>
                <div className="w-[95%] my-3 py-1 mx-auto  bg-slate-700 flex items-center justify-center ">
                <h1 className='text-white'>Admin</h1>
                </div>
             </NavLink>
            
            <h1 className='  text-center mt-16'>O'rganuvchi sifatida ro'yhatdan o'tish</h1>
            <NavLink   to={`/create-student`}>
                <div className="w-[95%] my-3 py-1 mx-auto  bg-green-800 flex items-center justify-center ">
                <h1 className='text-white'>Ro'yxatdan o'tish</h1>
                </div>
             </NavLink>
          
            </div>
    </div>
  )
}

export default LoginsContainer