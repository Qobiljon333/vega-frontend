import React from 'react'
import AddTheme from '../single-pages/teachers-single-page/AddTheme'
import Img1 from "../../assets/10 Websites All College Students Should Bookmark.jpg"
import Img2 from "../../assets/361.jpg"
import Img3 from "../../assets/Four PNG Transparent, Four Creative Company, Vector Png, Entrepreneurship, Entrepreneurial Team PNG Image For Free Download.jpg"
import Img4 from "../../assets/20944400.jpg"
import Img5 from "../../assets/Good team Customizable Cartoon Illustrations _ Bro Style.png"
const Home = () => {
  return (
    <div className='pb-10 '>
          <div className=" bg-[#282A35] w-[100%] border-2 border-[#282A35] ">
            <h1 className='text-4xl text-center text-white my-8' >Assalomu aleykum </h1>
            <h2 className='text-2xl text-white text-center'> <span className='text-orange-400 text-[1.8rem] '>Online Kurslar</span> joylab boriladigan <span className='text-green-400'>W</span>ebsitimizga hush kelibsiz </h2>
            <div className="">
              <h2 className=' text-white text-center my-5 text-[1.85rem] '>Endilikda Biror bir fanni o'rganish uchun biror O'quv markazlariga borishingizni <span className='text-cyan-400 '>keragi yo'q</span>. <br />
              <span className='text-teal-400  '> Bu saytda siz turli xil fanlarga oid Darsliklar,Mavzularni hamda ustozlarni topishingiz mumkin ! </span></h2>
            </div>
          </div>
          <div className=" flex flex-wrap bg-[#282A35]  w-[100%]  ">
            <div className=" w-[100%] lg:w-[50%] imgs  ">
              <img src={Img1} alt="" />
            </div>
            <div className="w-[100%] lg:w-[50%] px-4 ">
              <h1 className='text-4xl text-center text-white mt-1'> <span className=' text-amber-400'>Video darsliklar</span> <br /><br />
              <span className='  '>Rasmli contentlar</span>  <br /> <br />
              <span className='text-green-400'>Glossary</span> / <span className=' text-teal-400'>Kitoblar</span> <br /><br />
                <span className=' text-violet-400 '>Mavzuga doir ma'lumotlarga havolalarni</span> </h1>
              <h1 className='text-xl text-center  text-white my-2 '> <span className=' text-center '>O'zida</span> Jamlagan saytimizda siz O'zingiz hohlagan fanlarni   <span className='text-3xl text-teal-300 text-center '>I</span>stalgan <span className='text-3xl text-teal-300 text-center'>VAQT</span>da va <span className='text-3xl text-teal-300 text-center'>I</span>stalgan <span className='text-3xl text-teal-300  text-center'>JOY</span>da o'rganishingiz   <br /><span className='text-4xl text-center text-amber-400  '> BEPULL </span>   </h1>

            </div>

            <div className="flex flex-wrap bg-[#ffffff] pt-5 lg:flex-row-reverse items-center  w-[100%] ">
                <div className=" w-[100%] flex flex-wrap justify-around lg:w-[50%] imgs  ">
                  <img className=' w-[49%] ' src={Img2} alt="" />
                  <img className=' w-[49%] ' src={Img3} alt="" />
                  <img className=' w-[49%] ' src={Img4} alt="" />
                  <img className=' w-[49%] ' src={Img5} alt="" />
                </div>
                <div className="w-[100%] lg:w-[50%] px-4 ">
                  <h1 className='text-4xl text-center text-white mt-1'>
                    <span className=' text-violet-900 text-center '>Do'stlar toping !</span> </h1>
                  <h1 className='text-xl lg:text-2xl text-center mt-5 '>
                    <span className='text-3xl'>Mavzudagi topshiriqlarni bajaring va hamma topshiriqlarni belgilab mavzuni o'rganilganlar qatoriga qo'shing. O'zlashtirish darajangizni hamma ko'ra oladi. </span>
                    
                    Siz o'rganayotgan fanlarni o'rganayotgan O'quvchilar orasidan Do'stlar toping, Ular bilan aloqaga kirishing va bir guruh bo'lib birgalikda Mavzularni o'rganing va topshiriqlarni bajaring.
                    Fikr almashing va  o'rganish tezligingizni oshiring.
                  </h1>
                </div>
            </div>
          </div>
    </div>
  )
}

export default Home