import React, { useContext, useEffect } from "react";
import { useFormik } from "formik";
import { CartContext } from "../CounterContext/CartContext";

export default function Address() {
  let { onlinePayment, id } = useContext(CartContext);

  const initialValues = {
    details: "",
    phone: "",
    city: "",
  };

  async function handleAddressSubmit(values) {
    console.log("Form Values:", values);
    try {
      let res = await onlinePayment(id, "http://localhost:3000", values);
      console.log("Payment Response:", res);
      if (res?.data?.session?.url) {
        console.log("Payment URL:", res.data.session.url);
        window.location.href = res.data.session.url;
      } else {
        console.error("Payment URL is undefined in the response.");
        // Handle the error or show a message to the user.
      }
    } catch (error) {
      console.error("Payment Error:", error);
      // Handle the error or show a message to the user.
    }
  }
  
  const formik = useFormik({
    initialValues,
    onSubmit: handleAddressSubmit
    
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
