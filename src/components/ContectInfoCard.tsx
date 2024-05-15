interface ContectCardProps {
  icon: any;
  title: string;
  desc1: string;
  desc2: string;
}

function ContectCard({ icon, title, desc1, desc2 }: ContectCardProps) {
  return (
    <div className=" text-white bg-[#f4f5f7] dark:bg-[#090d1f] p-7 rounded-xl">
      <div>
        <div className="inline-flex mb-5">
          <i className="bg-[#f58220] text-white p-3 rounded-full">{icon}</i>
          <h3 className="ml-3 mt-2 font-semibold text-xl">{title}</h3>
        </div>
        <p className="text-[#5c6b81]">{desc1}</p>
        <p className="text-[#5c6b81] mt-2">{desc2}</p>
      </div>
    </div>
  );
}

export default ContectCard;
