import { Link, useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { FaCalendarAlt, FaMoneyBillWave, FaPaw } from "react-icons/fa";
import Payment from "./Payment/Payment";
import Loading from "../../components/Common/Loading";

const DonationDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();

  const { data: donationCampaign = [], isPending } = useQuery({
    queryKey: ["donationDetails"],
    queryFn: async () => {
      const res = await axiosPublic.get("/donation");
      return res.data;
    },
  });

  if (isPending) {
    return <Loading></Loading>;
  }

  const findDonation = donationCampaign.find((donate) => donate._id === id);
  const {
    petImage,
    maximumAmount,
    lastDateOfDonation,
    shortDescription,
    longDescription,
    petName,
    email,
    _id,
  } = findDonation;

  const activeDonationCampaigns = donationCampaign.filter(
    (donation) => !donation.pausedStatus
  );

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  return (
    <div>
      <div className="my-5">
        <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-xl shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">{petName}</h2>
            <FaPaw className="text-3xl text-[#f6425f]" />
          </div>
          <div className="flex justify-center">
            <img
              src={petImage}
              alt={petName}
              className="w-96 object-cover rounded-md mb-4"
            />
          </div>

          <div className="flex items-center text-gray-600 mb-4">
            <FaMoneyBillWave className="mr-2" />
            Maximum Amount: ${maximumAmount}
          </div>

          <div className="flex items-center text-gray-600 mb-4">
            <FaCalendarAlt className="mr-2" />
            Last Donation Date: {lastDateOfDonation}
          </div>

          <p className="text-lg mb-4">{shortDescription}</p>

          <p className="text-gray-600 mb-8">{longDescription}</p>

          {findDonation?.pausedStatus === true ? (
            <p className="text-[#f6425f]">Owner Paused This donation</p>
          ) : (
            <button
              className="bg-[#f6425f] text-white px-6 py-3 rounded-md hover:bg-[#d53e68] focus:outline-none"
              onClick={() => document.getElementById("my_modal_3").showModal()}
            >
              Donate Now
            </button>
          )}

          <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <Payment
                petImage={petImage}
                petName={petName}
                email={email}
                _id={_id}
              ></Payment>
            </div>
          </dialog>
        </div>
        <div className="mt-28">
          <h1 className="text-3xl">Recommended Donation for You</h1>
          <div className="grid md:grid-cols-3 gap-3 mt-10">
            {shuffleArray(
              activeDonationCampaigns.filter(
                (item) => item.petName !== findDonation?.petName
              )
            )
              .slice(0, 3)
              .map((item) => (
                <div key={item._id}>
                  <div className="max-w-md mx-auto bg-white rounded-xl overflow-hidden shadow-md">
                    <img
                      className="w-full h-48 object-cover"
                      src={item.petImage}
                      alt={item.petName}
                    />
                    <div className="p-4">
                      <h2 className="font-bold text-xl mb-2">{item.petName}</h2>
                      <p className="text-gray-600 text-sm mb-2">
                        Maximum Donation Amount: ${item.maximumAmount}
                      </p>
                      <p className="text-gray-600 text-sm mb-2">
                        Donated Amount: ${item.maximumAmount / 10}
                      </p>
                      <div className="flex justify-between items-center">
                        <Link to={`/donationDetails/${item._id}`}>
                          <button className="bg-[#f6425f] text-white px-4 py-2 rounded-md hover:bg-[#d53e68]">
                            View Details
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationDetails;
