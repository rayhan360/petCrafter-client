import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Title from "../../../components/Common/Title";
// import Title from "../../../components/Common/Title";

const MyDonation = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: myDonation = [], refetch } = useQuery({
    queryKey: ["myDonation", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/user?email=${user?.email}`);
      return res.data;
    },
  });
  console.log(myDonation);

  const handleRefund = id => {
    Swal.fire({
      title: "Are you sure?",
      text: "You Refund this donation!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/payments/delete/${id}`).then((res) => {
          console.log(res.data);
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Refund!",
              text: "Refund Has been successfully",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  }

  return (
  <div>
    <Title heading="My Donation"></Title>
    <div
        className="overflow-x-auto mt-2"
        style={{ borderRadius: "15px 15px 0px 0px" }}
      >
        <table className="table">
          {/* head */}
          <thead className="bg-[#e7c7b1] text-white">
            <tr>
              <th>#</th>
              <th>Pet Image</th>
              <th>Pet Name</th>
              <th>Donated Amount</th>
              <th>Ask for Refund</th>
            </tr>
          </thead>
          <tbody>
            {myDonation.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={item.petImage}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <h1>{item.petName}</h1>
                </td>
                <td>${item.amount}</td>
                <td>
                    <button onClick={() => handleRefund(item._id)} className="btn btn-sm bg-[#f6425f] text-white">Refund</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  </div>
  );
};

export default MyDonation;
