import {  NavLink, Outlet } from "react-router-dom";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import {
  FaDog,
  FaList,
  FaHandsHelping,
  FaDollarSign,
  FaChartPie,
  FaHeart,
} from "react-icons/fa";

const Dashboard = () => {
  return (
    <div className="">
      <div className="bg-[#ebb692]">
          <Navbar></Navbar>
      </div>
      <div className="flex ">
        <div className="w-64 min-h-screen bg-[#e7c7b1]">
          <ul className="menu">
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
