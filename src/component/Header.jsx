import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <h2>
        <img
          height={50}
          src="https://purpleinkllc.com/wp-content/uploads/2018/10/Consulting.png"
        />
        <span>Job Tracking</span>
      </h2>
      <nav>
        <NavLink to={"/add-job"}>Add Job</NavLink>
        <NavLink to={"/"}>Job List</NavLink>
      </nav>
    </header>
  );
};

export default Header;
