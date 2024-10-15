import React from "react";
import { NavLink } from "react-router-dom";

const Usermenu = () => {
  return (
    <>
      <div className="list-group">
        <NavLink
          to="/dashboard/user/profile"
          className="list-group-item list-group-item-action   p-3"
          aria-current="true"
        >
          User Profile
        </NavLink>
        <NavLink to="/dashboard/user/orders" className="list-group-item   p-3 list-group-item-action">
          Orders
        </NavLink>
      </div>
    </>
  );
};

export default Usermenu;
