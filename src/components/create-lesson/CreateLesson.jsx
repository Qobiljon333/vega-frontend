// @ts-nocheck
import React, { useState,useEffect } from "react";
import s from "./CreateLesson.module.css"
import { useSelector } from "react-redux";
import InputTypeFileImage from "./innerComponents/image/InputTypeFileImage";
import InputTypeText from "./innerComponents/text/InputTypeText";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import axios from "../../api/axios";
import { auth } from "../../auth/auth";
import Loader from "../../components/loader/Loader";
import { useTranslation } from 'react-i18next'
import { BsFillTrashFill } from "react-icons/bs";



function CreateLesson({lessonsRefresh}) {
  // const { t } = useTranslation()
  document.title = "Darslik yaratish";
  const teacher = useSelector(j => j.teacher)
  const teacher_name = teacher.userName
  const teacher_id = teacher.id
  console.log(teacher_name);
  //  Get all teachers
  const [createLoading, setCreateLoading] = useState(false);
  const [data,setData ] = useState([])
  const [options,setOptions] = useState([])
  
  useEffect(() => {
    axios.get(`/`,)
        .then(res => {
            setData(res.data);
            console.log(res.data);
        })
        .catch(err => {
          console.log("Gett problem")
        })
    axios.get("/subject")
        .then(res => {
          if (res.data.state) {
            setOptions(res.data.data)
          }
        })
        .catch(err => {
          console.log(err);
        })
}, [createLoading])




  const [inputTypeTextData] = useState([
    "title",
    "desc",
    "password",
  ]);
  
  const [allPlaceHolders] = useState({
    title: "Kurs nomi ... ",
    desc: "Kurs haqida malumot ...",
    password:"Paroll...",
    type: "Kurs turi ...",
  });

  // <Barcha Ma'lumotlar shu state da shuni backendga yuboriladi>
  const [allData, setAllData] = useState({
    title: "",
    password:"",
    desc: "",
    type: "",
    urls:[],
  });
  // </Barcha Ma'lumotlar shu state da shuni backendga yuboriladi>

  // console.log(allData);

  const [imgs, setImgs] = useState([]);
  const [multipleFileImages, setMultipleFileImages] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // getSetValue
  const handleChangeInput = (e) => {
    let key = e.target.getAttribute("name");
    let value = e.target.value;
    setAllData({ ...allData, [key]: value });
  };
  // getSetValue

 

  const handleChangeImage = ({ target: { files } }) => {
    const MAX_COUNT_OF_IMAGES = 4;
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
      toast.error("4 tadan ortiq rasm yuklamang", {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    // checking allData before sumbit
    let { state, error } = checkingAllDataBeforeSumbit(allData);
    if (!state) {
      for (let key in error) {
        return toast.error(
          `Iltimos ${allPlaceHolders[key].split(":")[0]} ni to'ldiring `,
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

    // console.log("ok");
    // Axios ni shu yerdan boshlab yoziladi
    setIsLoading(true);
    axios
      .post(`/lesson/create/${teacher_name}`, formData )
      .then(({ data: { data, msg, state } }) => {
        // console.log(data);
        toast.success(msg, {
          position: "top-right",
          autoClose: 7000,
        });
        setAllData({
          title: "",
          password:"",
          desc: "",
          type: "",
          urls:[],
        });
        axios.patch(`/teacher/add-lesson/${teacher_id}`,{lesson:data._id})
        setImgs([]);
        setIsLoading(false);
        setCreateLoading(j => !j);
        lessonsRefresh(j => !j)

      })
      .catch(({ response: { data } }) => {
        setIsLoading(false);
        console.log("error: ", data);
        toast.error(data?.msg, {
          position: "top-right",
          autoClose: 7000,
        });
      });
  };

  return (
    <div className="">
      <div className="">
        <h1 className="text-center text-2xl">Create Lesson</h1>
      </div>
      <div className={s.row} >
        <form onSubmit={handleSubmit}className={s.form}>
          {/* typeTextInput */}
          {inputTypeTextData?.map((key, idx) => (
            <InputTypeText
              key={idx}
              value={allData[key]}
              name={key}
              placeholder={allPlaceHolders[key]}
              handleChange={handleChangeInput}
              // focusOut={focusOut}
            />
          ))}
          {/* typeTextInput */}

            <select onChange={handleChangeInput} value={allData["type"]} name="type" id="">
              <option value="">Tanlang</option>
              {
                options?.map((subject,inx) => (
                  <option key={inx} value={subject.subject}> {subject.subject} </option>
                ))
              }
            </select>
          
          {/* inputTypeFile Images */}
          <div className={s.inputTypeFile}>
            <InputTypeFileImage
              handleChangeImage={handleChangeImage}
              imgs={imgs}
            />
          </div>

          <button disabled={isLoading} type="submit" className={s.btn}>
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
      </div>
      
      <ToastContainer />
    </div>
  );
}

export default CreateLesson;
