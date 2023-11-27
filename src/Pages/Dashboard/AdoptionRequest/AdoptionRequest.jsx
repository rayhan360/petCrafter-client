import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Title from "../../../components/Common/Title";
import Swal from "sweetalert2";

const AdoptionRequest = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: adoption = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["adoptionRequest"],
    queryFn: async () => {
      const res = await axiosSecure.get("/adopt");
      return res.data;
    },
  });

  const handleAccept = async (id) => {
    try {
      const res = await axiosSecure.patch(`/adopt/${id}/accept`);
      // After accepting, refetch the adoption requests
      if (res.data.modifiedCount) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "adoption request accepted",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      refetch();
    } catch (error) {
      console.error("Error accepting adoption:", error);
    }
  };

  if (isLoading) {
    return <h1>loading......</h1>;
  }

  const findRequest = adoption.filter(
    (item) => item.ownerEmail === user?.email
  );

  return (
    <div>
      <div>
        <Title heading="Adoption Request"></Title>
        <div
          className="overflow-x-auto mt-2"
          style={{ borderRadius: "15px 15px 0px 0px" }}
        >
          <table className="table">
            {/* head */}
            <thead className="bg-[#e7c7b1] text-white">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Address</th>
                <th>Action</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {findRequest.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>
                    <h1>{item.email}</h1>
                  </td>
                  <td>{item.phoneNumber}</td>
                  <td>{item.address}</td>
                  <td>
                    {item?.status ? (
                      item?.status
                    ) : (
                      <button onClick={() => handleAccept(item._id)}>
                        Accept Request
                      </button>
                    )}
                  </td>
                  <td>
                    {item?.status ? (
                      "Adoption Accepted"
                    ) : (
                      <button>Reject Request</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdoptionRequest;
