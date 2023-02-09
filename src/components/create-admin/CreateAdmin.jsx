import React, { useState, useEffect } from "react";
import s from "./CreateAdmin.module.css";
import axios from "../../api/axios";
import { auth } from "../../auth/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../components/loader/Loader";
import { BsFillTrashFill } from "react-icons/bs";
import useFetch from "../../hooks/useFetch";

function CreateAdmin() {
  document.title = "Admin qo'shish"
  const [adminState, setAdminState] = useState({
    name: "",
    username: "",
    password: "",
    image: "",
  });
  const [createLoading, setCreateLoading] = useState(false);
  const { data } = useFetch("/sign-in", createLoading, true);

  const createAdmin = (e) => {
    e.preventDefault();
    setCreateLoading(true);
    axios
      .post("/sign-up", adminState, auth())
      .then(({ data }) => {
        if (data.state) {
          setAdminState({
            name: "",
            username: "",
            password: "",
            image: "",
          });
          toast.success(data.msg, {
            position: "top-right",
            autoClose: 5000,
          });
        } else {
          toast.error(data.msg, {
            position: "top-right",
            autoClose: 10000,
          });
        }
        setCreateLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setCreateLoading(false);
      });
  };

  const deleteAdmin = (id) => {
    if (window.confirm("Ishinchingiz komilmi?")) {
      setCreateLoading(true);
      axios
        .delete(`/sign-in/${id}`, auth())
        .then((res) => {
          setCreateLoading(false);
          toast.success("Admin is deleted", {
            position: "top-right",
            autoClose: 5000,
          });
        })
        .catch((err) => setCreateLoading(false));
    }
  };
  return (
    <div className={s.create_admin}>
      <h1>Adminlarni boshqarish</h1>
      <div className={s.create_container}>
        <div className={s.create_left}>
          <h2>Admin yaratish</h2>
          <form className={s.form_control} onSubmit={createAdmin} action="">
            <label htmlFor="">Ismi:</label>
            <input
              required
              onChange={(e) =>
                setAdminState({ ...adminState, name: e.target.value })
              }
              value={adminState.name}
              type="text"
              placeholder="Ismi..."
            />
            <label htmlFor="">Username:</label>
            <input
              required
              onChange={(e) =>
                setAdminState({ ...adminState, username: e.target.value })
              }
              value={adminState.username}
              type="text"
              placeholder="Username..."
            />
            <label htmlFor="">Parol:</label>
            <input
              required
              onChange={(e) =>
                setAdminState({ ...adminState, password: e.target.value })
              }
              value={adminState.password}
              type="password"
              placeholder="Parol..."
            />

            <label htmlFor="">Image:</label>
            <input
              required
              onChange={(e) =>
                setAdminState({ ...adminState, image: e.target.value })
              }
              value={adminState.image}
              type="text"
              placeholder="Image..."
            />


            <button disabled={createLoading} type="submit">
              {createLoading && (
                <Loader
                  config={{ size: 24, color: "#fff", display: "inline-block" }}
                />
              )}{" "}
              <span className=" text-zinc-900">{createLoading ? "" : "Create Admin"}</span>
            </button>
          </form>
        </div>

        <div className={s.create_right}>
          <h2 style={{marginLeft: "10px"}}>Admin o'chirish</h2>
          <div className={s.create_deleteContainer}>
            {data.admins?.map(({ name, username, image , _id }, inx) => (
              <div key={inx} className={s.create_deleteItem}>
                {/* <p className={s.create_circle}>Z</p> */}
                <div className={s.admin_image}>
                  <img src={image} alt="" />
                </div>
                <div className={s.create_title}>
                  <p>{name}</p>
                  <span>{username}</span>
                </div>
                <button
                  onClick={() => deleteAdmin(_id)}
                  className={s.create_btn}
                >
                  <BsFillTrashFill /> <span>O'chirish</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
export default CreateAdmin;
