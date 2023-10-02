import React from "react";

import Slider from "react-slick";
import imgS1 from "../assets/images/slider-image-1.jpeg";
import imgS2 from "../assets/images/slider-image-2.jpeg";
import imgS3 from "../assets/images/slider-image-3.jpeg";
import blog1 from "../assets/images/blog-img-1.jpeg";
import blog2 from "../assets/images/blog-img-2.jpeg";

export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false
  };

  return (
    <div >
      <div className="row gx-0 mb-5">
        <div className="col-md-9 col-sm-12">
          <Slider {...settings}>
            <img className="w-100" height={400} src={imgS1} alt="" />
            <img className="w-100" src={imgS2} height={400} alt="" />
            <img className="w-100" src={imgS3} alt="" height={400} />
          </Slider>
        </div>
        <div className="col-md-3 col-sm-12" >
          <img className="w-100" src={blog2} alt="" height={200} />
          <img className="w-100" src={blog1} height={200} alt="" />
        </div>
      </div>
    </div>
  );
}
