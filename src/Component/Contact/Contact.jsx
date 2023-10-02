import React from "react";
import "./Contact.css"

export default function Contact() {
  return (
    <>
      <div classname="container">
        <h2
          className="textDark fw-bolder mt-3 fs-1 text-center"
          
        >
          CONATCT SECTION
        </h2>
        <div className=" d-flex justify-content-center align-items-center pb-5">
          <div className="lineDark me-3"></div>
          <i class="fa-solid fa-star textDark"></i>
          <div className="lineDark ms-3"></div>
        </div>
        <div className="Form w-50 m-auto py-5">

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="userName:"
            />
            <label htmlFor="floatingInput">userName:</label>
          </div>

          <div className="form-floating">
            <input
              type="number"
              className="form-control"
              id="floatingPassword"
              placeholder="urAge:"
            />
            <label htmlFor="floatingPassword">urAge:</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="userEmail:"
            />
            <label htmlFor="floatingInput">userEmail:</label>
          </div>

          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="userPassword:"
            />
            <label htmlFor="floatingPassword">userPassword:</label>
          </div>
          <button className="btn bgMain mt-5 text-white">  
            Send Message
          </button>
        </div>
      </div>
    </>
  );
}
