import { FaDog, FaDonate, FaUser } from "react-icons/fa";
import useDonation from "../../../hooks/useDonation";
import usePets from "../../../hooks/usePets";
import useUser from "../../../hooks/useUser";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Link } from "react-router-dom";

const Overview = () => {
  const [users, , ,] = useUser();
  const [allPets, , ,] = usePets();
  const [allDonation, , ,] = useDonation();

  const adminUsers = users.filter((user) => user.role === "admin");
  const normalUsers = users.filter((user) => user.role === "user");
  const adoptedPet = allPets.filter((pet) => pet.adopted === true);

  const data = [
    { name: "Total Users", user: users.length },
    { name: "Admin Users", user: adminUsers.length },
    { name: "Normal Users", user: normalUsers.length },
  ];

  const pie = [
    { name: "All Pets", value: allPets.length },
    { name: "Adopted Pet", value: adoptedPet.length },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

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
            <h2 className="text-xl font-semibold mb-2">
              All Donations Campaign
            </h2>
            <p className="text-gray-600">{allDonation.length}</p>
          </div>
        </div>
      </div>

      {/* chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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

        <div>
          <PieChart width={400} height={400}>
            <Pie
              data={pie}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {pie.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mt-8">
          <div className="flex items-center justify-center bg-[#ef6f18] rounded-full w-12 h-12 mb-4">
            <FaUser className="text-white text-2xl"></FaUser>
          </div>
          <h2 className="text-xl font-semibold mb-2">Admin Users: {adminUsers.length}</h2>
          {adminUsers.map((adminUser) => (
            <div key={adminUser.id} className="mb-4">
              <p className="text-gray-800 font-semibold">
                Name: {adminUser.name}
              </p>
              <p className="text-gray-800 font-semibold">
                Email: {adminUser.email}
              </p>
            </div>
          ))}
          <Link to="/dashboard/all-users"><button className="btn w-full">See All</button></Link>
        </div>
      </div>
    </div>
  );
};

export default Overview;