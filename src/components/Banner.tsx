function Banner({ header, title }: { header: string; title: string }) {
  const condition = header === "Check it out";
  return (
    <div className={`space-y-4 ${condition ? "text-center" : ""}`}>
      <button
        className={`bg-[#fce8dd] dark:bg-[#352018] py-2 px-4 rounded-3xl text-[#e77b1f] ${
          condition ? "mx-auto" : ""
        } `}
      >
        {header}
      </button>

      <h4 className="text-black dark:text-white text-3xl font-medium">
        {title}
      </h4>
    </div>
  );
}

export default Banner;
