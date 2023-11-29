import { FaEnvelope, FaLocationArrow, FaPhone } from "react-icons/fa";
import img from "../../../assets/contactbg1.png";
import Title from "../../../components/Common/Title";

const ContactUs = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
        <Title heading="Contact Us" ></Title>
      <div className="grid lg:grid-cols-3 gap-3 mb-5">
        <div className="grid md:grid-cols-2 col-span-2">
          <div className="hidden md:block">
            <img className="" src={img} alt="Contact Background" />
          </div>
          <div className="bg-[#f6435f] text-white p-6 h-[600px] rounded-md">
            <h1 className="text-2xl font-bold mb-4 text-center">
              Send a Message
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="subject" className="block text-sm font-medium">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-white text-[#f6435f] px-4 py-2 rounded-md hover:bg-gray-200"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
        <div className="ml-10 text-center">
          <h1 className="text-4xl font-extrabold mb-3">Get in Touch</h1>
          <p className="text-sm mb-3">
            Join us on this meaningful journey. Whether you&#39;re a potential
            pet parent or an advocate for animal welfare, PetCrafter invites you
            to be part of our community. Together, let&#39;s create a world
            where every pet finds its forever home, and every home is adorned
            with the unconditional love of a furry friend..
          </p>
          <div className="text-lg">
            <div className="flex gap-5 justify-center mb-2">
              <div className="flex items-center gap-3">
                <FaEnvelope></FaEnvelope>
                <span className="text-green-600 font-bold">
                  mehedi@gmail.com
                </span>
              </div>
              <div className="flex items-center gap-3">
                <FaPhone></FaPhone>
                <span>+8801963-24</span>
              </div>
            </div>
            <div className="flex justify-center items-center gap-3">
              <FaLocationArrow></FaLocationArrow>
              <span>Mirpur 10, Dhaka-1207, Bangladesh</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
