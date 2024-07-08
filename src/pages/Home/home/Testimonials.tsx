import testimonials from "@/assets/images/HomeImg/Testimonials.jpeg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import Banner from "@/components/Banner";
import Rating from "@/components/Rating";
import { useGetReviewsQuery } from "@/redux/services/ReviwesService";
import LoadingAnimation from "@/components/LoadingAnimation";

function Testimonials() {
  const { data, isLoading, isError } = useGetReviewsQuery();

  return (
    <div className="bg-white dark:bg-[#020617] px-5 h-full pb-10 pt-20 lg:grid lg:grid-cols-2 lg:px-10 xl:px-20 ">
      <div className="px-5">
        <img className="lg:w-[456px]" src={testimonials} alt="" />
      </div>
      <div className=" mt-10">
        <Banner header="Testimonials" title="What They Say About Us." />
        {isLoading && <LoadingAnimation />}
        {isError && <p>'somthing is went worn , please try again'</p>}
        <div>
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            className="mySwiper mt-10"
          >
            {data?.payload?.map((review) => (
              <SwiperSlide key={review._id}>
                <div className="inline-grid mx-5 lg:mx-20 md:mx-28">
                  <div className="inline-flex">
                    <img
                      className="w-[48px] rounded-full"
                      src={review.image}
                      alt=""
                    />
                    <div className="ml-3">
                      <h2 className="text-white">{review.name}</h2>
                      <Rating rating={review.rating} />
                    </div>
                  </div>
                  <p className="text-[#475569] mt-5">{review.comment}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
