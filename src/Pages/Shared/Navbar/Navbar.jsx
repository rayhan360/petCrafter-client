import { Link, NavLink } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import "./Navbar.css";
import useAuth from "../../../hooks/useAuth";
import logo from "../../../assets/logo.png"

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, logOut } = useAuth();

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center font-bold text-lg">
          <img className="w-40 md:w-60" src={logo} alt="" />
        </div>
        <div className="">
          <div
            className="lg:hidden text-2xl mr-8 mt-5 text-black"
            onClick={() => setOpen(!open)}
          >
            {open === true ? (
              <AiOutlineClose></AiOutlineClose>
            ) : (
              <AiOutlineMenu></AiOutlineMenu>
            )}
          </div>
          <div>
            <nav
              className={`absolute bg-[#e7c7b1] z-50 lg:bg-transparent lg:block lg:static px-5 ${
                open ? "right-1" : "-right-72"
              } ${open ? "block" : "hidden"}`}
            >
              <div className="flex flex-col md:flex-row gap-5 py-3 items-center">
                <ul className={`flex flex-col md:flex-row gap-5 text-black`}>
                  <li>
                    <NavLink to="/">Home</NavLink>
                  </li>
                  <li>
                    <NavLink to="/petListing">Pet Listing</NavLink>
                  </li>
                  <li>
                    <NavLink to="/donation-campaign">Donation Campaign</NavLink>
                  </li>
                </ul>
                <div>
                  {user ? (
                    <div className="dropdown dropdown-end">
                      <label
                        tabIndex={0}
                        className="btn btn-ghost btn-circle avatar"
                      >
                        <div className="w-10 rounded-full">
                          <img
                            alt="Tailwind CSS Navbar component"
                            src={user.photoURL}
                          />
                        </div>
                      </label>
                      <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                      >
                        <li>
                          <a className="justify-between">{user.displayName}</a>
                        </li>
                        <li>
                          <Link to="/dashboard"><p>Dashboard</p></Link>
                        </li>
                        <li>
                          <button
                            onClick={handleLogOut}
                            className="bg-[#f6425f] text-white px-5 py-2 rounded-md ml-3 hover:border hover:border-[#f6425f] "
                            type="button"
                            data-ripple-light="true"
                          >
                            Log Out
                          </button>
                        </li>
                      </ul>
                    </div>
                  ) : (
                    <div className="mb-5 md:mb-0">
                      <Link to="/signIn">
                        <button
                          className="border text-black border-[#f6425f] px-5 py-2 rounded-md hover:bg-[#f6425f] hover:text-white"
                          type="button"
                          data-ripple-light="true"
                        >
                          Sign In
                        </button>
                      </Link>
                      <Link to="/signUp">
                        <button
                          className="bg-[#f6425f] text-white px-5 py-2 rounded-md ml-3 hover:border hover:border-[#f6425f] "
                          type="button"
                          data-ripple-light="true"
                        >
                          Sign Up
                        </button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
