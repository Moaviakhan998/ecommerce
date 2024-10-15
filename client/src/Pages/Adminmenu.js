import React from "react";
import { NavLink } from "react-router-dom";

const Adminmenu = () => {
  
  return (
    <>
      <div className="list-group">
        <NavLink
          to="/dashboard/admin/create-category"
          className="list-group-item list-group-item-action  p-2"
          aria-current="true"
        >
          Create Category
        </NavLink>
        <NavLink to="/dashboard/admin/create-product" className="list-group-item p-2 list-group-item-action">
          Create Product
        </NavLink>
        <NavLink to="/dashboard/admin/products" className="list-group-item p-2 list-group-item-action">
          Products
        </NavLink>
        <NavLink to="/dashboard/admin/allorders" className="list-group-item p-2 list-group-item-action">
          Orders
        </NavLink>
        <NavLink to="/dashboard/admin/users" className="list-group-item p-2 list-group-item-action">
          Users
        </NavLink>
      </div>
    </>
  );
};

export default Adminmenu;
