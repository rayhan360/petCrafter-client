import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Title from "../../../components/Common/Title";
import Swal from "sweetalert2";
import Loading from "../../../components/Common/Loading";


const AllPets = () => {
    const axiosSecure = useAxiosSecure();

    const {
        data: allPets = [],
        refetch,
        isPending,
      } = useQuery({
        queryKey: ["allPets"],
        queryFn: async () => {
          const res = await axiosSecure.get(
            `/pets/allPets`
          );
          return res.data;
        },
      });
    
      if (isPending) {
        return <Loading></Loading>;
      }
      const handleDelete = id => {
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
            axiosSecure.delete(`/pets/${id}`).then((res) => {
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

      const handleAdoption = async (id) => {
        try {
          const res = await axiosSecure.patch(`/pets/${id}`);
          // After accepting, refetch the adoption requests
          if (res.data.modifiedCount) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "adoption request accepted",
              showConfirmButton: false,
              timer: 1500,
            });
            refetch()
          }
        } catch (error) {
          console.error("Error accepting adoption:", error);
        }
      };
      
    return (
        <div>
        <Title heading="All Pets Adde by all users"></Title>
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
                <th>Category</th>
                <th>Adoption Status</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {allPets.map((item, index) => (
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
                  <td>{item.petCategory.label}</td>
                  <td>
                    {item?.adopted === true ? "Adopted" : <div>
                        <h1 className="text-red-600">Not Adopted</h1>
                        <button onClick={() => handleAdoption(item._id)} className="btn btn-sm mt-2">Change the status</button>
                        </div>}
                  </td>
                  <td className="text-2xl">
                    <Link to={`/dashboard/updateItem/${item._id}`}>
                      <FaEdit />
                    </Link>
                  </td>
                  <td className="text-2xl">
                    <button onClick={()=> handleDelete(item._id)}>
                      <FaRegTrashAlt />
                    </button>
                  </td>
                  <td>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default AllPets;