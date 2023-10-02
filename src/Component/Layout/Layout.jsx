import React, { useContext, useEffect } from "react";
import Navbar from "./../NavBar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import { UserContext } from "../CounterContext/UserContext";
import { Offline } from "react-detect-offline";

export default function Layout() {
  let { setUserToken } = useContext(UserContext);

  useEffect(() => {
    if (localStorage.getItem("userToken") !== null) {
      setUserToken(localStorage.getItem("userToken"));
    }
  }, []);

  return (
    <>
      <div className="vh-100 d-grid">
        <Navbar />
        <div className="container py-5 mt-5">
          <Outlet />
        </div>
        <div>
          <Offline>
            <div className="netWork text-danger">
              <i className="fas fa-wifi"></i> You r Offline
            </div>
          </Offline>
        </div>
        <Footer></Footer>
      </div>
    </>
  );
}
