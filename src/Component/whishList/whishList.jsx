import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../CounterContext/CartContext";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const WhishList = () => {


  const { getLoggedUserFav, setfavCount,favCount ,addToCart,setCartCount,setFavtDetails,favDetails} = useContext(CartContext);

  async function getFav() {
    let { data } = await getLoggedUserFav();
    if (data?.status === "success") {
      setFavtDetails(data.data); 
      setfavCount(data.count);
      console.log('====================================');
      console.log(data.count);
      console.log('====================================');
      console.log("====================================");
      console.log(favCount);
      console.log("====================================");
    }
  }

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

  useEffect(() => {
    getFav();
  }, []);

  return (
    <>
      {favDetails ? (
        <div className="row justify-content-center">
          {favDetails.map((product) => (
            <div key={product.id} className="col-md-2">
              <div className="product p-2">
                <button className="btn bg-main text-white my-2">
                  <i className="fas fa-heart"></i>
                </button>
                <Link
                  to={`/ProductsDetails/${product.id}`}
                  onClick={() => {
                    window.scrollTo(0, 0);
                  }}
                >
                  <img className="w-100" src={product.imageCover} alt="" />
                  <span className="font-sm text-main">
                    {product.category.name}
                  </span>
                  <h3 className="h6">
                    {product.title.split(" ").slice(0, 2).join(" ")}
                  </h3>
                  <div className="d-flex justify-content-between">
                    <span>{product.price}EGP</span>
                    <span>
                      {product.ratingsAverage}
                      <i className="fas fa-star rating-color"></i>
                    </span>
                  </div>
                </Link>
                <button
                  onClick={() => addProductToCart(product.id)}
                  className="btn w-100 bg-main text-white my-2"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        ""
      )}{" "}
    </>
  );
};

export default WhishList;
