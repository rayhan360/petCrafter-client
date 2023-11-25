import { Link, NavLink } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import "./Navbar.css"

const Navbar = () => {
    const [open, setOpen] = useState(false);
    return (
        <div>
            <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center font-bold text-lg">
          <h1>Pet Crafter</h1>
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
              className={`absolute  lg:block lg:static px-5 ${
                open ? "right-1" : "-right-72"
              } ${open ? "block" : "hidden"}`}
            >
              <div className="flex flex-col md:flex-row gap-5 py-3 items-center">
                <ul className={`flex flex-col md:flex-row gap-5 text-black`}>
                  <li>
                    <NavLink to="/">Home</NavLink>
                  </li>
                  <li>
                    <NavLink to="petListing">Pet Listing</NavLink>
                  </li>
                  <li>
                    <NavLink to="donation">Donation Campaign</NavLink>
                  </li>
                </ul>
                <div>
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