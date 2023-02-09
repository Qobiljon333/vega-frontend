import React, { useState } from 'react'
import s from './Login.module.css'
import { Link } from 'react-router-dom'
import axios from "../../api/axios"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import {SIGN_IN_TEACHER} from "../../context/action/actionTypes"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginTeacher() {
  document.title = "Login";
  const [teacher, setTeacher] = useState({
    username: "",
    password: ""
  })
  const [result, setResult] = useState({msg:"", state: false, user: {}})
  const [loading, setLoading] = useState(false)
  const [anime, setAnime] = useState(false)

  const history = useHistory()

  const dispatch = useDispatch()

  const signIn = (e)=>{
    e.preventDefault()
    setLoading(true)
    setAnime(true)
    setTimeout(()=>{
        setAnime(false)
    },1000)

    axios.post("/teacher/sign-in", teacher)
      .then(res=> {
        setResult(res.data)
        setLoading(false)
        if(res.data.state){
          setTeacher({
            username: "",
            password: ""
          })
          console.log(res.data.user);
          if(res.data.user.teacherToken){
            dispatch({type:SIGN_IN_TEACHER, payload: res.data.user })
            history.push("/teacher")
            return;
          }
      }
      })
      .catch(err=>{
        console.log(err)
        setLoading(false)
        return;
      })
  }
  return (
    <div className={s.login_teacher}>
      <div className={s.card}>
        <h1 className={s.title}>Hurmatli Teacher Akkountingizga kiring</h1>
        <div className={result.msg ? result.state ? [s.modal, s.suc,  anime ? s.anime : ""].join(' '): [s.modal, s.err,  anime ? s.anime : ""].join(' '): s.modal} >
            <p>{result.msg}</p>
        </div>
        <form onSubmit={signIn} className={s.form}>
          <label htmlFor="inp_name" className={s.input_text}>Sizning usernamingiz:</label>
          <input 
          value={teacher.username}
          onChange={({target}) => setTeacher({...teacher, username: target.value.trim()})}
          type="text" 
          id='inp_name' 
          className={s.inp} 
          />
          <label htmlFor="inp_pw" className={s.input_text}>Sizning parolingiz:</label>
          <input 
          value={teacher.password}
          onChange={({target}) => setTeacher({...teacher, password: target.value.trim()})}
          type="password" 
          id='inp_pw' 
          className={s.inp} 
          />
          <button disabled={loading} className={s.submit_btn}>{loading ? "Loading...": "Kirish"}</button>
        </form>
        <div className={s.border}></div>
        <Link to='/' className={s.backhome_btn}>Asosiy sahifaga qaytish</Link>
      </div>
      <ToastContainer />
    </div>
  )
}

export default LoginTeacher