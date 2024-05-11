function Banner({ header, title }: { header: string; title: string }) {
  const condition = header === "Check it out";
  return (
    <div className={`space-y-4 ${condition ? "text-center" : ""}`}>
      <div
        className={`bg-[#fce8dd] dark:bg-[#352018]  rounded-xl text-[#e77b1f] ${
          condition ? "mx-auto w-36" : "w-32"
        } `}
      >
        <h3 className="text-center">{header}</h3>
      </div>
      <h4 className="text-black dark:text-white text-3xl font-medium">
        {title}
      </h4>
    </div>
  );
}

export default Banner;
