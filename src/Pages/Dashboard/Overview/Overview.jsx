import { FaDog, FaDonate, FaUser } from "react-icons/fa";
import useDonation from "../../../hooks/useDonation";
import usePets from "../../../hooks/usePets";
import useUser from "../../../hooks/useUser";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const Overview = () => {
  const [users, , ,] = useUser();
  const [allPets, , ,] = usePets();
  const [allDonation, , ,] = useDonation();

  const adminUsers = users.filter((user) => user.role === "admin");
  const normalUsers = users.filter((user) => user.role === "user");

  const data = [
    { name: "Total Users", user: users.length },
    { name: "Admin Users", user: adminUsers.length },
    { name: "Normal Users", user: normalUsers.length },
  ];

  return (
    <div>
      <div className="container mx-auto mt-8">
        <h1 className="text-3xl font-bold mb-4">Dashboard Overview</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-center bg-[#ef6f18] rounded-full w-12 h-12 mb-4">
              <FaUser className="text-white text-2xl"></FaUser>
            </div>
            <h2 className="text-xl font-semibold mb-2">Total Users</h2>
            <p className="text-gray-600">{users.length}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-center bg-[#ef6f18] rounded-full w-12 h-12 mb-4">
              <FaDog className="text-white text-2xl"></FaDog>
            </div>
            <h2 className="text-xl font-semibold mb-2">Total Pets</h2>
            <p className="text-gray-600">{allPets.length}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-center bg-[#ef6f18] rounded-full w-12 h-12 mb-4">
              <FaDonate className="text-white text-2xl"></FaDonate>
            </div>
            <h2 className="text-xl font-semibold mb-2">All Donations</h2>
            <p className="text-gray-600">{allDonation.length}</p>
          </div>
        </div>
      </div>
      
      <div className="flex mt-8">
        <BarChart width={400} height={400} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="user" fill="#8884d8" />
        </BarChart>
      </div>
    </div>
  );
};

export default Overview;
