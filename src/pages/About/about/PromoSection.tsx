function PromoSection() {
  return (
    <div className="lg:grid lg:grid-cols-2 mt-28 gap-5">
      <div className="mt-10 lg:mt-0 space-y-5">
        <button className="bg-[#352018] text-[#ca4d19] py-1 px-3 rounded-2xl">
          promo video
        </button>
        <h1 className="text-2xl md:text-5xl font-semibold ">
          Restaurant is like a theater. Our task is to amaze you!
        </h1>

        <p>
          Repellat, dolorem a. Qui ipsam quos, obcaecati mollitia consectetur ad
          vero minus neque sit architecto totam distineserunt pariatur adipisci
          rem aspernatur illum ex!
        </p>
      </div>

      <div className="md:h-[355px] h-[218px] my-10 lg:my-0">
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/F3zw1Gvn4Mk?si=IIEh75zmaSZ0v6gt&start=1"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
        ></iframe>
      </div>
    </div>
  );
}

export default PromoSection;
