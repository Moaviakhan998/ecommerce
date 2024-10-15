import React from "react";
import { Link, NavLink } from "react-router-dom";
import { GiShoppingBag } from "react-icons/gi";
import { useAuth } from "../../Context/auth";
import { toast } from "react-toastify";
import SearchInput from "../SearchInput";
import useCategory from "../Hooks/useCategory";
import { useCart } from "../../Context/Cart";
const Header = () => {
  const [auth, setAuth] = useAuth();
 const categories = useCategory();
 const [Cart] = useCart();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout successfully");
  };
  return (

    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary navbaritem">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link
              style={{ textDecoration: "none" }}
              to="/"
              className="navbar-brand"
              href="#"
            >
              <GiShoppingBag /> Ecommerce App
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item navhome">
                <NavLink
                  style={{ textDecoration: "none", color: "black" }}
                  to="/"
                  className="nav-link"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item dropdown navhome">
                <Link className="nav-link dropdown-toggle" to='/categories' role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Category
                </Link>
                <ul className="dropdown-menu ">
                  <li><Link className="dropdown-item navhome" to={`/categories`}>All Categories</Link></li>
                {categories.map((c)=>{
                  return(
                    
                    <li><Link className="dropdown-item navhome" to={`/category/${c.slug}`}>{c.name}</Link></li>
                    
                )})}
                 </ul>
              </li>
              {!auth.user ? (
                <>
                  <li className="nav-item navhome">
                    <NavLink
                      style={{ textDecoration: "none", color: "black" }}
                      to="/register"
                      className="nav-link"
                    >
                      Signup
                    </NavLink>
                  </li>
                  <li className="nav-item navhome">
                    <NavLink
                      style={{ textDecoration: "none", color: "black" }}
                      to="/login"
                      className="nav-link"
                    >
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown navhome">
                    <NavLink
                      style={{ textDecoration: "none", color: "black" }}
                      className="nav-link dropdown-toggle navhome"

                      id="navbarDropdownMenuLink"
                      data-bs-toggle="dropdown"
                      role="button"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {auth?.user?.name}
                    </NavLink>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdownMenuLink"
                    >
                      <li>
                        <NavLink
                          style={{ textDecoration: "none", color: "black" }}
                          className="dropdown-item navhome"
                          to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          style={{ marginLeft: "7px", textDecoration: "none", color: "black" }}
                          onClick={handleLogout}
                          to="/login"
                          className="nav-link navhome"
                        >
                          LogOut
                        </NavLink>
                      </li>
                    </div>
                  </li>
                </>
              )}
              <li className="nav-item navhome">
                <NavLink
                  style={{ textDecoration: "none", color: "black" }}
                  to="/cart"
                  className="nav-link"
                >
                  Cart({Cart?.length})
                </NavLink>
              </li>
              <li className="nav-item">
                <SearchInput />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
