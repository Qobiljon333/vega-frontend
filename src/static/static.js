// import Order from "../components/order/Order";
// import CreateProduct from "../components/create-product/CreateProduct";
// import EditProduct from "../components/edit-product/EditProduct";
// import CreateAdmin from "../components/create-admin/CreateAdmin";
// import {AiOutlineShoppingCart, AiOutlinePlus, AiOutlineEdit, AiOutlineUsergroupAdd} from "react-icons/ai"
import { AiOutlineHeart,AiFillHeart, AiOutlineHome,AiFillHome, AiFillFolderAdd } from "react-icons/ai";
import {BsCart, BsFillCartFill, BsFillPersonPlusFill} from "react-icons/bs"
import CreateLesson from "../components/create-lesson/CreateLesson";
import CreateTeacher from "../components/create-teacher/CreateTeacher";



export const creationData = {
  type:[
    "Web dasturlash",
    "Matematika",
    "Informatika"
  ]
}





export const Admin = [
{ 
  id: 0,
  name:"Teacher akkount yaratish",
  path:"/create-teacher",
  component:<CreateTeacher />,
  icon: <BsFillPersonPlusFill />
}
]

export const teacher = [
{ 
  id: 0,
  name:"Darslik qo'shish",
  path:"/add-lesson",
  component:< CreateLesson />,
  icon: <AiFillFolderAdd />
}
]
