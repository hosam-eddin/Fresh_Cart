import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MagnifyingGlass } from "react-loader-spinner";
import { Helmet } from "react-helmet";

<MagnifyingGlass
  visible={true}
  height="80"
  width="80"
  ariaLabel="MagnifyingGlass-loading"
  wrapperStyle={{}}
  wrapperClass="MagnifyingGlass-wrapper"
  glassColor="#c0efff"
  color="#e15b64"
/>;

export default function Register() {
  let navigate = useNavigate();

  const [error, setError] = useState(null);

  //spinner
  const [isloading, setIsloading] = useState(false);

  async function submitRegister(values) {
    setIsloading(true);
    let { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .catch((err) => {
        setIsloading(false);
        setError(err.response.data.message);
      });

    if (data.message === "success") {
      setIsloading(false);
      navigate("/login");
    }
  }

  const phoneRegExp = /^(01\d{9})$/;
  let validateScheme = Yup.object({
    name: Yup.string()
      .min(3, "Name min is 3")
      .max(10, "Name max is 10")
      .required("Name is required"),
    email: Yup.string()
      .email("Email must be valid")
      .required("Email is required"),
    phone: Yup.string().matches(
      phoneRegExp,
      "Phone number is not valid OR must start with : 01"
    ),
    password: Yup.string()
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords do not match")
      .required("Password confirmation is required"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      rePassword: "",
    },
    validationSchema: validateScheme,
    onSubmit: submitRegister,
  });

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Register</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      ;
      <form className="w-75 m-auto my-5 " onSubmit={formik.handleSubmit}>
        {error ? <div className="alert alert-danger">{error}</div> : ""}

        <h3 className="mb-4">Register now</h3>

        <div className="form-floating mb-3">
          <input
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="name"
            type="text"
            className="form-control mb-2"
            id="floatingInputName"
            placeholder="hosam"
          />
          {formik.errors.name && formik.touched.name ? (
            <div className="alert alert-danger p-2">{formik.errors.name}</div>
          ) : (
            ""
          )}
          <label htmlFor="floatingInputName">Name</label>
        </div>

        <div className="form-floating mb-3">
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
            name="email"
            type="email"
            className="form-control mb-2"
            id="floatingInputEmail"
            placeholder="name@example.com"
          />
          {formik.errors.email && formik.touched.email ? (
            <div className="alert alert-danger p-2">{formik.errors.email}</div>
          ) : (
            ""
          )}
          <label htmlFor="floatingInputEmail">Email address</label>
        </div>

        <div className="form-floating mb-3">
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.phone}
            name="phone"
            type="tel"
            className="form-control mb-2"
            id="floatingInputPhone"
            placeholder="0110 250 7988"
          />
          {formik.errors.phone && formik.touched.phone ? (
            <div className="alert alert-danger p-2">{formik.errors.phone}</div>
          ) : (
            ""
          )}
          <label htmlFor="floatingInputPhone">Phone</label>
        </div>

        <div className="form-floating mb-3">
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.password}
            name="password"
            type="password"
            className="form-control mb-2"
            id="floatingPassword"
            placeholder="password"
          />
          {formik.errors.password && formik.touched.password ? (
            <div className="alert alert-danger p-2">
              {formik.errors.password}
            </div>
          ) : (
            ""
          )}
          <label htmlFor="floatingPassword">Password</label>
        </div>

        <div className="form-floating mb-3">
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.rePassword}
            name="rePassword"
            type="password"
            className="form-control mb-2"
            id="floatingPassword"
            placeholder="password"
          />
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div className="alert alert-danger p-2">
              {formik.errors.rePassword}
            </div>
          ) : (
            ""
          )}
          <label htmlFor="floatingPassword">rePassword</label>
        </div>

        {isloading ? (
          <button type="button" className="btn btn-success text-white m-2">
            <MagnifyingGlass
              visible={true}
              height="80"
              width="80"
              ariaLabel="MagnifyingGlass-loading"
              wrapperStyle={{}}
              wrapperClass="MagnifyingGlass-wrapper"
              glassColor="#c0efff"
              color="#e15b64"
            />
          </button>
        ) : (
          <button
            disabled={!(formik.isValid && formik.dirty)}
            type="submit"
            className="btn btn-success text-white m-2"
          >
            Register
          </button>
        )}
        {/* <button
          disabled={!(formik.isValid && formik.dirty)}
          type="submit"
          className="btn bg-main text-white mt-2"
        >
          Register
        </button>

        <button type="button" className="btn bg-main text-white mt-2">
          <i className="fas fa-spinner fa-spin"></i>
        </button> */}
      </form>
    </>
  );
}
