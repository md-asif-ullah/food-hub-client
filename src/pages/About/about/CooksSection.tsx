import cooksImg1 from "@/assets/images/aboutImg/1.png";
import cooksImg2 from "@/assets/images/aboutImg/2.png";
import cooksImg3 from "@/assets/images/aboutImg/3.png";
import cooksImg4 from "@/assets/images/aboutImg/4.png";

function CooksSection() {
  return (
    <div className="mt-20">
      <h1 className="text-2xl md:text-5xl font-semibold">
        interior They will cook for you
      </h1>
      <p className="mt-10 max-w-80">
        Consectetur numquam poro nemo veniam eligendi rem adipisci quo modi.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 mt-6 md:mt-14 ">
        <div className="bg-white dark:bg-[#020817] shadow-lg p-4 rounded-lg text-center">
          <img
            src={cooksImg1}
            alt=""
            className="w-32 md:w-44 md:h-56 lg:w-48 lg:h-60 h-40 rounded-full object-cover mx-auto mb-4"
          />
          <h3 className="text-xl font-semibold mb-2">Paul Trueman</h3>
          <p className="text-gray-600">Chef</p>
        </div>
        <div className="bg-white dark:bg-[#020817] shadow-lg p-4 rounded-lg text-center">
          <img
            src={cooksImg2}
            alt=""
            className="w-32 md:w-44 md:h-56 lg:w-48 lg:h-60 h-40 rounded-full object-cover mx-auto mb-4"
          />
          <h3 className="text-xl font-semibold mb-2">Emma Newman</h3>
          <p className="text-gray-600">Pastry Chef</p>
        </div>
        <div className="bg-white dark:bg-[#020817] shadow-lg p-4 rounded-lg text-center">
          <img
            src={cooksImg3}
            alt=""
            className="w-32 md:w-44 md:h-56 lg:w-48 lg:h-60 h-40 rounded-full object-cover mx-auto mb-4"
          />
          <h3 className="text-xl font-semibold mb-2">John Doe</h3>
          <p className="text-gray-600">Grill Chef</p>
        </div>
        <div className="bg-white dark:bg-[#020817] shadow-lg p-4 rounded-lg text-center">
          <img
            src={cooksImg4}
            alt=""
            className="w-32 md:w-44 md:h-56 lg:w-48 lg:h-60 h-40 rounded-full object-cover mx-auto mb-4"
          />
          <h3 className="text-xl font-semibold mb-2">Ed Freeman</h3>
          <p className="text-gray-600">Chef</p>
        </div>
      </div>
    </div>
  );
}

export default CooksSection;
