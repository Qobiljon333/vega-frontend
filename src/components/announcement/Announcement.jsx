import React from 'react'
import emptyA from "../../assets/no-announcements.jpg"
const Announcement = ({announcements,state}) => {
  console.log(announcements);
  // console.log(state);
  return (
    <div className={` w-[100%] ${state === "elonlar"? "h-auto " : "h-0 overflow-hidden"} `}>
      {/* <img src={emptyA} alt="" /> */}
      {
        announcements.length === 0 ?  <div className="empty relative">
          <img className='w-[100%] my-1 ' src={emptyA} alt="Elonlar yo'q ekann" />
          <h1 className='absolute top-[20%] left-[8%] lg:text-[50px] text-white text-xl '>E'lonlar Topilmadi</h1>
        </div> 
        :
        <div className="w-[100%]">
          {
        announcements?.map((announcement,inx) => (
          <div key={inx} className=" my-3">
           
            <div className="time py-[5px] px-7 bg-red-700 inline-block border-none rounded-tr-[500px]  ">
              <h1 className=' text-white text-lg'> {announcement.date} </h1>
            </div>
           <div className="bg-slate-50 py-2">
              <div className="title my-2 mx-2 ">
                  <h1 className='text-xl'> {announcement.title}  </h1>
                </div>
                <div className="desc">
                  <h1>
                    {
                      announcement.desc
                    }
                  </h1>
                  
                </div>
           </div>
          </div>
        ))
      }
        </div>
      }
    
    </div>
  )
}

export default Announcement