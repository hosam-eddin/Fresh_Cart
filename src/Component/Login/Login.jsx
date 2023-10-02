import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { MagnifyingGlass } from "react-loader-spinner";
import { UserContext } from "../CounterContext/UserContext";
import { Helmet } from "react-helmet";

export default function Login() {
  let { setUserToken ,setUserData} = useContext(UserContext);
  let navigate = useNavigate();

  const [error, setError] = useState(null);

  //spinner
  const [isloading, setIsloading] = useState(false);

  async function submitLogin(values) {
    setIsloading(true);
    let { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .catch((err) => {
        setIsloading(false);
        setError(err.response.data.message);
        console.log('====================================');
        console.log(data);
        console.log('====================================');
      });

    if (data.message === "success") {
      setIsloading(false);
      localStorage.setItem("userToken", data.token);
      setUserToken(data);
      setUserData(data.user)
      console.log('====================================');
      console.log(data.user);
      console.log('====================================');
      navigate("/");
    }
  }

  let validationSchema = Yup.object({
    email: Yup.string()
      .email("Email must be valid")
      .required("Email is required"),

    password: Yup.string()
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: submitLogin,
  });

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>LogIn</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <form className="w-75 m-auto my-5" onSubmit={formik.handleSubmit}>
        {error ? <div className="alert alert-danger">{error}</div> : ""}

        <h3 className="mb-4">Login now</h3>

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
        <Link className="" to={'/forget'}>Forget Password ?</Link>

        {isloading ? (
          <button type="button" className="btn text-white m-2">
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
          <div className=" d-flex align-items-center">
            <button
              disabled={!(formik.isValid && formik.dirty)}
              type="submit"
              className="btn btn-success text-white m-2"
            >
              Login
            </button>
            <Link className="btn btn-info text-white m-2" to={"/register"}>
              {" "}
              Register
            </Link>
          </div>
        )}
      </form>
    </>
  );
}
