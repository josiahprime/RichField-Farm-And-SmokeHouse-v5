import phone from '../../assets/phone.svg'
import email from '../../assets/email.svg'
import location from '../../assets/location.svg'

const Contact = () => {
  return (
    <>
      <div className="relative bg-center bg-cover bg-no-repeat h-[85vh] bg-[url('src/assets/contact.jpg')]">
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
          <div className="relative z-10 mx-5 md:mx-12 pb-20 flex flex-col items-start justify-end h-full space-y-4">
          <h2 className="text-white">HOME/ CONTACT</h2>
          <h1 className="lg:text-5xl md:text-4xl text-4xl text-white font-bold">Contact Us</h1>
          </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 md:p-12">
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="bg-gray-50 rounded-lg p-6 shadow-md">
          <h2 className="text-3xl font-bold text-[#29746b] mb-4">Get in touch</h2>
          <p className="text-gray-600 mb-8 text-sm">Feel free to contact us and we will get back to you as soon as possible</p>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full p-3 rounded-lg bg-white border text-sm border-gray-200 focus:border-teal-700 focus:ring-1 focus:ring-teal-700 outline-none"
            />
            <input
              type="email"
              placeholder="E-mail"
              className="w-full p-3 rounded-lg bg-white border text-sm border-gray-200 focus:border-teal-700 focus:ring-1 focus:ring-teal-700 outline-none"
            />
            <textarea
              placeholder="Message"
              rows={4}
              className="w-full p-3 rounded-lg bg-white border text-sm border-gray-200 focus:border-teal-700 focus:ring-1 focus:ring-teal-700 outline-none resize-none"
            ></textarea>
            <button
              type="button"
              className="w-full text-sm bg-[#29746b] hover:bg-[#143834] text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Send
            </button>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-lg p-8 shadow-md">
            <h3 className="text-xl font-semibold text-[#29746b] mb-6">Contact Information</h3>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <img src={location} 
                alt="" 
                className="w-5 h-5"
                />
                <div>
                  <h4 className="font-semibold text-[#29746b] text-sm mb-1">Our Location</h4>
                  <p className="text-gray-600 text-sm">123 Business Street</p>
                  <p className="text-gray-600 text-sm">New York, NY 10001</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <img src={phone}
                 alt=""
                 className="w-5 h-5"
                />
                <div>
                  <h4 className="font-semibold text-[#29746b] text-sm mb-1">Phone Number</h4>
                  <p className="text-gray-600 text-sm">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <img src={email} 
                alt=""
                className="w-5 h-5" 
                />
                <div>
                  <h4 className="font-semibold text-[#29746b] text-sm mb-1">Email Address</h4>
                  <p className="text-gray-600 text-sm">contact@business.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="text-xl font-semibold text-[#29746b] mb-6">Hours of Operation</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm">Monday - Friday</span>
                <span className="text-gray-800 text-sm">9:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm">Saturday</span>
                <span className="text-gray-800 text-sm">10:00 AM - 4:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm">Sunday</span>
                <span className="text-gray-800 text-sm">Closed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Contact