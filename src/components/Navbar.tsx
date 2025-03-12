import React from "react";
import { NavLink } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <div className="mt-5 mx-auto block w-full max-w-screen-xl lg:rounded-2xl border border-white/80 bg-white bg-opacity-90 py-2 px-4 text-gray-900 shadow-md backdrop-blur-3xl backdrop-saturate-300 lg:px-8 lg:py-4">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between">
        <div className="lg:mr-20 flex items-center gap-6">
          {/* Link to User Details Page */}
          <NavLink
            to="/dashboard/userDetails"
            className={({ isActive }) =>
              `block p-1 font-sans text-xl font-normal leading-normal text-inherit antialiased ${
                isActive ? "text-sky-700 font-bold" : "hover:text-sky-700"
              }`
            }
          >
            User Details
          </NavLink>
          {/* Link to User Account Creation Page */}
          <NavLink
            to="/dashboard/accountCreation"
            className={({ isActive }) =>
              `block p-1 font-sans text-xl font-normal leading-normal text-inherit antialiased ${
                isActive ? "text-sky-700 font-bold" : "hover:text-sky-700"
              }`
            }
          >
            Account Creation
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
