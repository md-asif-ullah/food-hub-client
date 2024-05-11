import aboutUsImg from "../../../assets/images/HomeImg/about-us-gtbFqDcB.png";
import Banner from "@/components/Banner";
import Card from "@/components/Card";
import cardimg1 from "../../../assets/images/HomeImg/download (1).png";
import cardimg2 from "../../../assets/images/HomeImg/download.png";
import cardimg3 from "../../../assets/images/HomeImg/vegetables-sYGdJ9FC.png";

function AboutUs() {
  return (
    <div className="h-full mb:pt-20 pt-14 bg-white dark:bg-[#020617] pb-10 space-y-10 lg:space-y-0 px-4 lg:grid lg:grid-cols-2 xl:px-24">
      <div className="">
        <img
          className="bg-[#f7f8f9] dark:bg-[#080c1d] md:w-full"
          src={aboutUsImg}
          alt=""
        />
      </div>
      <div className="lg:ml-10">
        <div className="lg:mr-">
          <Banner
            header="About Us"
            title="Where quality food meet Excellent services."
          />
          <p className="text-[#64748b] mt-5">
            It’s the perfect dining experience where every dish is crafted with
            fresh, high-quality ingredients and served by friendly staff who go.
          </p>
        </div>
        <div className=" mt-14 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-5  md:gap-5">
          <Card
            img={cardimg2}
            header="Fast Foods"
            titel="Healthy Foods are nutrient-Dense Foods"
          />
          <Card
            img={cardimg3}
            header="Healthy Foods"
            titel="Healthy Foods are nutrient-Dense Foods"
          />
          <Card
            img={cardimg1}
            header="Fast Delivery"
            titel="Healthy Foods are nutrient-Dense Foods"
          />
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
