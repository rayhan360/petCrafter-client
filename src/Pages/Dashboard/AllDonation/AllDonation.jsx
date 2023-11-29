import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Title from "../../../components/Common/Title";
import Swal from "sweetalert2";
import Loading from "../../../components/Common/Loading";


const AllDonation = () => {
    const axiosSecure = useAxiosSecure()

    const { data: allDonation = [], isPending, refetch } = useQuery({
      queryKey: ["allDonation"],
      queryFn: async () => {
        const res = await axiosSecure.get("/donation");
        return res.data;
      },
    });
  
    if (isPending) {
      return <Loading></Loading>;
    }

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
      const handleDelete = id => {
        Swal.fire({
          title: "Are you sure?",
          text: "Delete this Donation!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            axiosSecure.delete(`/donation/request/${id}`).then((res) => {
              console.log(res.data);
              if (res.data.deletedCount > 0) {
                Swal.fire({
                  title: "Delete!",
                  text: "Delete Successfull",
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
      <Title heading="All Donation"></Title>
      <div
        className="overflow-x-auto mt-2"
        style={{ borderRadius: "15px 15px 0px 0px" }}
      >
        <table className="table">
          {/* head */}
          <thead className="bg-[#e7c7b1] text-white">
            <tr className="text-center">
              <th>#</th>
              <th>Pet Name</th>
              <th>Maximum Donation Amount</th>
              <th>Edit</th>
              <th>Action</th>
              <th>Delete Donation</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {allDonation.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                  <h1>{item.petName}</h1>
                </td>
                <td>${item.maximumAmount}</td>
                <td className="text-2xl">
                  <Link>
                    <h1>
                      <Link to={`/dashboard/updateDonation/${item._id}`}>
                        <FaEdit></FaEdit>
                      </Link>
                    </h1>
                  </Link>
                </td>
                <td className="text-center">
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
                    <button onClick={()=> handleDelete(item._id)} className="bg-red-600 p-2 text-white">
                        <FaTrash className="text-md"></FaTrash>
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    );
};

export default AllDonation;