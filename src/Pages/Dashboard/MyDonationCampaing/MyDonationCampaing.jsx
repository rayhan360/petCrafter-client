import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import Title from "../../../components/Common/Title";
import { FaEdit } from "react-icons/fa";

const MyDonationCampaing = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: donation = [] } = useQuery({
    queryKey: ["donation", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donation?email=${user?.email}`);
      return res.data;
    },
  });
  console.log(donation);
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
              <td>{item.maximumAmount}</td>
              <td><progress className="progress progress-error w-56" value="40" max="100"></progress></td>
              <td className="text-2xl">
                <Link>
                <h1><FaEdit></FaEdit></h1>
                </Link>
              </td>
              <td className="">
                <button className="btn btn-sm">Paused</button>
              </td>
              <td>
                <button className="btn btn-sm">View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  );
};

export default MyDonationCampaing;
