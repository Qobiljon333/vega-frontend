import { SIGN_IN_TEACHER, SIGN_OUT_TEACHER } from "../action/actionTypes"

const teacher = (state=null, action)=>{
    switch(action.type){
        case SIGN_IN_TEACHER:
            return state = action.payload 
        case SIGN_OUT_TEACHER:
            return state = null
        default:
            return state
    }
}
export default teacher;