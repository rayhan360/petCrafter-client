import { useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { FaCalendarAlt, FaMoneyBillWave, FaPaw } from "react-icons/fa";
import Payment from "./Payment/Payment";

const DonationDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();

  const { data: donationCampaign = [], isPending } = useQuery({
    queryKey: ["donationCampaign"],
    queryFn: async () => {
      const res = await axiosPublic.get("/donation");
      return res.data;
    },
  });

  if (isPending) {
    return <h1>Loading.....</h1>;
  }

  const findDonation = donationCampaign.find((donate) => donate._id === id);
  const {
    petImage,
    maximumAmount,
    lastDateOfDonation,
    shortDescription,
    longDescription,
    petName,
  } = findDonation;

  return (
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

        {/* You can open the modal using document.getElementById('ID').showModal() method */}
        <button
          className="bg-[#f6425f] text-white px-6 py-3 rounded-md hover:bg-[#d53e68] focus:outline-none"
          onClick={() => document.getElementById("my_modal_3").showModal()}
        >
          open modal
        </button>
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <Payment petImage={petImage} petName={petName}></Payment>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default DonationDetails;
