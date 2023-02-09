import React,{useState,useEffect} from 'react'
import axios from '../../api/axios'
import { ToastContainer, toast } from "react-toastify";
import MainLoader from '../loader/MainLoader';
import Loader from '../loader/Loader';
import ReactPlayer from 'react-player/youtube';
import Comments from '../../router/comment/Comments';

const AddLesson = (
    {
        match: {
          params: { id },
        },
      }
) => {

    console.log(id);
    const [thisLesson,setLesson] = useState([])
    const [newLesson,setNewLesson] = useState({
        thema:"",
        video:"",
        desc:"",
        task:"",
        githubLink:"",
        ball:10,
    })

  const [createLoading, setCreateLoading] = useState(false);


    useEffect(()=> {
        axios.get(`/lesson/single-lesson/${id}`)
            .then(res => {
                setLesson(res.data)
                console.log(res.data)
            })
            .catch(err => {
                console.log(err);
            })

    },[createLoading])


    const submitNewLesson = (e)=>{
         setCreateLoading(true)
        e.preventDefault()
        axios.patch(`/lesson/add-lesson/${id}`,{lesson:newLesson})
            .then(res => {
                console.log(res.data);
                if(res.data.state){
                    setNewLesson({
                        thema:"",
                        video:"",
                        desc:"",
                        task:"",
                        githubLink:"",
                        ball:10,
                    })
                    axios.patch("/add-lesson/:id")
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
    thisLesson.state ? <div className="">

        <div className="">
            <div className="Lesson_Info md:flex ">
                <div className=" w-[100%] md:w-auto md:mr-3  h-[300px]  ">
                    <img className=' w-[100%] md:w-auto  h-[100%] object-cover ' src={thisLesson.data[0]?.urls[0] } alt="" />
                </div>
                <div className=" md:flex-1 ">
                    <h1 className='text-xl'>{thisLesson.data[0]?.title}</h1>
                    <h1 className='opacity-95'>{thisLesson.data[0]?.desc}</h1>
                    <h1>Mavzular soni: <span>{thisLesson.data[0]?.lessons.length}</span></h1>
                </div>
            </div>

        </div>

        <div className="add_lesson mt-7">
            <form onSubmit={submitNewLesson} className="Add_lesson_form" action="">

            <label className="block " htmlFor="">Mavzuni kiriting:</label>
            <input
             className="block w-[95%] m-auto  outline-none border_bottom "
              required
              onChange={(e) =>
                setNewLesson({ ...newLesson, thema: e.target.value })
              }
              value={newLesson.thema}
              type="text"
              placeholder="Mavzu ... "
            />

            <label className="block " htmlFor="">Video darslik linkini kiriting:</label>
            <input
             className="block w-[95%] m-auto border_bottom"
              required
              onChange={(e) =>
                setNewLesson({ ...newLesson, video: e.target.value })
              }
              value={newLesson.video}
              type="text"
              placeholder="Video ... "
            />

            <label className="block " htmlFor="">Mavzu haqida malumot kiriting:</label>
            <textarea
             className="block w-[95%] h-[166px] m-auto border_bottom"
              required
              onChange={(e) =>
                setNewLesson({ ...newLesson, desc: e.target.value })
              }
              value={newLesson.desc}
              // type="text"
              placeholder="Ma'lumot ... "
            />

            <label className="block " htmlFor="">Vazifa yoki Masala kiriting:</label>
            <input
             className="block w-[95%] m-auto border_bottom"
              required
              onChange={(e) =>
                setNewLesson({ ...newLesson, task: e.target.value })
              }
              value={newLesson.task}
              type="text"
              placeholder="Vazifa ... "
            />

            <label className="block " htmlFor="">Mavzuni github linkini kiriting:</label>
            <input
             className="block w-[95%] m-auto border_bottom"
              required
              onChange={(e) =>
                setNewLesson({ ...newLesson, githubLink: e.target.value })
              }
              value={newLesson.githubLink}
              type="text"
              placeholder="GitHub ... "
            />

            <button  className="student_form_btn" disabled={createLoading} type="submit">
              {createLoading && (
                <Loader
                  config={{ size: 24, color: "#fff", display: "inline-block" }}
                />
              )}{" "}
              <span className="text-zinc-900">{createLoading ? "" : "Saqlash"}</span>
            </button>
            </form>
        </div>

        <div className="created_lessons flex flex-wrap">
            {
                thisLesson.data[0]?.lessons?.map((lesson,inx) => (
                    <div key={inx} className=" w-[100%] md:w-[33%] lg:w-[24%]  my-5 mx-auto ">
                      <h1 className='text-lg my-3 text-center '> Qo'shilgan mavzular</h1>
                        <div className="video  h-[262px] md:h-[180px] relative ">
                            <div className="count w-[30px] h-[30px] border_radius_50 flex items-center justify-center bg-red-800 absolute top-0 right-0"> <h1 className='text-white'>{inx+1}</h1></div>
                              <ReactPlayer controls width="100%" height="100%" className="object-cover"  light url={lesson.video} />
                        </div>
                        <div className="py-1">
                            <h1>{lesson.thema}</h1>
                        </div>  
                    </div>
                ))
            }
        </div>
        <div className="comments w-[100%] mt-10">
        <Comments singleLesson={thisLesson} createLoading={createLoading} setCreateLoading={setCreateLoading}   id={id}  />

        </div>
        <ToastContainer />
    </div>
    :
    <MainLoader/>
  )
}

export default AddLesson