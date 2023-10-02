import axios from "axios";
import React from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

export default function BrandsDetails() {
  let params = useParams();
  console.log(params);
  function getFeaturedProducts(Brand_id) {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/brands/${Brand_id}`
    );
  }
  let { data } = useQuery("BrandDetails", () =>
    getFeaturedProducts(params.id)
  );
  console.log(data?.data.data);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Brand_Details</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="container">
        <div className="row align-items-center">
            <div className="col-md-8">
                <img src={data?.data.data.image} alt={data?.data.data.name} />
            </div>
            <div className="col-md-4">
                <h3 className="h1 fw-bolder"> {data?.data.data.name} </h3>
            </div>

        </div>
      </div>
    </>
  );
}
