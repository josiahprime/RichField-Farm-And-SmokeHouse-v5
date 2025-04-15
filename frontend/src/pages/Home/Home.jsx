import Hero from "../Hero/Hero"
import Testimonial from "../Testimonial/Testimonial"
import FirstContent from "../../Components/FirstContent/FirstContent"
import FruitCard from "../../Components/FruitCard/FruitCard"
import Banner from "../../Components/Banner/Banner"
import NewArrivals from '../../pages/Home/NewArrivals/NewArrivals'

const Home = () => {
  return (
    <>
      <Banner/>
      <Hero />
      <FruitCard />
      <FirstContent />
      <NewArrivals/>
      <Testimonial />
    </>
  )
}

export default Home