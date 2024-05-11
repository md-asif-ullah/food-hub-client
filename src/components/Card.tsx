type CardProps = {
  header: string;
  titel: string;
  img: string;
};

function Card({ header, titel, img }: CardProps) {
  return (
    <div className="border dark:hover:border-orange-500 hover:border-orange-500 dark:border-stone-800 border-white  duration-300 bg-white dark:bg-[#020617] rounded-lg p-7 space-y-6 shadow-xl ">
      <div>
        <img src={img} alt="" />
        <h3 className="text-black dark:text-white text-xl sp tracking-wide">
          {header}
        </h3>
        <p className="text-[#64748b]">{titel}</p>
      </div>
    </div>
  );
}

export default Card;
