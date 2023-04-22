import React,{useState,useEffect} from 'react'
import axios from "../../../api/axios"
import { ToastContainer, toast } from "react-toastify";
import MainLoader from '../../../components/loader/MainLoader';
import Loader from '../../../components/loader/Loader';
import ReactPlayer from 'react-player/youtube';
import sendIcon from "../../../assets/ios-send.png"
import { MdDelete, MdOndemandVideo, MdOutlineClose, MdSlowMotionVideo } from 'react-icons/md';
import { contentTypes } from '../../../static/static';
import {Link} from "react-router-dom"
import no from "../../../assets/no.png"
import yes from "../../../assets/yes.png"
import plus from "../../../assets/plus2.png"
import exit from "../../../assets/exit-icon-png-2.jpg"
import send from "../../../assets/ios-send.png"
import { BsImageFill } from 'react-icons/bs';
import {RiSendPlaneFill} from "react-icons/ri"
import {FaSearch}  from "react-icons/fa"
const AddTheme = ({teacher,id,image,setRefresh}) => {
    const [allData,setAllData] = useState({
        lessonId:id,
        teacher,
        theme:"",
        image,
        content:[],
        task:[],
        tag:[]

    })
    const [newContent,setNewContent] = useState({})
    const [modalState,setModalState] = useState(false)
    const [createLoading, setCreateLoading] = useState(false);


    const [addContent,setAddContent] = useState(false)
    const setContent = (content) => {
        allData.content.push(content)
        setAddContent(j => !j)
        // console.log(allData);
    }
    const removeContent = (inx) => {
        allData.content.splice(inx,inx=+1)
        setAddContent(j => !j)
    }
    const removeTask = (inx) => {
        allData.task.splice(inx,inx=+1)
        setAddContent(j => !j)
    }
    const removeTag = (inx) => {
        allData.tag.splice(inx,inx=+1)
        setAddContent(j => !j)
    }

    const submitTheme = () => {
        if (!id) {
            return  toast.error("Mavzu qaysi Darslikka tegishliligi topilmadi", {
                position: "top-right",
                autoClose: 10000,
              });
        }
        if (!teacher) {
            return  toast.error("Mavzu yaratuvchisi aniqlanmadi.", {
                position: "top-right",
                autoClose: 10000,
              });
        }
        if (!allData.content.length) {
            return  toast.error("Content topilmadi", {
                position: "top-right",
                autoClose: 10000,
              });
        }
        if (!allData.tag.length) {
            return toast.error("Tag topilmadi", {
                position: "top-right",
                autoClose: 10000,
              });
        }
        if (!allData.task.length) {
            return toast.error("Task topilmadi", {
                position: "top-right",
                autoClose: 10000,
              });
        }
        
        axios.post(`/theme/create`,allData)
        .then(res => {
            console.log(res.data);
            setRefresh(j => !j)
            if(res.data.state){
                setAllData({
                    lessonId:id,
                    teacher,
                    theme:"",
                    image,
                    content:[],
                    task:[],
                    tag:[]
                })
                axios.patch(`/lesson/add-lesson/${id}`,{lesson:res.data.data._id})
                  .then(res => {
                    console.log(res);
                  })
                  .catch(err => {
                    console.log(err);
                  })
                setCreateLoading(false);
                toast.success(res.data.msg, {
                    position: "top-right",
                    autoClose: 5000,
                  });
                axios.get(`/student/groupmates/${id}`)
                  .then(students => {
                    if (students.data.state) {
                        students.data.data?.forEach(student => {
                            axios.patch(`/student/add-theme-count/${student._id}`)
                                .then(res => {
                                    console.log(res);
                                })
                                .catch(err => {
                                    console.log(err);
                                })
                        })
                    }
                  })
                  .catch(err => {
                    console.log(err);
                  })
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
    <div className='relative'>
                     <div className="theme w-[100% ] px-2 flex ">
                           <label className=" text-xl mr-1" htmlFor="">Mavzu: </label>
                            <input
                            className=" w-[95%] m-auto  outline-none border_bottom "
                            required
                            onChange={(e) =>
                                setAllData({ ...allData, theme: e.target.value })
                            }
                            value={allData.theme}
                            type="text"
                            placeholder="Mavzu ... "
                            />
                     </div>
        <div className="addedContent w-[100%] ">
          {
                allData.content.map((content,inx) => (
                    content.type === "story" ?
                    <div key={inx} className=" w-[100%] bg-white ">
                        <div className="flex w-[100%] px-5  "><div className="flex-1"></div> <span className='hover:cursor-pointer' onClick={() =>removeContent(inx)}>X</span> </div>
                        <div className="heading">
                            <h1 className='text-center text-xl font-medium'>{content.title}</h1>
                        </div>
                        <div className="desc w-[100%] px-4 ">
                            <p>{content.desc}</p>
                        </div>
                    </div>
                    :content.type === "videoContent" ?
                    <div className="VideoContent w-[100%] my-7">
                        <div className="flex w-[100%] px-5  "><div className="flex-1"></div> <span className='hover:cursor-pointer' onClick={() =>removeContent(inx)}>X</span> </div>

                        <div className="video w-[100%] flex items-center justify-center py-2 ">
                            <ReactPlayer  controls light url={content.video} />
                        </div>
                        <div className="heading pt-3">
                            <h1 className='px-5 text-xl font-medium'>{content.title}</h1>
                        </div>
                        <div className="desc w-[100%] px-4 ">
                            <p>{content.desc}</p>
                        </div>
                    </div>
                    : content.type === "glossary" ?
                    <div className="glossary my-7 ">
                        <div className="flex w-[100%] px-5  "><div className="flex-1"></div> <span className='hover:cursor-pointer' onClick={() =>removeContent(inx)}>X</span> </div>

                        <div className="flex lg:flex-nowrap flex-wrap items-center justify-center w-[100%] ">
                            <div className="glossary lg:w-[20%] w-[70%] bg-slate-50 border-2 border-slate-900 p-2 lg:p-10 ">
                                <h1 className='text-xl font-medium '>
                                    {
                                        content.word
                                    }
                                </h1>
                            </div>
                            <div className="flex items-center justify-center w-[100%] lg:w-[7%] ">
                             <div className="line bg-slate-700 lg:w-[100%] w-2 h-4 lg:h-2  "></div>
                            </div>
                            <div className="desc w-[90%] lg:w-[50%] bg-slate-50 border-2 border-slate-900 p-2 flex items-center lg:min-h-[150px] ">
                                <p className='text-center' >
                                    {
                                        content.desc
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                     : content.type === "dictionary"?
                     <div className="dictionary">
                        <div className="flex w-[100%] px-5  "><div className="flex-1"></div> <span className='hover:cursor-pointer' onClick={() =>removeContent(inx)}>X</span> </div>

                         <div className="">
                             <div className="words flex lg:flex-nowrap flex-wrap items-center justify-center w-[100%]">
                                 <div className="word lg:w-[25%] w-[70%] bg-slate-50 border-2 border-slate-900 p-2 lg:px-10 lg:py-4 ">
                                    <h1 className='text-xl font-medium '>
                                        {
                                            content.word
                                        }
                                    </h1>
                                 </div>

                                 <div className="flex items-center justify-center w-[100%] lg:w-[7%] ">
                                 <div className="line bg-slate-700 lg:w-[100%] w-2 h-4 lg:h-2  "></div>
                                 </div>

                                 <div className="translation lg:w-[25%] w-[70%] bg-slate-50 border-2 border-slate-900 p-2 lg:px-10 lg:py-4 ">
                                    <h1 className='text-xl font-medium '>
                                        {
                                            content.translation
                                        }
                                    </h1>
                                 </div>
                             </div>
                             <div className="w-[100%] flex justify-center lg:justify-start "> <div className="  bg-slate-700 lg:ml-[25%] lg:h-12 w-2 h-4   "></div></div>
                             <div className="definition w-[95%] lg:w-[57%] mx-auto bg-slate-50 border-2 border-slate-900 p-2">
                                 <p>
                                    {
                                        content.definition
                                    }
                                 </p>
                             </div>
                         </div>
                     </div>
                     :content.type === "imageContentL" ?
                     <div className="Image L my-10">
                        <div className="flex w-[100%] px-5  "><div className="flex-1"></div> <span className='hover:cursor-pointer' onClick={() =>removeContent(inx)}>X</span> </div>
                       
                         <div className="flex flex-wrap lg:flex-nowrap  w-[100%] justify-center ">
                             <div className="image w-[97%] mx-auto lg:w-[36%]   h-[450px] lg:mr-5 ">
                              <img  className='w-[100%] h-[100%] object-contain '  src={content.image} alt="Mavju bo'yicha rasm" />
                             </div>
                             <div className="text w-[97%]  mx-auto lg:w-[36%] lg:ml-5 ">
                                <h1 className='text-xl font-medium '>
                                        {
                                            content.title
                                        }
                                </h1>
                                 <p>
                                    {
                                        content.desc
                                    }
                                 </p>

                             </div>
                         </div>
                     </div>
                     :content.type === "imageContentR" ?
                     <div className="Image L my-10">
                        <div className="flex  w-[100%] px-5  "><div className="flex-1"></div> <span className='hover:cursor-pointer' onClick={() =>removeContent(inx)}>X</span> </div>
                        
                         <div className="flex flex-wrap lg:flex-nowrap  w-[100%] justify-center ">
                             <div className="text w-[97%] lg:mx-auto lg:w-[36%] mb-5 lg:mr-5 ">
                                <h1 className='text-xl font-medium '>
                                        {
                                            content.title
                                        }
                                </h1>
                                 <p>
                                    {
                                        content.desc
                                    }
                                 </p>

                             </div>
                             <div className="image w-[97%] mx-auto lg:w-[36%]   h-[450px] lg:ml-5 ">
                              <img className='w-[100%] h-[100%] object-contain ' src={content.image} alt="Mavju bo'yicha rasm" />
                             </div>
                         </div>
                     </div>
                      : content.type === "link" ? 
                      <div className="link">
                          <div className="link pl-5 ">
                           
                           <a href={`${content.link}`}> <h1 className='text-sky-500 italic'>{content.title}</h1> </a>
                          </div>
                      </div>
                    :
                    <div className="">else</div>
                ))
            }
 
        </div>
        <div className="form.container my-6 ">
            <form action="">
                           
                {
                   
                        newContent.type === "story" ?
                        <div className="story">
                            <label className="block mt-4" htmlFor="">Sarlavha:</label>
                            <input
                            className="block w-[95%] m-auto  outline-none border_bottom "
                            required
                            onChange={(e) =>
                                setNewContent({ ...newContent, title: e.target.value })
                            }
                            value={newContent.title}
                            type="text"
                            placeholder="Sarlavha ... "
                            />

                            <label className="block mt-4 " htmlFor="">Matn kiriting:</label>
                            <textarea
                            className="block w-[95%] h-[166px] m-auto border_bottom"
                            required
                            onChange={(e) =>
                                setNewContent({ ...newContent, desc: e.target.value })
                            }
                            value={newContent.desc}
                            // type="text"
                            placeholder="Ma'lumot ... "
                            /> 

                              <div className="w-[100%] flex  items-center justify-center p-4 ">
                                <div className="no">
                                    <img onClick={()=> setNewContent({})} width="26px" height="26px" className='mx-3 hover:cursor-pointer' src={no} alt="" />
                                </div>
                                <div className="ok"> 
                                    <img onClick={()=> {
                                        allData.content.push(newContent)
                                        setNewContent({})
                                    }} width="30px" height="30px" className='mx-3 hover:cursor-pointer' src={yes} alt="" />
                                </div>
                            </div>
                        </div>

                        : newContent.type === "videoContent" ?
                        <div className="">
                        <div className="videoContent">
                             <label className="block mt-4" htmlFor="">Sarlavha:</label>
                            <input
                            className="block w-[95%] m-auto  outline-none border_bottom "
                            required
                            onChange={(e) =>
                                setNewContent({ ...newContent, title: e.target.value })
                            }
                            value={newContent.title}
                            type="text"
                            placeholder="Mavzu ... "
                            />

                            <label className="block mt-4" htmlFor="">Video linkini kiriting:</label>
                            <input
                            className="block w-[95%] m-auto border_bottom"
                            required
                            onChange={(e) =>
                                setNewContent({ ...newContent, video: e.target.value })
                            }
                            value={newContent.video}
                            type="text"
                            placeholder="https://youtu.be/... "
                            />
                            
                            <label className="block mt-4 " htmlFor="">Matn kiriting:</label>
                            <textarea
                            className="block w-[95%] h-[166px] m-auto border_bottom"
                            required
                            onChange={(e) =>
                                setNewContent({ ...newContent, desc: e.target.value })
                            }
                            value={newContent.desc}
                            // type="text"
                            placeholder="Ma'lumot ... "
                            /> 
                        </div>

                        <div className="w-[100%] flex  items-center justify-center p-4 ">
                                <div className="no">
                                    <img onClick={()=> setNewContent({})} width="26px" height="26px" className='mx-3 hover:cursor-pointer' src={no} alt="" />
                                </div>
                                <div className="ok"> 
                                    <img onClick={()=> {
                                        allData.content.push(newContent)
                                        setNewContent({})
                                    }} width="30px" height="30px" className='mx-3 hover:cursor-pointer' src={yes} alt="" />
                               </div>
                            </div>
                        </div>

                        : newContent.type === "glossary" ?
                        <div className="glossary ">
                            <div className="flex lg:flex-nowrap flex-wrap items-center justify-center w-[100%] ">
                                <div className="glossary lg:w-[20%] w-[70%] bg-slate-50 border-2 border-slate-900 p-2 lg:p-10 ">
                                    <label className="block mt-4" htmlFor="">Glossary:</label>
                                    <input
                                    className="block w-[98%] bg-slate-50 h-[50px] m-auto  outline-none border_bottom "
                                    required
                                    onChange={(e) =>
                                        setNewContent({ ...newContent, word: e.target.value })
                                    }
                                    value={newContent.word}
                                    type="text"
                                    placeholder="So'z ... "
                                    />
                                </div>
                                <div className="flex items-center justify-center w-[100%] lg:w-[7%] ">
                                 <div className="line bg-slate-700 lg:w-[100%] w-2 h-4 lg:h-2  "></div>
                                </div>
                                <div className="desc w-[90%] lg:w-[50%] bg-slate-50 border-2 border-slate-900 p-2 ">
                                    <label className="block mt-4 " htmlFor="">Matn kiriting:</label>
                                    <textarea
                                    className="block w-[95%] h-[166px] bg-slate-50 m-auto border_bottom"
                                    required
                                    onChange={(e) =>
                                        setNewContent({ ...newContent, desc: e.target.value })
                                    }
                                    value={newContent.desc}
                                    // type="text"
                                    placeholder="Ma'lumot ... "
                                    /> 
                                </div>
                            </div>
                            <div className="w-[100%] flex  items-center justify-center p-4 ">
                                <div className="no">
                                    <img onClick={()=> setNewContent({})} width="26px" height="26px" className='mx-3 hover:cursor-pointer' src={no} alt="" />
                                </div>
                                <div className="ok"> 
                                    <img onClick={()=> {
                                        allData.content.push(newContent)
                                        setNewContent({})
                                    }} width="30px" height="30px" className='mx-3 hover:cursor-pointer' src={yes} alt="" />
                               </div>
                            </div>
                        </div>
                        : newContent.type === "dictionary"?
                        <div className="dictionary">
                            <div className="">
                                <div className="words flex lg:flex-nowrap flex-wrap items-center justify-center w-[100%]">
                                    <div className="word lg:w-[25%] w-[70%] bg-slate-50 border-2 border-slate-900 p-2 lg:px-10 lg:py-4 ">
                                        <label className="block mt-4" htmlFor="">So'z:</label>
                                        <input
                                        className="block w-[98%] bg-slate-50 h-[50px] m-auto  outline-none border_bottom "
                                        required
                                        onChange={(e) =>
                                            setNewContent({ ...newContent, word: e.target.value })
                                        }
                                        value={newContent.word}
                                        type="text"
                                        placeholder="Apple ... "
                                        />
                                    </div>

                                    <div className="flex items-center justify-center w-[100%] lg:w-[7%] ">
                                    <div className="line bg-slate-700 lg:w-[100%] w-2 h-4 lg:h-2  "></div>
                                    </div>

                                    <div className="translation lg:w-[25%] w-[70%] bg-slate-50 border-2 border-slate-900 p-2 lg:px-10 lg:py-4 ">
                                        <label className="block mt-4" htmlFor="">Tarjimasi:</label>
                                        <input
                                        className="block w-[98%] bg-slate-50 h-[50px] m-auto  outline-none border_bottom "
                                        required
                                        onChange={(e) =>
                                            setNewContent({ ...newContent, translation: e.target.value })
                                        }
                                        value={newContent.translation}
                                        type="text"
                                        placeholder="Olma ... "
                                        />
                                    </div>
                                </div>
                                <div className="w-[100%] flex justify-center lg:justify-start "> <div className="  bg-slate-700 lg:ml-[25%] lg:h-12 w-2 h-4   "></div></div>
                                <div className="definition w-[95%] lg:w-[57%] mx-auto bg-slate-50 border-2 border-slate-900 p-2">
                                <label className="block mt-4 " htmlFor="">Definition:</label>
                                    <textarea
                                    className="block w-[95%] h-[166px] lg:h-[106px] bg-slate-50 m-auto border_bottom"
                                    required
                                    onChange={(e) =>
                                        setNewContent({ ...newContent, definition: e.target.value })
                                    }
                                    value={newContent.definition}
                                    // type="text"
                                    placeholder="The round fruit of a tree of the rose family, which typically has thin red or green skin and crisp flesh. Many varieties have been developed as dessert or cooking fruit or for making cider... "
                                    />
                                </div>
                            </div>
                            <div className="w-[100%] flex  items-center justify-center p-4 ">
                                <div className="no">
                                    <img onClick={()=> setNewContent({})} width="26px" height="26px" className='mx-3 hover:cursor-pointer' src={no} alt="" />
                                </div>
                                <div className="ok"> 
                                    <img onClick={()=> {
                                        allData.content.push(newContent)
                                        setNewContent({})
                                    }} width="30px" height="30px" className='mx-3 hover:cursor-pointer' src={yes} alt="" />
                               </div>
                            </div>
                        </div>
                        : newContent.type === "link" ? 
                        <div className="link">
                            <div className="title">
                                <label className="block mt-4" htmlFor="">Manzil haqida:</label>
                                    <input
                                    className="block w-[98%] bg-slate-50 h-[44px] m-auto  outline-none border_bottom "
                                    required
                                    onChange={(e) =>
                                        setNewContent({ ...newContent, title: e.target.value })
                                    }
                                    value={newContent.title}
                                    type="text"
                                    placeholder="Link haqida... "
                                    />
                            </div>
                            <div className="link">
                            <label className="block mt-4" htmlFor="">Link:</label>
                                    <input
                                    className="block w-[98%] bg-slate-50 h-[36px] m-auto  outline-none border_bottom "
                                    required
                                    onChange={(e) =>
                                        setNewContent({ ...newContent, link: e.target.value })
                                    }
                                    value={newContent.link}
                                    type="text"
                                    placeholder="Link haqida... "
                                    />
                            </div>
                            <div className="w-[100%] flex  items-center justify-center p-4 ">
                                <div className="no">
                                    <img onClick={()=> setNewContent({})} width="26px" height="26px" className='mx-3 hover:cursor-pointer' src={no} alt="" />
                                </div>
                                <div className="ok"> 
                                    <img onClick={()=> {
                                        allData.content.push(newContent)
                                        setNewContent({})
                                    }} width="30px" height="30px" className='mx-3 hover:cursor-pointer' src={yes} alt="" />
                               </div>
                            </div>
                        </div>
                        :newContent.type === "imageContentL" ?
                        <div className="Image L">
                            <div className="flex flex-wrap lg:flex-nowrap  w-[100%] justify-center ">
                                <div className="image w-[97%] lg:mx-auto lg:w-[36%] mb-5 lg:mr-5 bg-teal-200  h-[450px]  ">
                                  <label className="block mt-[30%] " htmlFor="">Rasm Linki:</label>
                                    <input
                                    className="block w-[98%] bg-teal-100 h-[44px] m-auto  outline-none border_bottom "
                                    required
                                    onChange={(e) =>
                                        setNewContent({ ...newContent, image: e.target.value })
                                    }
                                    value={newContent.image}
                                    type="text"
                                    placeholder="https://... "
                                    />
                                </div>
                                <div className="text w-[97%] lg:mx-auto lg:w-[36%] lg:ml-5 ">
                                <label className="block " htmlFor="">Sarlavha:</label>
                                    <input
                                    className="block w-[98%] bg-slate-50 h-[44px] m-auto  outline-none border_bottom "
                                    required
                                    onChange={(e) =>
                                        setNewContent({ ...newContent, title: e.target.value })
                                    }
                                    value={newContent.title}
                                    type="text"
                                    placeholder="Sarlavha... "
                                    />

                                    <label className="block mt-4 " htmlFor="">Matn:</label>
                                    <textarea
                                    className="block w-[95%] h-[166px] lg:h-[75%] bg-slate-50 m-auto border_bottom"
                                    required
                                    onChange={(e) =>
                                        setNewContent({ ...newContent, desc: e.target.value })
                                    }
                                    value={newContent.desc}
                                    // type="text"
                                    placeholder="Ma'lumotlar... "
                                    />


                                </div>
                            </div>
                            <div className="w-[100%] flex  items-center justify-center p-4 ">
                                <div className="no">
                                    <img onClick={()=> setNewContent({})} width="26px" height="26px" className='mx-3 hover:cursor-pointer' src={no} alt="" />
                                </div>
                                <div className="ok"> 
                                    <img onClick={()=> {
                                        allData.content.push(newContent)
                                        setNewContent({})
                                    }} width="30px" height="30px" className='mx-3 hover:cursor-pointer' src={yes} alt="" />
                               </div>
                            </div>
                        </div>
                        :newContent.type === "imageContentR" ?
                        <div className="ImageR">
                            <div className="flex w-[100%] lg:flex-nowrap flex-wrap justify-center ">
                                
                                <div className="text w-[97%] lg:mx-auto lg:w-[36%] lg:mr-5 mb-5 ">
                                <label className="block " htmlFor="">Sarlavha:</label>
                                    <input
                                    className="block w-[98%] bg-slate-50 h-[44px] m-auto  outline-none border_bottom "
                                    required
                                    onChange={(e) =>
                                        setNewContent({ ...newContent, title: e.target.value })
                                    }
                                    value={newContent.title}
                                    type="text"
                                    placeholder="Sarlavha... "
                                    />

                                    <label className="block mt-4 " htmlFor="">Matn:</label>
                                    <textarea
                                    className="block w-[95%] h-[166px] lg:h-[75%] bg-slate-50 m-auto border_bottom"
                                    required
                                    onChange={(e) =>
                                        setNewContent({ ...newContent, desc: e.target.value })
                                    }
                                    value={newContent.desc}
                                    // type="text"
                                    placeholder="Ma'lumotlar... "
                                    />


                                </div>

                                <div className="image w-[97%] lg:mx-auto lg:w-[36%] bg-teal-200  h-[450px] lg:ml-5 ">
                                  <label className="block mt-[30%] " htmlFor="">Rasm Linki:</label>
                                    <input
                                    className="block w-[98%] bg-teal-100 h-[44px] m-auto  outline-none border_bottom "
                                    required
                                    onChange={(e) =>
                                        setNewContent({ ...newContent, image: e.target.value })
                                    }
                                    value={newContent.image}
                                    type="text"
                                    placeholder="https://... "
                                    />
                                </div>

                            </div>
                            <div className="w-[100%] flex  items-center justify-center p-4 ">
                                <div className="no">
                                    <img onClick={()=> setNewContent({})} width="26px" height="26px" className='mx-3 hover:cursor-pointer' src={no} alt="" />
                                </div>
                                <div className="ok"> 
                                    <img onClick={()=> {
                                        allData.content.push(newContent)
                                        setNewContent({})
                                    }} width="30px" height="30px" className='mx-3 hover:cursor-pointer' src={yes} alt="" />
                               </div>
                            </div>
                        </div>
                        :
                        <div className=""></div>
                    
                }
            
                

            

            
          

            </form>
        </div>

       
       
        <div className="addTasks my-24">
            <div className="task  w-[100%] ">
                {
                    allData.task.length ?
                    <div className=" lg:w-[65%] w-[95%] mx-auto min-h-[150px]  bg-white pl-5 py-2 border-none rounded-[55px] rounded-tr-sm ">
                       <div className=" w-[100%] ">
                       {
                            allData.task.map((task,inx) => (
                                <div key={inx} className=" bg-slate-900 w-[100%] flex text-white py-1 pl-5 overflow-x-hidden border-none rounded-xl lg:mx-5 my-2 ">
                                    <h1 className='text-xl w-[95%] ' > {inx + 1}. <span className='font-medium  '>{task.task}</span> </h1>
                                    <div className="flex w-[5%] items-center  justify-center ">
                                        <MdOutlineClose onClick={()=> removeTask(inx)} className='text-white hover:cursor-pointer  ' />
                                    </div>
                                </div>
                            ))
                        }
                       </div>
                    </div>
                    :
                    <div className=" w-[100%] ">
                        {
                            allData.content.length ?
                            <h1  onClick={()=>{
                                setNewContent({task:true,taskValue:""})
                            }} className='text-xl text-center hover:cursor-pointer '>Mavzuni o'zlashtirish uchun topshiriqlar qo'shing qo'shing </h1> 
                            :
                            ""
                        }
                    </div>
                }
            </div>
            <div className="addTaskForm">
                {
                    newContent.task?
                    <div className="w-[100%] ">
                        <div className="w-[60%] mx-auto px-10 py-4 pr-7 bg-sky-600 border-none rounded-full  flex items-center justify-center ">
                          <div className="flex items-center w-[100%] ">
                          <span > </span>
                            <input
                            className="block w-[95%] placeholder:text-slate-200  text-white  mx-1 bg-sky-600 outline-none border_bottom "
                            required
                            onChange={(e) =>
                                setNewContent({ ...newContent, taskValue: e.target.value })
                            }
                            value={newContent.taskValue}
                            type="text"
                            placeholder="Topshiriq... "
                            />
                            <div className="">
                                <RiSendPlaneFill onClick={() => {
                                    allData.task.push({task:newContent.taskValue,state:false})
                                    setNewContent({task:true,taskValue:""})
                                }}  className='text-2xl ml-7 hover:cursor-pointer  text-white'/>
                            </div>
                          </div>
                        </div>

                        <div className="w-[100%] flex  items-center justify-center p-4 ">
                                <div className="no">
                                    <img onClick={()=> setNewContent({})} width="26px" height="26px" className='mx-3 hover:cursor-pointer' src={no} alt="" />
                                </div>
                        </div>

                    </div>
                    :
                    <div className=""></div>
                }
            </div>
        </div>


        <div className="addTags my-24">
            <div className="tags  w-[100%] ">
                {
                    allData.tag.length ?
                    <div className=" lg:w-[70%] w-[95%] mx-auto  bg-orange-300 px-5 py-3 border-none rounded-[55px] rounded-tr-sm ">
                      <div className="flex"><div className="flex-1"></div> <FaSearch className=' text-2xl  '/> </div>
                       <div className=" flex flex-wrap justify-around">
                       {
                            allData.tag.map((tag,inx) => (
                                <div className=" bg-white flex py-1 pl-5 pr-2 border-none rounded-full mx-5 my-2 ">
                                    <h1 className='text-xl  ' > # <span className='font-medium break-all '>{tag}</span> </h1>
                                    <div className="flex pl-3 items-center  justify-center ">
                                        <MdOutlineClose onClick={()=> removeTag(inx)} className=' text-lg hover:cursor-pointer  ' />
                                    </div>
                                </div>
                            ))
                        }
                       </div>
                    </div>
                    :
                    <div className=" w-[100%] ">
                        {
                            allData.content.length ?
                            <h1 onClick={()=> {
                                setNewContent({tag:true,tagValue:""})
                            }} className='text-xl text-center hover:cursor-pointer '>Mavzuni qidirib topish uchun Taglar qo'shing </h1> 
                            :
                            ""
                        }
                    </div>
                }
            </div>
            <div className="addTagForm">
                {
                    newContent.tag?
                    <div className="w-[100%] ">
                         <label className="block mt-4" htmlFor="">Tag:</label>
                        <div className="w-[60%] mx-auto px-10 py-4 pr-7 bg-amber-200 border-none rounded-full  flex items-center justify-center ">
                          <div className="flex items-center w-[100%] ">
                          <span >#</span>
                            <input
                            className="block w-[95%] placeholder:text-slate-200  mx-1 bg-amber-200 outline-none border_bottom "
                            required
                            onChange={(e) =>
                                setNewContent({ ...newContent, tagValue: e.target.value })
                            }
                            value={newContent.tagValue}
                            type="text"
                            placeholder="tag ... "
                            />
                            <div className="">
                                <RiSendPlaneFill onClick={() => {
                                    allData.tag.push(newContent.tagValue)
                                    setNewContent({tag:true,tagValue:""})
                                }}  className='text-2xl ml-7 hover:cursor-pointer  text-green-600'/>
                            </div>
                          </div>
                        </div>
                        <div className="w-[100%] flex  items-center justify-center p-4 ">
                                <div className="no">
                                    <img onClick={()=> setNewContent({})} width="26px" height="26px" className='mx-3 hover:cursor-pointer' src={no} alt="" />
                                </div>
                        </div>
                    </div>
                    :
                    <div className=""></div>
                }
            </div>
        </div>
        

              <br />
              <br />
              <br />
              <br />
           <div className="ContentContainer">
               <div onClick={()=> setModalState(true)}  className={` bg-orange-100 flex items-center hover:cursor-pointer justify-end border-none rounded-full rounded-bl-sm  ${ !newContent.type && !allData.content.length && !newContent.tag && !newContent.task && !allData.task.length && !allData.tag.length ? "  w-[80px] h-[70px] lg:ml-[90%] md:ml-[85%] ml-[70%] " : " w-[80px] md:ml-[85%] h-[70px] ml-[70%] lg:ml-[90%] "} `}>
                <img className='w-[90%] h-[90%] object-contain '  src={plus} alt="" />
               </div>


               <div className={`transition_3 border-2 border-slate-800 rounded-xl w-[100%] h-screen bg-white overflow-y-auto fixed left-0 ${modalState ? " top-5  " : " top-[100vh] "} `}>
                <div className="flex w-[100%] px-4 ">
                    <div className="flex-1"></div>
                    <div className="p-2 border-2 border-slate-900 rounded-md m-1">
                        <img onClick={()=> setModalState(false)} className='w-[25px] h-[25px] ' src={exit} alt="" />
                    </div>
                </div>
               <div className=" flex flex-wrap mb-20">
                <h1 className='text-lg w-[100%]  ml-4 mb-2 '>Contents:</h1>
                   {
                        contentTypes.map((content,inx) => (
                            <div className={` transition_3 bg-amber-200 border-none rounded-md  p-2 hover:cursor-pointer hover:bg-orange-300 w-[95%]  lg:w-[45%] my-5 mx-auto `} key={inx} onClick={()=> {
                                if(newContent.type){
                                    allData.content.push(newContent)
                                    setNewContent(content)
                                    setModalState(false)
                                }
                                setNewContent(content)
                                setModalState(false)
                                }} >
                               {
                                
                                    content.type === "story" ?
                                    <div key={inx} className=" w-[100%] p-2 ">
                                        <div className="heading bg-white">
                                            <h1 className='text-center text-xl font-medium'>Sarlavha</h1>
                                        </div>
                                        <div className="desc bg-white  w-[100%] h-[150px] px-4 mt-5 ">
                                            <p>Matn..</p>
                                        </div>
                                    </div>
                                    :content.type === "videoContent" ?
                                    <div className="VideoContent w-[100%] ">

                                        <div className="video w-[40%] h-[140px] mx-auto bg-white  flex items-center justify-center py-2 ">
                                            <MdSlowMotionVideo className='text-4xl' />
                                        </div>
                                        <div className="heading mt-1 bg-white w-[30%] ">
                                            <h1 className='px-5 text-xl font-medium'>Sarlavha</h1>
                                        </div>
                                        <div className="desc bg-white w-[95%] h-[100px] my-4 ">
                                            <p>Matn...</p>
                                        </div>
                                    </div>
                                    : content.type === "glossary" ?
                                    <div className="glossary my-7 ">
                                        <div className="flex lg:flex-nowrap flex-wrap items-center justify-center w-[100%] ">
                                            <div className="glossary lg:w-[20%] w-[70%] bg-slate-50 border-2 border-slate-900 p-2 lg:p-6 ">
                                                <h1 className='text-xl font-medium '>
                                                    So'z
                                                </h1>
                                            </div>
                                            <div className="flex items-center justify-center w-[100%] lg:w-[7%] ">
                                             <div className="line bg-slate-700 lg:w-[100%] w-2 h-4 lg:h-2  "></div>
                                            </div>
                                            <div className="desc w-[90%] lg:w-[50%] bg-slate-50 border-2 border-slate-900 p-2 flex items-center lg:min-h-[150px] ">
                                                <p className='text-center' >
                                                    So'zning lug'aviy ma'nosi
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                     : content.type === "dictionary"?
                                     <div className="dictionary">
                                        <div className="flex w-[100%] px-5  "><div className="flex-1"></div> <span className='hover:cursor-pointer' onClick={() =>removeContent(inx)}>X</span> </div>
                
                                         <div className="">
                                             <div className="words flex lg:flex-nowrap flex-wrap items-center justify-center w-[100%]">
                                                 <div className="word lg:w-[25%] w-[70%] bg-slate-50 border-2 border-slate-900 p-2 lg:px-5 lg:py-1 ">
                                                    <h1 className='text-xl font-medium '>
                                                       So'z
                                                    </h1>
                                                 </div>
                
                                                 <div className="flex items-center justify-center w-[100%] lg:w-[7%] ">
                                                 <div className="line bg-slate-700 lg:w-[100%] w-2 h-4 lg:h-2  "></div>
                                                 </div>
                
                                                 <div className="translation lg:w-[25%] w-[70%] bg-slate-50 border-2 border-slate-900 p-2 lg:px-5 lg:py-1 ">
                                                    <h1 className='text-xl font-medium '>
                                                        Tarjima
                                                    </h1>
                                                 </div>
                                             </div>
                                             <div className="w-[100%] flex justify-center lg:justify-start "> <div className="  bg-slate-700 lg:ml-[25%] lg:h-12 w-2 h-4   "></div></div>
                                             <div className="definition w-[95%] lg:w-[57%] h-[65px] mx-auto bg-slate-50 border-2 border-slate-900 p-2">
                                                 <p>
                                                    Definition
                                                 </p>
                                             </div>
                                         </div>
                                     </div>
                                     :content.type === "imageContentL" ?
                                     <div className="Image L my-10">
                                       
                                         <div className="flex flex-wrap lg:flex-nowrap  w-[100%] justify-center ">
                                             <div className="image w-[97%] bg-slate-50 mx-auto lg:w-[45%]  flex items-center justify-center  h-[350px] lg:mr-5 ">
                                             <BsImageFill  className='text-[50px]'/>
                                             </div>
                                             <div className="text w-[97%]  mx-auto lg:w-[36%] lg:ml-5 ">
                                                <h1 className='text-xl bg-white px-1 font-medium '>
                                                       Sarlavha
                                                </h1>
                                                 <p className='bg-white h-[60%] my-2' >
                                                    Matn...
                                                 </p>
                
                                             </div>
                                         </div>
                                     </div>
                                     :content.type === "imageContentR" ?
                                     <div className="Image L my-10">
                                        <div className="flex flex-wrap lg:flex-nowrap  w-[100%] justify-center ">
                                             
                                             <div className="text w-[97%]  mx-auto lg:w-[36%] lg:ml-5 ">
                                                <h1 className='text-xl bg-white px-1 font-medium '>
                                                       Sarlavha
                                                </h1>
                                                 <p className='bg-white h-[60%] my-2' >
                                                    Matn...
                                                 </p>
                
                                             </div>
                                             <div className="image w-[97%] bg-slate-50 mx-auto lg:w-[45%]  flex items-center justify-center  h-[350px] lg:mr-5 ">
                                             <BsImageFill  className='text-[50px]'/>
                                             </div>
                                         </div>
                                     </div>
                                      : content.type === "link" ? 
                                      <div className="link    p-3  ">
                                          <div className="link pl-5 ">
                                           <h1 className='text-xl bg-white px-1  '>
                                              Link nomi
                                           </h1>
                                           <p className='text-lg my-3 opacity-70 bg-white px-1  '>
                                              https://www.google.com/
                                           </p>
                                          </div>
                                      </div>
                                    :
                                    <div className="">else</div>
                                
                               }
                            </div>
                        ))
                    }

                
                
                <h1 className='text-lg w-[100%] mt-10 ml-4 mb-2 '>Mavzuni o'zlashtirish uchun Topshiriq qo'shing:</h1>
                    <div className="w-[100%] px-14 ">
                            <div onClick={()=> {
                                setNewContent({task:true,taskValue:""})
                                setModalState(false)
                            }} className="flex border-none rounded-md items-center justify-center w-[98%] lg:w-[450px] py-3 px-6 bg-sky-500 hover:bg-cyan-600 hover:cursor-pointer ">
                                <div className=" bg-white px-3 py-1 w-[70%] "><span></span>task</div>
                                <div className="send"> <img className='ml-7 w-[25px] h-[25px] ' src={send} alt="Send icon" /></div>
                            </div>
                    </div>

               <h1 className='text-lg w-[100%] mt-10 ml-4 mb-2 '>Mavzuni qidirish uchun Tag qo'shish:</h1>
                    <div className="w-[100%] px-14 ">
                            <div onClick={()=> {
                                setNewContent({tag:true,tagValue:""})
                                setModalState(false)
                            }} className="flex border-none rounded-md items-center justify-center  w-[98%] lg:w-[450px] py-3 lg:px-6 bg-amber-200 hover:bg-orange-300 hover:cursor-pointer ">
                                <div className=" bg-white px-3 py-1 w-[70%] "><span>#</span>Tag</div>
                                <div className="send"> <img className='ml-7 w-[25px] h-[25px] ' src={send} alt="Send icon" /></div>
                            </div>
                    </div>

               </div>
               </div>
            </div>
      
            <div className={`w-[100%] my-10 mb-36  ${  !allData.content.length || !allData.task.length || !allData.tag.length || !allData.theme ? " h-0 overflow-hidden " : " h-[50px]  "}`}>
                <div className="w-[100%] flex items-center justify-center">
                    
                    <button  className="student_form_btn" disabled={createLoading} onClick={()=> {
                        submitTheme()
                    }}>
                    {createLoading && (
                        <Loader
                        config={{ size: 24, color: "#fff", display: "inline-block" }}
                        />
                    )}{" "}
                    <span className="text-zinc-900">{createLoading ? "" : "Saqlash"}</span>
                    </button>
                </div>
            </div>
        <br />
        <br />
        <br />
        <ToastContainer />
    </div>
  )
}

export default AddTheme