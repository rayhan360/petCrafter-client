import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Title from "../../../components/Common/Title";
import Swal from "sweetalert2";
import Loading from "../../../components/Common/Loading";
import Admin from "./Admin";
import useUser from "../../../hooks/useUser";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, isLoading, refetch] = useUser()

  if (isLoading) {
    return (
      <>
        <Loading></Loading>
      </>
    );
  }

  const adminUsers = users.filter((user) => user.role === "admin");
  const normalUsers = users.filter((user) => user.role === "user");

  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
      console.log(res.data);
      if (res.data?.modifiedCount > 0) {
        refetch();
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
    <div className="p-4">
      <Title subHeading="How Many??" heading="MANAGE ALL USERS"></Title>
      <Admin users={adminUsers}></Admin>
      <div className="bg-white p-4 overflow-x-auto rounded-md">
        <div className="mb-4">
          <h2 className="text-2xl">Normal Users: {normalUsers.length}</h2>
        </div>
        <div className="overflow-x-auto mt-2">
          <table className="min-w-full table-auto">
            <thead className="bg-[#e7c7b1] text-white">
              <tr>
                <th className="py-2 px-4"> # </th>
                <th className="py-2 px-4"> Profile </th>
                <th className="py-2 px-4"> Name </th>
                <th className="py-2 px-4"> Email </th>
                <th className="py-2 px-4"> Role </th>
              </tr>
            </thead>
            <tbody>
              {normalUsers.map((user, index) => (
                <tr key={user._id}>
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img
                        className="w-full h-full object-cover"
                        src={user.photo}
                        alt={user.name}
                      />
                    </div>
                  </td>
                  <td className="py-2 px-4 text-center">
                    <h1 className="font-semibold">{user.name}</h1>
                  </td>
                  <td className="py-2 px-4 text-center">
                    <h1>{user.email}</h1>
                  </td>
                  <td className="py-2 px-4">
                    {user.role === "admin" ? (
                      <h1 className="text-green-500 text-xl">Admin</h1>
                    ) : (
                      <div>
                        <button
                          onClick={() => handleMakeAdmin(user)}
                          className="btn btn-sm bg-[#f6425f] text-white"
                        >
                          Make a Admin
                        </button>
                      </div>
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

export default AllUsers;
