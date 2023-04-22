import React,{useState,useEffect} from 'react'
import axios from "../../api/axios"
import { useHistory } from 'react-router-dom'

const Groupmates = ({mainLessons}) => {
  const [data,setData] = useState([])
  // console.log(data);
  const history = useHistory()
  useEffect(()=>{
    
    mainLessons?.forEach(id => {
      axios.get(`/lesson/single-lesson/${id}`)
      .then(lesson => {
          if (lesson.data.state) {
            axios.get(`/student/groupmates/${id}`)
            .then(res => {
              setData(j => [...j,{lesson:lesson.data.data[0],students:res.data.data}])
            })
            .catch(err => {
              console.log(err);
            })
          }
      })
      .catch(err => {
        console.log(err);
      })
        
    });
  },[mainLessons])

  return (
    <div className="w-[100%]">
      <div className="w-[100%] py-4">
        {
          data ? 
          <div className={`w-[100%] transition_3 h-32 overflow-hidden hover:h-auto  relative`}>
            {/* <div className={` absolute top-0 left-0 w-[100%] h-[100%] bg-[#00000098] hover:hidden `}></div> */}
            {
              data.map((element,inx) => (
                <div key={inx} className=" my-5 w-[100%] ">
                  <div className="lesson">
                    <div className="lesson title">
                      <h1>{element.lesson.title}</h1>
                    </div>
                  </div>
                  <div className="students  max-w-[100%] pt-1  flex  overflow-x-auto">
                    {
                      element.students?.map((student,inx)=> (
                        <div key={inx} className="m-2 mt-5  ">
                          <div 
                          onClick={()=>{
                            history.push(`/student-single-page/${student._id}`)
                        }}
                          className="img h-10 w-10 border-none rounded-full overflow-hidden flex items-center justify-center">
                             <img src={student.image} alt="" />
                          </div>
                          <h1 className='text-sm w-10 overflow-hidden'>{student.username}</h1>
                        </div>
                      ))
                    }
                  </div>
                </div>
              ))
            }
          </div>
          :
          <div className="">asd</div>
        }
      </div>
    </div>
  )
}

export default Groupmates