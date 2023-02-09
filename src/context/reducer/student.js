import { SIGN_IN_STUDENT,  SIGN_OUT_STUDENT } from "../action/actionTypes"

const student = (state=null, action)=>{
    switch(action.type){
        case SIGN_IN_STUDENT:
            return state = action.payload 
        case SIGN_OUT_STUDENT:
            return state = null
        default:
            return state
    }
}
export default student;