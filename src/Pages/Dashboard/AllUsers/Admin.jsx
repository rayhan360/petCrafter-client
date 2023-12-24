/* eslint-disable react/prop-types */


const Admin = ({users}) => {
    return (
        <div>
            <div className="bg-white p-4 overflow-x-auto rounded-md">
        <div className="mb-4">
          <h2 className="text-2xl">Admins: {users.length}</h2>
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
              {users.map((user, index) => (
                user.role === "admin" && <tr key={user._id}>
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
                <td className="py-2 px-4 text-center">
                    <h1 className="text-green-500 text-xl">Admin</h1>
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

export default Admin;