export const authStudent = () => {
    let studentToken = JSON.parse(localStorage.getItem("persist:Vega"))

    if(studentToken.teacher){
        return {
            headers:{
                studentToken : JSON.parse(studentToken.student).studentToken
            }
        }
    }
}