import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import "./CreateStudent.css"
import { auth } from "../../auth/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../components/loader/Loader";

const CreateStudent = () => {
  document.title = "Ro'yxatdan o'tish"

  const [ studentState, setStudentState ] = useState({
    name:"",
    username:"",
    password:"",
    image:"https://res.cloudinary.com/dqo5dvwfj/image/upload/v1673543726/teachers/photo_2023-01-11_01-44-23_ves15z.jpg",
    connection:"",
    desc:""
  })

  const [createLoading, setCreateLoading] = useState(false);

  const createStudent = (e) => {
    e.preventDefault();
    setCreateLoading(true)

    axios
        .post("/student/sign-up", studentState)
        .then(({ data }) => {
          if( data.state ){
            setStudentState({
              name:"",
              username:"",
              password:"",
              image:"https://res.cloudinary.com/dqo5dvwfj/image/upload/v1673543726/teachers/photo_2023-01-11_01-44-23_ves15z.jpg",
              connection:"",
              desc:""
            });
            toast.success(data.msg, {
              position: "top-right",
              autoClose: 5000,
            });
          } else{
            toast.error(data.msg, {
              position: "top-right",
              autoClose: 10000,
            });
          }

          setCreateLoading(false);

        })
        .catch((err) => {
          console.log(err);
          setCreateLoading(false)
        })
  }



  return (
    <div className=" w-[100%] ">
      <h1 className="text-xl text-center mb-8">Student akkount yaratish.</h1>
      <div className="Form_Container w-[100%]">
        <form action="" className="Student_form min-h-[550px] w-[99%]  m-auto  md:w-[370px] lg:w-[480px] xl:w-[485px]  " onSubmit={createStudent}> 
         <label className="block text-center" htmlFor="">Ism, Familiyangizni kiriting:</label>
            <input
             className="block w-[95%] m-auto"
              required
              onChange={(e) =>
                setStudentState({ ...studentState, name: e.target.value })
              }
              value={studentState.name}
              type="text"
              placeholder="Ism, familiya"
            />
         <label className="block text-center" htmlFor="">Foydalanish uchun Yagona bo'lgan Name " Nom " tanlang:</label>
            <input
              className="block w-[95%] m-auto"
              required
              onChange={(e) =>
                setStudentState({ ...studentState, username: e.target.value })
              }
              value={studentState.username}
              type="text"
              placeholder="Username 'nom' ... "
            />
          <label className="block text-center" htmlFor="">Parol kiritng va eslab qoling:</label>
            <input
              className="block w-[95%] m-auto"
              required
              onChange={(e) =>
                setStudentState({ ...studentState, password: e.target.value })
              }
              value={studentState.password}
              type="text"
              placeholder=" Paroll ... "
            />

          <label className="block text-center" htmlFor=""> Aloqa vositanizni kiriting:</label>
            <input
              className="block w-[95%] m-auto"
              required
              onChange={(e) =>
                setStudentState({ ...studentState, connection: e.target.value })
              }
              value={studentState.connection}
              type="text"
              placeholder=" Telafon: +998901234567, Telegram: @abcdf ...  "
            />

          <label className="block text-center" htmlFor="">O'zingiz haqingizda:</label>
            <input
              className="block w-[95%] m-auto"
              required
              onChange={(e) =>
                setStudentState({ ...studentState, desc: e.target.value })
              }
              value={studentState.desc}
              type="text"
              placeholder="Istalgan ma'lomot yozing ... "
            />

          
            <button  className="student_form_btn" disabled={createLoading} type="submit">
              {createLoading && (
                <Loader
                  config={{ size: 24, color: "#fff", display: "inline-block" }}
                />
              )}{" "}
              <span className="text-zinc-900">{createLoading ? "" : "Jo'natish"}</span>
            </button>
       </form>
      </div>
      <ToastContainer />
    </div>
  )
}

export default CreateStudent