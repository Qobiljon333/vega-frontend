export const authStudent = () => {
    let studentToken = JSON.parse(localStorage.getItem("persist:Vega"))

    if(studentToken.student){
        return {
            headers:{
                studentToken : JSON.parse(studentToken.student).studentToken
            }
        }
    }
}