import React,{useState,useEffect} from 'react'
import axios from "../../api/axios"
import loader from "../../assets/Spinner-1s-200px.svg"
const ChangeImage = ({id, state, setRefresh,setModalState}) => {
    const [images,setImages] = useState([])
    const [isLoading,setIsLoading] = useState(false)
    useEffect(()=> {
        axios.get("/studentImage")
            .then(res => {
                if (res.data.state) {
                    setImages(res.data.data)
                }
            })
            .catch(err => {
                console.log(err);
            })
    },[])
    const changeImage = (image) => {
        setIsLoading(true)
        axios.patch(`/student/change-image/${id}`,{newImage:image})
            .then(res => {
                // console.log(res);
                if(res.data.state){
                    setRefresh(j => !j)
                    setModalState(false)
                    setIsLoading(false)
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
  return (
    
    <div className={` w-[100%]  ${state === "changeImage" ? "h-[100%] overflow-y-auto pb-10 " : "h-0 overflow-hidden"}`}>
        <div className={` flex items-center justify-center ${isLoading ? "h-[100%]" :"h-0 overflow-hidden"} `}>
            <img src={loader} alt="" />
        </div>
        <div className={`images flex flex-wrap justify-around ${isLoading ? "h-0 overflow-hidden":"h-auto"}`}>
            {
                
                images?.map((data,inx) => (
                    <div onClick={()=> {
                        changeImage(data.image)
                    }} key={inx} className="img-content my-2 w-[150px] h-[150px] border-none rounded-full overflow-hidden  ">
                        <img  className='w-[100%] h-[100%] object-cover ' src={data.image} alt="" />
                    </div>
                ))
            }
        </div>
        
    </div>
  )
}

export default ChangeImage