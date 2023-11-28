import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Title from "../../../components/Common/Title";
import Swal from "sweetalert2";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], isLoading, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <>
        <h1>Loading.....</h1>
      </>
    );
  }

  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
      console.log(res.data);
      if (res.data?.modifiedCount > 0) {
        refetch()
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Make a Admin Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };


  return (
    <div>
      <Title subHeading="How Many??" heading="MANAGE ALL USERS"></Title>
      <div className="bg-[#fff] p-4">
        <div className="">
          <h2 className="text-2xl">Total Users: {users.length}</h2>
        </div>
        <div
          className="overflow-x-auto mt-2"
          style={{ borderRadius: "15px 15px 0px 0px" }}
        >
          <table className="table">
            {/* head */}
            <thead className="bg-[#D1A054B2] text-white">
              <tr>
                <th>#</th>
                <th>Profile</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="avatar">
                      <div className="w-12 h-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src={user.photo} />
                      </div>
                    </div>
                  </td>
                  <td>
                    <h1 className="font-semibold">{user.name}</h1>
                  </td>
                  <td>
                    <h1>{user.email}</h1>
                  </td>
                  <td>{user.role === "admin" ? <h1 className="text-green-500 text-xl">Admin</h1> : <div>
                    <button
                    onClick={() => handleMakeAdmin(user)} 
                    className="btn btn-sm bg-[#f6425f] text-white">
                        Make a Admin
                    </button>
                    </div>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
