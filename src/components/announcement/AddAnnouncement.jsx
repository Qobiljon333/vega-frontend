import React,{useEffect,useState} from 'react'
import { ToastContainer, toast } from "react-toastify";
import axios from "../../api/axios"
import Loader from '../loader/Loader';

const AddAnnouncement = ({id}) => {
    const [newAnnouncement,setNewAnnouncement] = useState({
        date:"",
        title:"",
        desc:""
    })

  const [createLoading, setCreateLoading] = useState(false);
  const submitNewAnnouncement = (e) => {
    setCreateLoading(true)
    e.preventDefault()
    axios.patch(`/teacher/add-news/${id}`,{news:newAnnouncement})
        .then(res => {
            console.log(res.data);
            if(res.data.state){
                setNewAnnouncement({
                    date:"",
                    title:"",
                    desc:""
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
    console.log(newAnnouncement);
    return (
    <div>
        <h1 className='text-center my-4 '>E'lon Qo'shish</h1>
        <form onSubmit={submitNewAnnouncement} className="form_announcement my-3 pl-1">
           
        <label className='block mt-5 text-sm' htmlFor="date">E'lon kunini kiriting:</label>
             <input  
              required
             className="w-[95%] h-[38px] outline-none border_bottom"
              onChange={(e) => setNewAnnouncement({...newAnnouncement,date:e.target.value})}
              value={newAnnouncement.date}
              type="date"
              id='date'
              placeholder='lorem'
             />
           
            <label className='block mt-5 text-sm' htmlFor="title">E'lon Nomi:</label>
            <input
             required
             className="w-[95%] h-[38px] outline-none border_bottom"
             onChange={(e) => setNewAnnouncement({...newAnnouncement, title:e.target.value })}
             value={newAnnouncement.title}

             type="text"
             id='title'
             placeholder="E'lon nimaga tegishli"
             />

            <label className='block mt-5 text-sm' htmlFor="desc">E'lon matnini yozing:</label>
            <textarea 
             required
             className="w-[95%] h-[166px] outline-none border_bottom"
             onChange={(e) => setNewAnnouncement({...newAnnouncement, desc:e.target.value })}
             value={newAnnouncement.desc}
             type="text"
             id='desc'
             placeholder="E'lon nimaga tegishli"
             />
            
            
            <button className=' mt-8 block mx-auto  ' disabled={createLoading} type="submit">
              {createLoading && (
                <Loader
                  config={{ size: 24, color: "#fff", display: "inline-block" }}
                />
              )}{" "}
              <span className=" text-zinc-900 box_shadow border-none rounded-3xl py-1 px-4">{createLoading ? "" : "Saqlash"}</span>
            </button>
        </form>
     
      <ToastContainer />
    </div>
  )
}

export default AddAnnouncement