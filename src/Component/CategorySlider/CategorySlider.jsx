import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import Slider from "react-slick";
import "./CategorySlider.module.css";

export default function CategorySlider() {
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    swipeToSlide: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };

  function displayCate() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }

  let { data } = useQuery("CategorySlider", displayCate);
  console.log(data?.data.data);
  return (
    <>
      {data?.data.data ? (
        <Slider {...settings}>
          {data?.data.data.map((category) => (
            <img
              key={category._id}
              src={category.image}
              height={200}
              alt={category.name}
              className="w-100"
            />
          ))}
        </Slider>
      ) : (
        ""
      )}
    </>
  );
}
