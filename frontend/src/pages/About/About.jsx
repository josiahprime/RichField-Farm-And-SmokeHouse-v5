
const About = () => {
  return (
    <>
      <div className="relative bg-center bg-cover bg-no-repeat h-[85vh] bg-[url('assets/farm.jpg')]">
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10 mx-5 md:mx-12 pb-20 flex flex-col items-start justify-end h-full space-y-4">
        <h2 className="text-white">HOME/ ABOUT</h2>
        <h1 className="lg:text-5xl md:text-4xl text-4xl text-white font-bold">About Us</h1>
        </div>
      </div>
      <div className="px-4 md:px-12 py-12 bg-white text-gray-600">
        <div className="space-y-6 md:space-y-0 md:flex md:gap-7 lg:items-center">
            <div className="md:5/12 lg:w-6/12">

            {/* image grid */}
            <div className="border p-2 rounded-lg">
            <div className="grid grid-cols-2 gap-2">
              <img
                src="assets/fruit00.jpg"
                alt="Top Image 1"
                className="w-full h-48 object-cover rounded-md"
              />
              <img
                src="assets/orange.jpg"
                alt="Orange Image"
                className="w-full h-48 object-cover rounded-md"
              />
            </div>
            {/* Bottom Image */}
            <div className="mt-2">
              <img
                src="assets/fish03.jpg"
                alt="Bottom Image"
                className="w-full h-48 object-cover rounded-md"
              />
            </div>
          </div>
          </div>

          <div className="md:7/12 lg:w-6/12">
            <h2 className="text-3xl text-gray-900 font-bold md:text-4xl">
              About Richfield Farm
            </h2>
            <p className="mt-6 text-gray-600">
            At Richfield Farm & Smokehouse, we are passionate about connecting you to the finest and freshest farm produce and seafood. Nestled in the heart of nature, we pride ourselves on offering handpicked fruits, vegetables, and premium-quality fish that bring both freshness and flavor to your table.
            </p>
            <p className="mt-4 text-gray-600">
            With a commitment to quality and freshness, we partner with trusted local farmers and fishers to deliver products that meet the highest standards. From freshly caught fish to handpicked fruits and vegetables, every item is carefully curated to satisfy your needs.

            Whether you are looking to prepare a wholesome family meal or stock your pantry with the best nature has to offer, Richfield Farm & Smokehouse is here to make it easy, convenient, and reliable.
            </p>
            <p className="mt-4 text-gray-600">
              <span className="font-bold">Our mission is simple:</span> to provide a seamless farm-to-fork experience while promoting sustainable farming and fishing practices. We believe in the power of wholesome, natural food to nourish the body and soul.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default About