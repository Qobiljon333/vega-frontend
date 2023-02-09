import React,{useState,useEffect} from 'react'
import axios from "../../api/axios"
import Loader from '../../components/loader/Loader';
import sendIcon from "../../assets/ios-send.png"
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import {CgArrowDownR} from "react-icons/cg"

const Comments = ({comments, createLoading , setCreateLoading ,singleLesson,id}) => {

    const admin = useSelector(j=> j.user)
    const teacher = useSelector(j => j.teacher)
    const student = useSelector(j => j.student)
    let name = "someone"
    if( admin !== undefined && admin !== null){
        name = admin.username
    } else if ( teacher !== undefined && teacher !== null){
        name = teacher.username
    } else if ( student !== undefined && student !== null){
        name = student.username
    }else{
        name = "someone"
    }

    const [commentsState,setCommentsState] = useState(false)
    const [newComment,setNewComment] = useState({
        name:name,
        comment:""
    }) 
    // console.log(newComment);
    
    
   
    const submitNewComment = (e) => {
        setCreateLoading(true)
        e.preventDefault()

        axios.patch(`/lesson/add-comment/${id}`,{comment:newComment})
            .then(res => {
                console.log(res.data);
                if(res.data.state){
                    setNewComment({
                        name:name,
                        comment:""
                    })
                    setCreateLoading(false);
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
                
            })
            .catch(err => {
                console.log(err);
                setCreateLoading(false);

            })
    }
  return (
    <div className='w-[100%] bg-slate-50  my-5'>
        <div onClick={()=> setCommentsState(j => !j) } className="w-[100%]   flex items-center justify-between h-[35px] bg-slate-800 px-2 pr-5">
          <h1 className='text-slate-50 text-lg'>Izohlar : <span>{singleLesson.data[0]?.comments.length}</span></h1>
          <CgArrowDownR className={`text-white transition-all ${commentsState ? "rotate-180":"rotate-0"}`} />
        </div>



        <div className={`w-[100%] border-b-2  border-slate-800 border-solid transition-all  ${commentsState ? "max-h-[600px] overflow-y-auto" :"max-h-0 overflow-hidden" }`}>
        <div className="add_comment bg-slate-50">
        <form onSubmit={submitNewComment} className="Add_lesson_form relative bg-slate-50" action="">

            <label className="block " htmlFor="">Izoh qoldiring:</label>
            <input
            className="block w-[81%] ml-3  bg-slate-50  outline-none border_bottom "
            required
            onChange={(e) =>
                setNewComment({ ...newComment, comment: e.target.value })
            }
            value={newComment.comment}
            type="text"
            placeholder="Izoh ... "
            />
            
            

            <button  className="absolute bg-slate-50 p-2 top-[30%]  right-2" disabled={createLoading} type="submit">
              {createLoading && (
                <Loader
                config={{ size: 24, color: "#fff", display: "inline-block" }}
                />
              )}{" "}
             <img className={`w-[27px] transition-all   h-[27px] ${createLoading? " mt-[-300%] scale-0 " :""}`} src={sendIcon} alt="" />
            </button>

        </form>
        </div>
        <p>
        </p>
        <div className="comments  mx-auto bg-slate-50 px-3 py-2">
            {
                singleLesson.data[0]?.comments.map((comment,inx) => (
                    <div key={inx} className="comment my-4  ">
                        <div className=" inline-block bg-[#252525] border-none rounded-tr-[50px]   py-1 px-3 pr-7 ">
                             <h1 className='text-white text-lg'>{comment.name}</h1>
                        </div>
                        <div className="desc bg-white py-2 px-3 border-none rounded-tr-[40px]">
                            <p>{comment.comment}</p>
                        </div>
                    </div>
                ))
            }
        </div>
        </div>
        <ToastContainer />
    </div>
  )
}

export default Comments