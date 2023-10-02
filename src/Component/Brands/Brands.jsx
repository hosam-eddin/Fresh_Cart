import axios from "axios";
import React from "react";
import { Helmet } from "react-helmet";
import { ColorRing } from "react-loader-spinner";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

export default function Brands() {
  function getBrands() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  }
  let { data, isLoading } = useQuery("displayBrands", getBrands);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Brands</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      {isLoading ? (
        <>
          <div className="d-flex justify-content-center align-items-center w-100 vh-100">
            <ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
            />
          </div>
        </>
      ) : (
        <>
          <div className="container pt-5">
            <div className="row g-3">
              {data?.data.data.map((brand) => (
                <div key={brand._id} className="col-md-2">
                  <Link to={`/BrandDetails/${brand._id}`}>
                    <div className="card product">
                      <img
                        className="card-img-top"
                        src={brand.image}
                        alt={brand.name}
                      />
                      <div className="card-body">
                        <h4 className="card-title text-center">{brand.name}</h4>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
