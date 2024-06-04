import aboutThum from "@/assets/images/aboutImg/about-thumb-5129ac84.png";
import CustomersImg from "@/assets/images/aboutImg/CustomersImg.png";
import BranchImg from "@/assets/images/aboutImg/BranchImg.png";

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
            <div className="text-center sm:text-start">
              <img className="mx-auto sm:mx-0" src={CustomersImg} alt="" />
              <h1 className="text-2xl font-semibold mt-5">90k+ Customers</h1>
              <p className="text-xl">Believe in our service & Care</p>
            </div>
          </div>
          <div className="text-center sm:text-start mt-10">
            <img className="mx-auto sm:mx-0" src={BranchImg} alt="" />
            <h1 className="text-2xl font-semibold mt-5">100+ Branch</h1>
            <p className="text-xl">Food ready for occupancy</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutHeroSection;
