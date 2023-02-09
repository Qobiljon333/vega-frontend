import { combineReducers } from "redux"
import auth from "./auth"
import cart from "./addToCart"
import heart from "./addToHeart"
import filterShow from "./filterShow"
import user from "./user"
import teacher from "./teacher"
import student from "./student"

const rootReducer = combineReducers({
    auth, cart, heart, filterShow,user,teacher,student
})

export default rootReducer