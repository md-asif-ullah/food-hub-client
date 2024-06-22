import aboutThum from "@/assets/images/aboutImg/about-thumb-5129ac84.png";
import { FaCodeBranch } from "react-icons/fa6";
import { IoIosPeople } from "react-icons/io";

function AboutHeroSection() {
  return (
    <div className=" lg:grid grid-cols-2 lg:gap-5">
      <img className="w-full" src={aboutThum} alt="" />
      <div className="mt-10 lg:mt-0">
        <h1 className="text-2xl md:text-5xl font-semibold">
          Our Story of food Culinary Excellence at ReservQ
        </h1>
        <div className="mt-5 ">
          <p>
            There are many variations of passages of Lorem Ipsum available, but
            the to a majority have suffered alteration in some form, by injected
            humour, or find randomised words which don't look even slightly
            believable.
          </p>

          <div className="mt-3">
            Over 20 years’ experience providing top quality house Booking rant
            and sell for your Amazing Dream & Make you Happy
          </div>
        </div>
        <div className="sm:flex justify-between">
          <div className="mt-10 ">
            <div>
              <div className="bg-[#f58220] w-16 border border-white py-1.5 rounded-full flex items-center justify-center ">
                <IoIosPeople className="text-5xl text-white " />
              </div>
              <h1 className="text-2xl font-semibold mt-5">90k+ Customers</h1>
              <p className="text-xl">Believe in our service & Care</p>
            </div>
          </div>
          <div className=" mt-10">
            <div className="bg-[#f58220] w-16 border border-white py-[15px] rounded-full flex items-center justify-center">
              <FaCodeBranch className="text-3xl text-white " />
            </div>
            <h1 className="text-2xl font-semibold mt-5">100+ Branch</h1>
            <p className="text-xl">Food ready for occupancy</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutHeroSection;
