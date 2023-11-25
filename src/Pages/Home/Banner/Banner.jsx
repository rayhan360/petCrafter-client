
import banner3 from "../../../assets/banner4.jpg";
import "./Banner.css"
const Banner = () => {
  return (
    <div>
      <div className="hero min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="flex-1">
            <img src={banner3} alt="" />
          </div>
          <div className="flex-1">
            <h1 className="text-5xl font-bold">Unlock Love: Adopt a Furry Companion Today!</h1>
            <p className="py-6">
            Transform a life, gain a friend. Experience the joy of pet adoption and make a forever difference.
            </p>
            <button className="btn bg-[#f6425f] text-white">Find Your Forever Friend</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
