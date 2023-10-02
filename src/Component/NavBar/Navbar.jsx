import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/freshcart-logo.svg";
import { UserContext } from "../CounterContext/UserContext";
import { CartContext } from "../CounterContext/CartContext";

export default function Navbar() {
  let { cartCount ,favCount } = useContext(CartContext);


  let { userToken, setUserToken } = useContext(UserContext);
  const [navbar, setNavbar] = useState(false);

  let navigate = useNavigate();

  const changePadding = () => {
    if (window.scrollY > 150) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  window.addEventListener("scroll", changePadding);

  function LogOut() {
    localStorage.removeItem("userToken");
    setUserToken(null);
    navigate("/login");
  }

  return (
    <>
      <nav
        className={
          navbar
            ? "navbar navbar-expand-lg bg-light px-10 py-2 fixed-top"
            : "navbar navbar-expand-lg bg-light px-5 py-4 fixed-top"
        }
      >
        <div className="container-fluid ">
          <Link className="navbar-brand text-black fw-bolder " to="">
            <img src={logo} width={170} alt="Logo Home" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {userToken !== null ? (
              <ul className="navbar-nav me-auto mb-lg-0 fw-bolder column-gap-2--">
                <li className="nav-item">
                  <Link
                    className="nav-link text-black-50"
                    aria-current="page"
                    to=""
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item position-relative">
                  <Link
                    className="nav-link text-black-50"
                    aria-current="page"
                    to="cart"
                  >
                    Cart{" "}
                    <i className="fas fa-cart-shopping text-main ">
                    </i>
                      <span className="position-absolute translate-middle badge p-1 rounded-pill bg-danger">
                        {cartCount}
                      </span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link text-black-50"
                    aria-current="page"
                    to="products"
                  >
                    Products
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link text-black-50"
                    aria-current="page"
                    to="categories"
                  >
                    Categories
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link text-black-50"
                    aria-current="page"
                    to="brands"
                  >
                    Brands
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link text-black-50"
                    aria-current="page"
                    to="profile"
                  >
                    Profile
                  </Link>
                </li>
              </ul>
            ) : (
              ""
            )}

            <ul className="navbar-nav ms-auto mb-lg-0 fw-bolder column-gap-2--">
              <li className="nav-item d-flex justify-content-center align-items-center column-gap-3 me-4">
                <i className="fa-brands fa-instagram" />
                <i className="fa-brands fa-facebook" />
                <i className="fa-brands fa-twitter" />
              </li>
              {userToken !== null ? (
                <>
                  <li className="nav-item">
                    <span
                      className="nav-link text-black-50 cursor-pointer"
                    >
                      <Link to={'whishList'}>
                      <i className="fas fa-heart text-main"></i>
                      </Link>
                      <span className="position-absolute translate-middle badge p-1 rounded-pill bg-danger">
                        {favCount}
                      </span>
                    </span>
                  </li>
                  <li className="nav-item">
                    <span
                      className="nav-link text-black-50 cursor-pointer"
                      onClick={LogOut}
                    >
                      Logout
                    </span>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link text-black-50"
                      aria-current="page"
                      to="login"
                    >
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link text-black-50"
                      aria-current="page"
                      to="register"
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
