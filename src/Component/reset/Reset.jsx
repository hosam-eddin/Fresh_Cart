import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";


function ForgotPass() {

  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Get the navigate function from React Router

  const handleSubmit = async (values) => {

      const response = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        {
          email: values.email,
          newPassword: values.newPassword,
        }
      );

      console.log("API Response:", response.data);

      if (response.data.statusMsg === "fail") {
        console.log("Password reset failed.");
        setError("Reset code is invalid or has expired.");
      } else {
        console.log("Password reset successful.");
        setEmailSent(true);
        navigate("/login"); // Navigate to '/login' if the password is successfully reset
      }

  };

  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      newPassword: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
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

          <div className="form-floating mb-3">
            <input
              type="password"
              name="newPassword"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              className={`form-control mb-2 ${
                formik.touched.newPassword && formik.errors.newPassword
                  ? "is-invalid"
                  : ""
              }`}
              id="floatingNewPassword"
              placeholder="New Password"
            />
            <label htmlFor="floatingNewPassword">New Password</label>
            {formik.touched.newPassword && formik.errors.newPassword ? (
              <div className="invalid-feedback">
                {formik.errors.newPassword}
              </div>
            ) : null}
          </div>

          {error && <p className="text-danger">{error}</p>}

          <button className="btn btn-info text-white" type="submit">
            submit
          </button>
        </form>
      )}
    </div>
  );
}

export default ForgotPass;
