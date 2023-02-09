import {SIGN_IN,SIGN_INS, SIGN_OUT, ADD_TO_CART, ADD_TO_HEART, FILTER_SHOW, FILTER_HIDE, SIGN_IN_USER, SIGN_OUT_USER, SIGN_IN_TEACHER, SIGN_OUT_TEACHER, SIGN_IN_STUDENT, SIGN_OUT_STUDENT} from "./actionTypes"

export const sellerSignIn = (payload) => {
    return {
        type:SIGN_INS,
        payload
    }
}


export const signIn = (payload)=>{
    return {
        type: SIGN_IN,
        payload
    }
}

export const signOut = ()=>{
    return {
        type: SIGN_OUT
    }
}


export const signInUser = (payload)=>{
    return {
        type: SIGN_IN_USER,
        payload
    }
}

export const signOutUser = ()=>{
    return {
        type: SIGN_OUT_USER
    }
}

export const signInTeacher = (payload)=>{
    return {
        type: SIGN_IN_TEACHER,
        payload
    }
}

export const signOutTeacher = ()=>{
    return {
        type: SIGN_OUT_TEACHER
    }
}


export const signInStudent = (payload)=>{
    return {
        type: SIGN_IN_STUDENT,
        payload
    }
}

export const signOutStudent = ()=>{
    return {
        type: SIGN_OUT_STUDENT
    }
}



export const removeFromCart = (data)=>{
    return {
        type: ADD_TO_CART,
        payload: data
    }
}

export const removeFromHeart = (data)=>{
    return {
        type: ADD_TO_HEART,
        payload: data
    }
}

export const filterShow = ()=>{
    return {
        type: FILTER_SHOW,
    }
}

export const filterHide = ()=>{
    return {
        type: FILTER_HIDE,
    }
}

