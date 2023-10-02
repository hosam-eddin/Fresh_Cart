// import jwtDecode from "jwt-decode";
import React from "react";
import { useContext } from "react";
import { UserContext } from "../CounterContext/UserContext";


export default function Profile() {
  let { userData } = useContext(UserContext);
  console.log('====================================');
  console.log(userData);
  console.log('====================================');

  //   let encodedToken = localStorage.getItem("userToken");
  //   let decodedToken = jwtDecode(encodedToken);
  return (
    <>
      <div className="fw-bold">5amssaa 3lek ya {userData?.name}</div>
      <div className="fw-bold">email: {userData?.email}</div>
    </>
  );
}
