import { Separator } from "@/components/ui/separator";
import moment from "moment";
import { FaPhone, FaFacebookF, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const years = moment().format("YYYY");

  return (
    <footer className="h-full pt-14 pl-2 bg-white dark:bg-[#020617]">
      <div className="md:grid pb-10 xl:px-20">
        <div className="mt-7 md:col-start-2 xl:col-start-1 ">
          <h2 className="text-2xl text-black dark:text-white">About</h2>
          <div className="text-[#667282] dark:text-[#94a3b8] text-sm mt-3 space-y-2">
            <p className="hover_effcet">About Us</p>
            <p className="hover_effcet"> Features</p>
            <p className="hover_effcet">News</p>
            <p className="hover_effcet">Careers</p>
            <p className="hover_effcet">Services</p>
          </div>
        </div>
        <div className="mt-7 md:col-start-4  lg:col-start-5 xl:col-start-4">
          <h2 className="text-2xl text-black dark:text-white">Company</h2>
          <div className="text-[#667282] dark:text-[#94a3b8] mt-3 space-y-2">
            <p className="hover_effcet">Home</p>
            <p className="hover_effcet">Specialities</p>
            <p className="hover_effcet">Consult</p>
          </div>
        </div>
        <div className="mt-4 md:mt-7 md:col-start-7 lg:col-start-7">
          <h2 className="text-2xl text-black dark:text-white">Specialties</h2>
          <div className="text-[#667282] dark:text-[#94a3b8] mt-3 space-y-2">
            <p className="hover_effcet">Neurology</p>
            <p className="hover_effcet">Cardiologist</p>
            <p className="hover_effcet">Dentist</p>
          </div>
        </div>
        <div className="space-y-3 md:mt-7 md:col-start-10 lg:col-start-9 xl:col-start-10">
          <h2 className="text-2xl text-black dark:text-white">Contact Us</h2>
          <div className="text-[#667282] dark:text-[#94a3b8] space-y-2 tracking-tight">
            <p className="hover_effcet">3556 Beech Street, USA</p>
            <p className="hover_effcet">example@mail.com</p>
          </div>

          {/* social contect */}

          <div className="inline-flex text-2xl text-[#667282] dark:text-[#94a3b8] space-x-3">
            <a href="#">
              <FaPhone className="hover_effcet" />
            </a>
            <a href="https://www.facebook.com/DevMdAsif" target="_blank">
              <FaFacebookF className="hover_effcet" />
            </a>
            <a href="https://twitter.com/asifullahdotcom" target="_blank">
              <FaXTwitter className="hover_effcet" />
            </a>
          </div>
        </div>
        <div className="inline-grid mt-4 md:mt-7 md:col-start-1  md:col-end-13 lg:col-start-11 md:ml-10 lg:ml-0 xl:col-start-12 ">
          <h2 className="text-2xl text-black dark:text-white">
            Join Our Newsletter
          </h2>
          <div className="inline-flex mr-3 mt-3">
            <input
              className="h-10 px-2 w-52 focus:outline-none shadow-md"
              type="email"
              name="email"
              placeholder="Enter Email"
            />
            <button className="bg-[#f58220] py-[9px] px-4 text-white rounded-r-lg">
              Submit
            </button>
          </div>
          <p className="text-[#667282] dark:text-[#94a3b8] mt-5 xl:pr-0 lg:w-[300px] xl:w-72">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at
            dignissim nunc, id maximus ex. Etiam nec dignissim elit, at
            dignissim enim.
          </p>
        </div>
      </div>

      <Separator />

      {/* copyright worning */}

      <span className="block md:text-lg text-base text-[#667282] dark:text-[#7889a0] text-center  py-5">
        Copyright © {years} . All Rights Reserved.
      </span>
    </footer>
  );
};

export default Footer;
