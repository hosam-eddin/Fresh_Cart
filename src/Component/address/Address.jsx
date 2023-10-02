import React, { useContext, useEffect } from "react";
import { useFormik } from "formik";
import { CartContext } from "../CounterContext/CartContext";
import axios from "axios";

export default function Address() {
  let userToken = localStorage.getItem("userToken");
  let headers = {
    token: userToken,
  };
  let { id } = useContext(CartContext);

  const initialValues = {
    details: "",
    phone: "",
    city: "",
  };

  console.log("Cart ID:", id);

  function checkOut(id, value, url) {
    return axios.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=${url} `,
      { shippingAddress: value },
      {
        headers,
      }
    );
  }
  async function navigotor(value) {
    let res = await checkOut(
      id,
      value,
      window.location.href.split("/").slice(0, 3).join("/")
    );
    console.log(res.data);
    if (res.data.status === "success") {
      window.location.href = res.data.session.url;
    }
  }
  const formik = useFormik({
    initialValues,
    onSubmit: navigotor,
  });

  return (
    <div className="container my-5">
      <form
        className="row justify-content-center align-items-center"
        onSubmit={formik.handleSubmit}
      >
        <div className="form-floating mb-3">
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.details}
            name="details"
            type="text"
            className="form-control mb-2"
            id="Details"
            placeholder="details"
          />
          <label htmlFor="Details" className="ms-2">
            Details :
          </label>
        </div>

        <div className="form-floating mb-3">
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.phone}
            name="phone"
            type="number"
            className="form-control"
            id="phone"
            placeholder="Phone"
          />
          <label htmlFor="phone" className="ms-2">
            Phone:
          </label>
        </div>

        <div className="form-floating mb-3">
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.city}
            name="city"
            type="text"
            className="form-control"
            id="city"
            placeholder="City"
          />
          <label htmlFor="city" className="ms-2">
            City:
          </label>
        </div>

        <button className="btn btn-success w-25 ms-3 me-auto" type="submit">
          Pay Now
        </button>
      </form>
    </div>
  );
}
