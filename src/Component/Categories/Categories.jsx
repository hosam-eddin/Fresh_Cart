import axios from "axios";
import React from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { Link } from 'react-router-dom';

export default function Categories() {
  function displayCate() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }

  let { data } = useQuery("CategorySlider", displayCate);
  console.log(data?.data.data);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Category</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <>
        {data?.data.data ? (
          <div className="row">
            {data?.data.data.map((category) => (
              <div className="col-md-4">
                <Link to={`/CategoriesDetails/${category._id}`}>
                <div className="product p-2 ">
                  <img
                    key={category._id}
                    src={category.image}
                    height={200}
                    alt={category.name}
                    className="w-100"
                  />
                  <p className="text-main fw-bolder pt-2">{category.name}</p>
                </div></Link>
              </div>
            ))}
          </div>
        ) : (
          ""
        )}
      </>
    </>
  );
}
