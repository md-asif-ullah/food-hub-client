import heroImg from "@/assets/images/HomeImg/hero-F0BUvwZq.png";
import avatar1 from "@/assets/images/HomeImg/avatar.jpg";
import avatar2 from "@/assets/images/HomeImg/avatar1-lkSFncXM.png";
import avatar3 from "@/assets/images/HomeImg/avatar2-e3ZdIYj6.png";
import { IoIosStar } from "react-icons/io";
import { MdOutlineSlowMotionVideo } from "react-icons/md";

function Hero() {
  return (
    <div className="h-full bg-gradient-to-r from-white dark:from-[#030617] to-[#fce8dd] dark:to-[#261215]  lg:grid lg:grid-cols-2  xl:px-24 lg:px-10 pb-10">
      <div className="text-center lg:text-start space-y-7 pt-10 lg:pt-20">
        <p className="text-[#e1781f] bg-[#fce8dd] dark:bg-[#352018] rounded-full w-32 p-2 mx-auto lg:mx-0">
          #Special Food
        </p>
        <h2 className="text-black dark:text-white mx-14 md:mx-10 lg:mx-0 font-bold text-3xl md:text-5xl lg:pr-20 ">
          We Offer Delicious <span className="text-[#e1781f]">Food </span>
          Circle and Quick Service
        </h2>
        <p className="text-gray-500 text-lg mx-7 md:mx-40 lg:mx-0 lg:pr-10">
          Imagine you don’t need a diet because we provide healthy and delicious
          food for you!
        </p>
        <div className="inline-grid md:inline-flex gap-4 mt-7">
          <button className="text-white bg-[#e1781f] py-3 px-8 rounded-full font-bold">
            Order Now
          </button>
          <button className="inline-flex ">
            <MdOutlineSlowMotionVideo className="text-6xl text-[#f9cb15]" />
            <span className="text-xl ml-2 text-[#e1781f] mt-4">
              How to Order
            </span>
          </button>
        </div>
        <div>
          <div className="flex justify-center lg:justify-start mt-10 relative">
            <img
              className=" w-14 h-14 rounded-full  mr-20 lg:mr-0"
              src={avatar1}
              alt=""
            />
            <img
              className="w-14 rounded-full absolute lg:ml-10"
              src={avatar2}
              alt=""
            />
            <img
              className="w-14 rounded-full absolute  ml-20 lg:ml-20"
              src={avatar3}
              alt=""
            />
          </div>
          <div className="mt-5">
            <p className="dark:text-white text-black">Our Happy Customers</p>
            <div className="flex justify-center lg:justify-start">
              <i className=" text-[#facc15] mt-1 mr-1">
                <IoIosStar className="" />
              </i>
              <p className="text-black dark:text-white">
                4.7
                <span className="text-[#444f63]">(13.7k Reviews)</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-20 lg:mt-32">
        <img className="lg:w-[497px]" src={heroImg} alt="" />
      </div>
    </div>
  );
}

export default Hero;
