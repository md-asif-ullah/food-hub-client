import { Helmet } from "react-helmet-async";
import AboutUs from "./home/About";
import AppInfo from "./home/AppInfo";
import Hero from "./home/Hero";
import Testimonials from "./home/Testimonials";

function Home() {
  return (
    <>
      <Helmet>
        <title>Home | Best Online restaurant</title>
      </Helmet>
      <Hero />
      <AboutUs />
      <Testimonials />
      <AppInfo />
    </>
  );
}

export default Home;
