import catDog from "../../../assets/cat_dog_img.png";

const Experiences = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 items-center mb-8">
      <div className="space-y-3 text-center lg:text-right">
        <h1 className="text-7xl font-bold text-green-500">15+</h1>
        <p className="text-xl font-semibold">Years of Dedicated Adoption Service</p>
        <p className="text-base text-gray-600">
          With over 15 years of passionate commitment, we have been facilitating the adoption of countless pets, creating lasting bonds between animals and loving families.
        </p>
      </div>
      <div>
        <img src={catDog} alt="Happy Pets" />
      </div>
      <div className="space-y-3 text-center lg:text-left">
        <h1 className="text-7xl font-bold text-green-500">10k+</h1>
        <p className="text-xl font-semibold">Happy Pets Placed in Forever Homes</p>
        <p className="text-base text-gray-600">
          Our mission is to find loving homes for pets in need. Thanks to the support of our community, we&lsquo;ve successfully placed over 10,000 pets into forever homes, bringing joy and companionship to families.
        </p>
      </div>
    </div>
  );
};

export default Experiences;
