// @ts-nocheck
import React, { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import s from "./CreateProduct.module.css";
import InputTypeFileImage from "./innerComponents/image/InputTypeFileImage";
import InputTypeText from "./innerComponents/text/InputTypeText";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import axios from "../../api/axios";
import { auth } from "../../auth/auth";
import Loader from "../../components/loader/Loader";
import { useTranslation } from 'react-i18next'
import { BsFillTrashFill } from "react-icons/bs";

function CreateTeacher() {
  // const { t } = useTranslation()
  document.title = "Teacher yaratish";
  const creator = useSelector(j => j.user)
  const creator_name = creator.username
  // console.log(creator_name);
  //  Get all teachers
  const [createLoading, setCreateLoading] = useState(false);
  const [data,setData ] = useState([])
  const [options,setOptions] = useState([])
  useEffect(() => {
    axios.get(`/teacher/all-teachers`, auth())
        .then(res => {
            setData(res.data);
            // console.log(res.data);
        })
        .catch(err => {
          console.log("Gett problem,",err)
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


/// delete teacher
const deleteTeacher = (id) => {
  if (window.confirm("Ishinchingiz komilmi?")) {
    setCreateLoading(true);
    axios
      .delete(`/teacher/delete/${id}`, auth())
      .then((res) => {
        setCreateLoading(j => !j);
        toast.success("Teacher is deleted", {
          position: "top-right",
          autoClose: 5000,
        });
      })
      .catch((err) => console.log("Delete problem"));
  }
};


  const [inputTypeTextData] = useState([
    "name",
    "username",
    "password",
    "connection",
    "desc",
  ]);
  
  const [inputTypeSelectData] = useState(["type"]);
  const [allPlaceHolders] = useState({
    name: "Ism Familiyasi ...",
    username: "Username...",
    password:"Paroll...",
    connection: "Aloqa vositalari...",
    desc: "O'zingiz haqingizda malumot ...",
    type: "Fan turi ...",
  });

  // <Barcha Ma'lumotlar shu state da shuni backendga yuboriladi>
  const [allData, setAllData] = useState({
    name: "",
    username:"",
    password:"",
    connection:"",
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
    const MAX_COUNT_OF_IMAGES = 5;
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
      toast.error("5 tadan ortiq rasm yuklamang", {
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
        if (key === "size") {
          setTimeout(() => {
            document.querySelector('input[name="size"]').focus();
          }, 500);
        }
        return toast.error(
          `Iltimos ${allPlaceHolders[key].split(":")[0]} ni ${
            key === "size"
              ? "to'g'ri to'ldiring.\nMisol uchun: 39-44"
              : "to'ldiring"
          }`,
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
      .post(`/teacher/sign-up/${creator_name}`, formData, auth())
      .then(({ data: { data, msg, state } }) => {
        // console.log(data);
        toast.success(msg, {
          position: "top-right",
          autoClose: 7000,
        });
        setAllData({
          name: "",
          username:"",
          password:"",
          connection:"",
          desc: "",
          type: "",
          urls:[],
        });
        setImgs([]);
        setIsLoading(false);
        setCreateLoading(j => !j);

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
    <div className={s.container}>
      <div className={s.title}>
        <h1 className="text-center text-2xl">Create Teacher</h1>
      </div>
      <div className={s.row}>
        <form onSubmit={handleSubmit} className={s.form}>
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
          {/* inputTypeFile Images */}

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
      <div className={` ${s.teachers} Teachers w-[95%] `}>
            <h1 className=" text-black text-2xl text-center mb-3 ">Teachers</h1>
            <div className="Teacher_container w-[100%] flex flex-wrap   ">
              {
                data.teachers?.map(({urls, username, name, type, _id, lessons, students},inx) => (
                  <div key={inx} className="teacher lg:w-[24%] ml-[1%] my-4 md:w-[48%] sm:w-[95%] sm:h-[45px] md:h-[65px] lg:h-[68px] box_shadow flex items-center   ">
                    <div className="Teacher_image  w-[55px] h-[55px]  m-3 ">
                      <img className=" w-[100%] h-[100%] object-cover " src={urls[0]} alt="" />
                    </div>
                    <div className="name flex-grow  ">
                      <h1 className="opacity-75">{name}</h1>
                      <h1>{username}</h1>
                    </div>
                    <div className="m-1">
                      <div className="text flex">

                        <h1 className=" text-red-800 text-lg ">{lessons.length}</h1> <p  className="mx-[1px] text-lg ">/</p>
                        <h1 className=" text-green-800 text-lg">{students.length}</h1>
                      </div>
                      <div className="">
                      <button
                        onClick={() => deleteTeacher(_id)}
                        className={s.create_btn}
                      >
                        <BsFillTrashFill className=" text-lg text-red-900 m-2 " />
                      </button>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default CreateTeacher;