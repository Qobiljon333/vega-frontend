import React,{useState,useEffect} from 'react'
import axios from "../../api/axios"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../components/loader/Loader";

const CreateSubject = () => {
    const [subject,setSubject] = useState({subject:""})
    const [createLoading, setCreateLoading] = useState(false);
    const [data,setData] = useState([])
    const createSubject = (e) =>{
        e.preventDefault();
        setCreateLoading(true)
        axios.post("/subject",subject)
            .then(res => {
                console.log(res);
                if (res.data.state) {
                    setSubject({
                        subject:""
                    })
                    toast.success(res.data.msg, {
                        position: "top-right",
                        autoClose: 5000,
                      });
                }else{
                    toast.error(res.data.msg, {
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
    useEffect(() => {
        axios.get("/subject")
            .then(res => {
                console.log("Subjects: " , res);
                setData(res.data.data)
            })
            .catch(err => {
                console.log(err);
            })
    },[createLoading])
  return (
    <div>
        
        <div className="form w-[100%] flex items-center justify-center my-10 ">
            <form onSubmit={createSubject} action="" className=' w-[100%] lg:w-[70%] lg:mx-auto ' >
                <label htmlFor="">
                    {/* SubjectName: */}
                </label>
                <input 
                 className="border_bottom block w-[95%] m-auto"
                 required
                 onChange={(e) => setSubject({subject:e.target.value})}
                 value={subject.subject}
                 placeholder="Subject..."
                type="text" />


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

        
        <h1>Subjects:</h1>
        <div className="subjects w-[100%] lg:w-[80%] lg:mx-auto flex flex-wrap  ">
            {
                data?.sort().map((subject,inx) => (
                    <div key={inx} className=" m-3 py-1 px-3 bg-slate-900 text-white ">
                        <h1 className='text-lg'>{subject.subject}</h1>
                    </div>
                ))
            }
        </div>

        <ToastContainer />
    </div>
  )
}

export default CreateSubject