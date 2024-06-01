import { IoIosStar } from "react-icons/io";
import { IoStarHalfSharp } from "react-icons/io5";
import { MdOutlineStarOutline } from "react-icons/md";

function Rating({ rating }: { rating: number }) {
  const ratingStar = Array.from({ length: 5 }, (_, index) => {
    const starValue = index + 1;
    return (
      <span key={index}>
        {rating >= starValue ? (
          <IoIosStar className="text-[#facc15]" />
        ) : rating >= starValue - 0.5 ? (
          <IoStarHalfSharp className="text-[#facc15]" />
        ) : (
          <MdOutlineStarOutline className="text-[#facc15]" />
        )}
      </span>
    );
  });
  return <div className="flex mt-3 text-2xl">{ratingStar}</div>;
}

export default Rating;
