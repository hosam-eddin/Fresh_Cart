import axios from "axios";
import React, { useContext } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import Slider from "react-slick";
import { CartContext } from "../CounterContext/CartContext";
import toast from "react-hot-toast";

export default function ProductDetails() {
  const { addToCart, setCartCount } = useContext(CartContext);

  async function addProductToCart(productId) {
    let response = await addToCart(productId);
    if (response.data.status === "success") {
      toast.success("Successfully Added");
      setCartCount(response.data.numOfCartItems);
    } else {
      toast.error("This didn't work.");
    }
    console.log(response);
  }

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  let params = useParams();

  function getFeaturedProducts(id) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }
  let { data } = useQuery("ProductDetails", () =>
    getFeaturedProducts(params.id)
  );
  console.log(data?.data.data);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Product_Details</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      {data?.data.data ? (
        <div className=" container py-3">
          <div className="row justify-content-center align-items-center">
            <div className="col-md-4">
              <Slider {...settings} className="MainSlider">
                {data?.data.data.images.map((img) => (
                  <img
                    key={data?.data.data.id}
                    className="w-100"
                    src={img}
                    alt=""
                  ></img>
                ))}
              </Slider>

              <Slider {...settings} className="productSlides">
                  <img
                    key={data?.data.data.id}
                    className="w-100"
                    src={data?.data.data.imageCover}
                    alt=""
                  ></img>
              </Slider>
            </div>
            <div className="col-md-8">
              <h2 className="h6 fw-bolder">{data?.data.data.title}</h2>
              <p>{data?.data.data.description}</p>
              <p className="m-0 text-main fw-bolder ">
                {data?.data.data.category.name}
              </p>
              <p className="m-0 text-main fw-bolder ">
                Price: {data?.data.data.price} LE
              </p>
              <div className="d-flex justify-content-between align-items-center">
                <p className="m-0 fw-bolder ">
                  ratingsQuantity {data?.data.data.ratingsQuantity}
                </p>
                <span>
                  {data?.data.data.ratingsAverage}
                  <i className="fas fa-star rating-color"></i>
                </span>
              </div>
              <button
                onClick={() => addProductToCart(data?.data.data.id)}
                className="btn btn-success w-100 my-3"
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
