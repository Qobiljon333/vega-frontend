export const authTeacher = () => {
    let teacherToken = JSON.parse(localStorage.getItem("persist:Vega"))

    if(teacherToken.teacher){
        return {
            headers:{
                teacherToken : JSON.parse(teacherToken.teacher).teacherToken
            }
        }
    }
}