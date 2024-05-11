import appImage from "@/assets/images/HomeImg/mockup-Lbl8JI0l.png";
import Banner from "@/components/Banner";
function AppInfo() {
  return (
    <div className="h-full bg-white dark:bg-[#020617] p-3 pb-10 md:pb-14 md:p-7">
      <div className="bg-[#fef2e8] dark:bg-[#1b1218] p-5 pb-0 rounded-2xl lg:grid lg:grid-cols-2 lg:p-20 lg:pb-0">
        <div className="lg:mt-20 space-y-5">
          <Banner header="Download App" title="Get Started With Us Today!" />
          <p className="dark:text-white text-black ">
            Discover food wherever and whenever and get your food delivered
            quickly.
          </p>
          <button className="bg-[#f58220] px-4 py-4 rounded-full hover:bg-orange-700 duration-300">
            Download Now
          </button>
        </div>
        <div className="mx-10 mt-10">
          <img src={appImage} alt="" />
        </div>
      </div>
    </div>
  );
}

export default AppInfo;
