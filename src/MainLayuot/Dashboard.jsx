import {  NavLink, Outlet } from "react-router-dom";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import {
  FaDog,
  FaList,
  FaHandsHelping,
  FaDollarSign,
  FaChartPie,
  FaHeart,
  FaUsers,
  FaPaw,
  FaDonate,
} from "react-icons/fa";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
  const [isAdmin] = useAdmin()
  return (
    <div className="">
      <div className="bg-[#ebb692]">
          <Navbar></Navbar>
      </div>
      <div className="flex ">
        <div className="w-64 min-h-screen bg-[#e7c7b1]">
          <ul className="menu">
          {isAdmin && (
              <>
              {/* admin route */}
              <h1 className="text-xl my-2 font-bold">Admin Dashboard</h1>
                <li>
                  <NavLink to="/dashboard/all-users">
                    <FaUsers /> All Users
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/all-pets">
                    <FaPaw /> All Pets
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/all-donations">
                    <FaDonate /> All Donations
                  </NavLink>
                </li>
                <li>
                  <hr className="my-2 border-t-2 border-gray-300" />
                </li>
              </>
            )}
            {/* normal user route */}
            <h1 className="text-xl my-2 font-bold">Dashboard</h1>
            <li>
              <NavLink to="/dashboard/add-pet">
                <FaDog /> Add a Pet
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/my-pets">
                <FaList /> My Added Pets
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/adoption-requests">
                <FaHandsHelping /> Adoption Requests
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/create-donation-campaign">
                <FaDollarSign /> Create Donation Campaign
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/my-donation-campaigns">
                <FaChartPie /> My Donation Campaigns
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/my-donations">
                <FaHeart /> My Donations
              </NavLink>
            </li>
          </ul>
        </div>

        {/* outlet */}
        <div className="flex-1 p-8 bg-white">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
