import { useState } from "react";
import logo from "../assets/logo.png";
import { Link, NavLink, Outlet } from "react-router-dom";
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
  FaHome,
  FaHandHoldingHeart,
} from "react-icons/fa";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { logOut } = useAuth();

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <div className="flex flex-col lg:flex-row">
        <button
          onClick={toggleNav}
          className="lg:hidden bg-[#e7c7b1] p-2 text-xl"
        >
          {isNavOpen ? "Close" : "Open"} Dashboard
        </button>
        <div
          className={`w-full lg:w-64 min-h-screen bg-[#e7c7b1] ${
            isNavOpen ? "" : "hidden lg:block"
          }`}
        >
          <ul className="menu">
            <Link to="/">
              <img className="w-40 md:w-60" src={logo} alt="" />
            </Link>
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
            <li>
              <hr className="my-2 border-t-2 border-gray-300" />
            </li>
            <li>
              <NavLink to="/">
                <FaHome></FaHome> Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/petListing">
                <FaPaw /> Pet Listing
              </NavLink>
            </li>
            <li>
              <NavLink to="/donation-campaign">
                <FaHandHoldingHeart /> Donation Campaign
              </NavLink>
            </li>
          </ul>
          <div>
            <button
              onClick={handleLogOut}
              className=" bg-[#f6425f] text-white px-5 py-2 rounded-md ml-3 hover:border hover:border-[#f6425f]"
              type="button"
              data-ripple-light="true"
            >
              Log Out
            </button>
          </div>
        </div>

        {/* Outlet */}
        <div className="flex-1 p-8 bg-white">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
