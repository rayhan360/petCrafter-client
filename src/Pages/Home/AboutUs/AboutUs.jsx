
import Title from "../../../components/Common/Title";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div className="about-items bg-fixed bg-cover bg-center text-white my-20">
      <div className="bg-black bg-opacity-50 pt-12 pb-20 px-6 md:px-36">
        <Title heading="About Us" subHeading="Explore Our Mission" />

        <div className="md:flex justify-center items-center text-center">
          <div className="md:ml-10 max-w-3xl">
            <p className="mb-6 text-lg leading-loose">
              Welcome to <span className="text-green-400 font-bold">PetCrafter</span>,
              where passion meets paws. We believe in the
              extraordinary bond between humans and animals. Our mission is to
              create a bridge between loving homes and pets in need, fostering a
              world where everywagging tail finds its forever home.
            </p>

            <div className="mb-12">
              <p className="text-xl font-bold mb-4">How It Works</p>
              <p className="text-lg leading-loose">
                At <span className="text-green-400 font-bold">PetCrafter</span>, we&apos;ve crafted an adoption journey that is as
                delightful as it is rewarding. Explore our categories, dive into
                heartwarming stories, and seamlessly connect with pets searching
                for their forever families. Your adoption adventure begins here.
              </p>
            </div>

            <div className="mb-12">
              <p className="text-xl font-bold mb-4">Why We Exist</p>
              <p className="text-lg leading-loose">
                <span className="text-green-400 font-bold">PetCrafter</span> emerged from a shared love for animals and a profound
                commitment to their well-being. We envision a world where every
                pet experiences the warmth of a loving family, and every home is
                enriched by the love and companionship only a pet can provide.
                Join us in making a difference, one paw at a time.
              </p>
            </div>

            <div>
              <p className="text-lg">
                Join us on this meaningful journey. Whether you&apos;re a potential
                pet parent or an advocate for animal welfare, <span className="text-green-400 font-bold">PetCrafter</span> invites
                you to be part of our community. Together, let&apos;s create a world
                where every pet finds its forever home, and every home is
                adorned with the unconditional love of a furry friend.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
