import callImg from "../../../assets/call.jpg";
import img from "../../../assets/introimg1.jpg";
const CallToAction = () => {
  return (
    <div>
      <div className="hero min-h-screen">
        <div className="hero-content flex-col lg:flex-row">
          <div className="flex-1">
            <img className="rounded-lg" src={callImg} alt="" />
          </div>
          <div className="flex-1 ml-2">
            <h1 className="text-4xl font-bold">
              Transform Lives, Adopt a Pet Today!
            </h1>
            <p className="py-6">
              Open your heart, change a life. Adopt a furry friend today and
              embark on a journey of unconditional love, wagging tails, and
              endless joy. Because every pet deserves a loving home, and every
              home deserves a loyal companion. Make a difference – adopt, love,
              cherish.
            </p>
            <div className="flex items-center">
              <button className="btn bg-[#f6425f] text-white">
                Find Your Perfect Companion
              </button>
              <img className="w-48" src={img} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
