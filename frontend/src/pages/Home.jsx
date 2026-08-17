import Hero from "../components/Hero";
import CategorySection from "../components/CategorySection";
import Footer from "../components/Footer";
import Shop from "./Shop";

const Home = () => {
  return (
    <>
      <Hero />
      <CategorySection/>
      <Shop/>
      <Footer/>
    </>
  );
};

export default Home;