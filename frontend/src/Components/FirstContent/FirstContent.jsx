"use client";

import { Carousel } from "flowbite-react";
import saleBanner from '../../assets/sale-banner.jpg'
import secondBanner from '../../assets/banner-two.jpg'
import bannerFour from '../../assets/banner-4.jpg'
import bannerThree from '../../assets/banner-3.jpg'

const FirstContent = () => {
  return (
    <>
      <div className="h-56 mx-6 my-5 md:mx-12 sm:h-64 xl:h-80 2xl:h-96">
      <Carousel slideInterval={5000}>
        <img src={bannerFour} alt="Hot sale" />
        <img src={secondBanner} alt="summer sale" />
        <img src={saleBanner} alt="Farmer's sale - 50%" />
        <img src={bannerThree} alt="New summer sale" />
      </Carousel>
    </div>
    </>
  )
}

export default FirstContent