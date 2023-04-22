import React,{useState,useEffect} from 'react'
import InputTypeFileImage from "./innerComponents/image/InputTypeFileImage";
import axios from "../../api/axios"
import { ToastContainer, toast } from "react-toastify";
import s from "./style.module.css"
import Loader from '../loader/Loader';
import { AiOutlineCheckCircle } from 'react-icons/ai';

const CreateStudentImage = () => {
    const [studentImages,setStudentImages] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        axios.get("/studentimage")
            .then(res => {
                if (res.data.state) {
                    setStudentImages(res.data.data)
                }
            })
            .catch(err => {
                console.log(err);
            })
    },[isLoading])
    const [allData, setAllData] = useState({
        image:[],
      });

      const [imgs, setImgs] = useState([]);
      const [multipleFileImages, setMultipleFileImages] = useState("");
    
      const handleChangeImage = ({ target: { files } }) => {
        const MAX_COUNT_OF_IMAGES = 1;
        if (files.length <= MAX_COUNT_OF_IMAGES) {
          setMultipleFileImages(files);
          setImgs([]);
          Object.values(files).forEach((i) => {
            let source = {
              src: URL.createObjectURL(i),
              name: i.name,
              size: i.size,
              date: i.lastModifiedDate,
            };
            if (imgs.length <= MAX_COUNT_OF_IMAGES) {
              setImgs((e) => [...e, source]);
            }
          });
        } else {
          toast.error("1 tadan ortiq rasm yuklamang", {
            position: "top-right",
            autoClose: 7000,
          });
        }
      };

       // checking allData before sumbit
        const checkingAllDataBeforeSumbit = (data) => {
            let tempArr = Object.entries(data);
            let result = { state: false, error: {} };
            for (let i = 0; i < tempArr.length; i++) {
            let [key, value] = tempArr[i];

            if (key === "size" && !value.match(/\d\d-\d\d/g)) {
                result.state = false;
                result.error = { [key]: value };
                break;
            } else if (value || value === []) {
                result.state = true;
                result.error = {};
            } else {
                result.state = false;
                result.error = { [key]: value };
                break;
            }
            }
            return result;
        };



            

      const submit =(e) => {
          e.preventDefault();
          
           let { state, error } = checkingAllDataBeforeSumbit(allData);
            if (!state) {
            for (let key in error) {
                return toast.error(
                `Iltimos imageni to'ldiring `,
                {
                    position: "top-right",
                    autoClose: 5000,
                }
                );
            }
            }

        let formData = new FormData();
    
        Object.entries(allData).forEach(([key, value]) => {
            formData.append(key, value);
        });
    
        Array.from(multipleFileImages).forEach((i) => {
            formData.append("image", i, i.name);
        });

        // Checking image before submit
        if (!imgs.length) {
            return toast.error("Rasm yuklanmadi", {
            position: "top-right",
            autoClose: 7000,
            });
        }
  

        setIsLoading(true);
         axios.post("/studentImage",formData)
            .then(res => {
                toast.success(res.data.msg, {
                    position: "top-right",
                    autoClose: 7000,
                  });
                console.log(res);
                setAllData({
                    image:[]
                })
                setImgs([])
                setIsLoading(false);

            })
            .catch(err => {
                console.log(err);
            } ) 

      }

  return (
    <div>CreateStudentImage

           <form action="" className='box_shadow_2 py-5 ' onSubmit={submit}>
                <div className={` w-[100%] flex items-center justify-center  ${s.inputTypeFile}`}>
                    <InputTypeFileImage
                    handleChangeImage={handleChangeImage}
                    imgs={imgs}
                    />
                </div>
                <br />
                <button disabled={isLoading} type="submit" className={`mx-auto block ${s.btn}`}>
                    {isLoading ? (
                    <Loader
                        config={{ size: 24, color: "#fff", display: "inline-block" }}
                    />
                    ) : (
                    <>
                        <AiOutlineCheckCircle className={s.btnIcon} />{" "}
                        <span className="text-slate-900">Send</span>
                    </>
                    )}
                </button>
           </form>

           <div className="images w-[98%] lg:w-[85%] my-16 mx-auto flex flex-wrap box_shadow_2  ">
                {
                    studentImages?.map((res,inx) => (
                        <div key={inx} className="img-content w-[200px] h-[220px] ">
                            <img src={res.image} alt="" />
                        </div>
                    ))
                }
           </div>
        <ToastContainer />
    </div>
  )
}

export default CreateStudentImage