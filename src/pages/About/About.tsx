import AboutHeroSection from "./about/AboutHeroSection";
import CooksSection from "./about/CooksSection";
import PromoSection from "./about/PromoSection";

function About() {
  return (
    <div className="px-5 sm:px-14 xl:px-20 pt-36">
      <AboutHeroSection />
      <PromoSection />
      <CooksSection />
    </div>
  );
}

export default About;
