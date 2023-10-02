import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";

function Code() {
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Get the navigate function from React Router

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        values // Use the correct field name "resetCode" here
      );
      console.log("API Response:", response);

      console.log("====================================");
      console.log(response.data);
      console.log("====================================");

      if (response.data.status === "Success") {
        navigate("/reset"); // Navigate to '/reset' if email is sent successfully
      } else {
        setError("Reset code is invalid or has expired.");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    }
  };

  const formik = useFormik({
    initialValues: {
      resetCode: "", // Use the correct field name "resetCode" here
    },
    onSubmit: handleSubmit,
  });

  return (
    <div>
      <h2>Enter the code :</h2>
      {emailSent ? (
        <p className="text-success">Reset code sent to your email.</p>
      ) : (
        <form onSubmit={formik.handleSubmit}>
          <div className="form-floating mb-3">
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.resetCode}
              name="resetCode" // Use the correct field name "resetCode" here
              type="text"
              className="form-control mb-2"
              id="floatingPassword"
              placeholder="Code"
            />
            {formik.errors.resetCode && formik.touched.resetCode ? (
              <div className="alert alert-danger p-2">
                {formik.errors.resetCode}
              </div>
            ) : (
              ""
            )}
            <label htmlFor="floatingPassword">Code</label>
          </div>
          {error && <p className="text-danger">{error}</p>}

          <button className="btn btn-info text-white" type="submit">
            Reset Pass
          </button>
        </form>
      )}
    </div>
  );
}

export default Code;
