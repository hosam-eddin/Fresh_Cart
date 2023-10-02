import React from "react";
import "./Home.css";
import FearturedProducts from "../FearturedProducts/FearturedProducts";
import CategorySlider from "../CategorySlider/CategorySlider";
import MainSlider from "../MainSlider/MainSlider";

export default function Home() {
  return (
    <>
      <MainSlider />
      <CategorySlider />
      <FearturedProducts />
    </>
  );
}
