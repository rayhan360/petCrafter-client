import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import Title from "../../../components/Common/Title";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";

const MyDonationCampaign = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: donation = [], refetch } = useQuery({
    queryKey: ["donation", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donation/user?email=${user?.email}`);
      return res.data;
    },
  });

  const { data: donationAmount = [] } = useQuery({
    queryKey: ["donationAmount"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments`);
      return res.data;
    },
  });

  const petAmounts = {};
  donationAmount.forEach((item) => {
    const petName = item.petName;
    const amount = item.amount;
    petAmounts[petName] = (petAmounts[petName] || 0) + amount;
  });

  const handleViewDetails = (petName) => {
    const matchingDonationAmounts = donationAmount.filter(
      (item) => item.petName === petName
    );

    const modal = document.getElementById("my_modal_3");
    if (modal) {
      modal.showModal();
      const modalContent = modal.querySelector(".modal-box");
      modalContent.innerHTML = `
        <form method="dialog">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <h3 class="font-bold text-lg">${petName}</h3>
        <ul>
        <li>Donators List: </li>
          ${matchingDonationAmounts
            .map(
              (item) =>
                `<li>Email: ${item.email}, Amount: $${item.amount || 0}</li>`
            )
            .join("")}
        </ul>
      `;
    }
  };

  const handlePaused = async (id) => {
    try {
      const res = await axiosSecure.patch(`/donation/request/${id}`);
      if (res.data.modifiedCount) {
        Swal.fire("You Have Paused this donation!");
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleUnPaused = async (id) => {
    try {
      const res = await axiosSecure.patch(`/donation/unpaused/${id}`);
      if (res.data.modifiedCount) {
        Swal.fire("You Have Start this donation!");
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Title heading="My Donation Campaign"></Title>
      <div
        className="overflow-x-auto mt-2"
        style={{ borderRadius: "15px 15px 0px 0px" }}
      >
        <table className="table">
          {/* head */}
          <thead className="bg-[#e7c7b1] text-white">
            <tr>
              <th>#</th>
              <th>Pet Name</th>
              <th>Maximum Donation Amount</th>
              <th>Donation Progress</th>
              <th>Edit</th>
              <th>Action</th>
              <th>View Donators</th>
            </tr>
          </thead>
          <tbody>
            {donation.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                  <h1>{item.petName}</h1>
                </td>
                <td>${item.maximumAmount}</td>
                <td>
                  <progress
                    className="progress progress-error w-56"
                    value={petAmounts[item.petName] || 0}
                    max={item.maximumAmount}
                  ></progress>
                </td>
                <td className="text-2xl">
                  <Link>
                    <h1>
                      <Link to={`/dashboard/updateDonation/${item._id}`}>
                        <FaEdit></FaEdit>
                      </Link>
                    </h1>
                  </Link>
                </td>
                <td className="">
                  {item?.pausedStatus === true ? (
                    <button
                      onClick={() => handleUnPaused(item._id)}
                      className="btn btn-sm"
                    >
                      Unpaused
                    </button>
                  ) : (
                    <button
                      className="btn btn-sm"
                      onClick={() => handlePaused(item._id)}
                    >
                      Paused
                    </button>
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-sm"
                    onClick={() => handleViewDetails(item.petName)}
                  >
                    View Donators
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">{/* Modal content goes here */}</div>
      </dialog>
    </div>
  );
};

export default MyDonationCampaign;
