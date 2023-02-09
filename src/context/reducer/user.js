import { SIGN_IN_USER, SIGN_OUT_USER } from "../action/actionTypes"

const user = (state=null, action)=>{
    switch(action.type){
        case SIGN_IN_USER:
            return state = action.payload 
        case SIGN_OUT_USER:
            return state = null
        default:
            return state
    }
}
export default user;