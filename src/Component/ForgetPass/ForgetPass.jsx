import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";

function ForgotPass() {
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Get the navigate function from React Router

  const handleSubmit = async (value) => {
    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",

        value
      );

      console.log("====================================");
      console.log(response.data);
      console.log("====================================");

      if (response.data.statusMsg === "success") {
        setEmailSent(true);
        navigate("/code"); // Navigate to '/reset' if email is sent successfully
      } else {
        setError("Reset code is invalid or has expired.");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: handleSubmit,
  });

  return (
    <div>
      <h2>Forgot Password</h2>
      {emailSent ? (
        <p className="text-success">Reset code sent to your email.</p>
      ) : (
        <form onSubmit={formik.handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              className={`form-control mb-2 ${
                formik.touched.email && formik.errors.email ? "is-invalid" : ""
              }`}
              id="floatingInputEmail"
              placeholder="name@example.com"
            />
            <label htmlFor="floatingInputEmail">Email address</label>
            {formik.touched.email && formik.errors.email ? (
              <div className="invalid-feedback">{formik.errors.email}</div>
            ) : null}
          </div>
          {error && <p className="text-danger">{error}</p>}

          <button className="btn btn-info text-white" type="submit">
            Send Code
          </button>
        </form>
      )}
    </div>
  );
}

export default ForgotPass;
