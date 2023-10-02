import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { CartContext } from "../CounterContext/CartContext";
import { ColorRing } from "react-loader-spinner";
import { Link } from "react-router-dom";

export default function Cart() {
  let {
    getLoggedUserCart,
    removeCartItem,
    updateProductQuantity,
    clearCart,
    setCartCount,
    setOwnerId,
    ownerId,
  } = useContext(CartContext);
  const [cartDetails, setCartDetails] = useState(null);

  async function getCart() {
    let { data } = await getLoggedUserCart();
    if (data?.status === "success") {
      setCartDetails(data);
      setCartCount(data.numOfCartItems);
      console.log(data.numOfCartItems);
      console.log(data);
      console.log('====================================');
      setOwnerId(data?.data.cartOwner)
      console.log(data?.data.cartOwner);
      console.log('====================================');
      
      localStorage.setItem('owner',data?.data.cartOwner)
      console.log(ownerId);
    }
  }
  
  async function removeItem(id) {
    let { data } = await removeCartItem(id);
    setCartDetails(data);
    setCartCount(data.numOfCartItems);
  }

  async function updateCount(id, count) {
    let { data } = await updateProductQuantity(id, count);
    setCartDetails(data);
    console.log('====================================');
    console.log(data?.status);
    console.log('====================================');
    // setCartCount(data.numOfCartItems);
  }

  async function deleteCart() {
    let { data } = await clearCart();
    setCartDetails(null);
    setCartCount(data.numOfCartItems);
  }

  useEffect(() => {
    getCart();
  },[]);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Cart </title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      {cartDetails ? (
        <div className="w-75 mx-auto p-3 my-3 bg-main-light">
          <h3 className="fw-bold h2">Shopping Cart</h3>
          <h4 className="fw-bolder text-main">
            Cart items:
            <span className="text-main"> {cartDetails.numOfCartItems} </span>
          </h4>
          <h4 className="fw-bolder mb-4 text-main">
            Total Cart Price: {cartDetails.data.totalCartPrice} LE
          </h4>
          {cartDetails.data.products.map((product) => (
            <div
              key={product.product.id}
              className="row align-items-center py-2 border-bottom "
            >
              <div className="col-md-1">
                <img
                  className="w-100"
                  src={product.product.imageCover}
                  alt={product.product.title}
                />
              </div>
              <div className="col-md-11 d-flex justify-content-between align-items-center ">
                <div className="fw-bolder">
                  <h3 className="title h6">
                    {product.product.title.split(" ").slice(0, 3).join(" ")}
                  </h3>
                  <p className="text-main ">Price: {product.price}</p>
                  <button
                    onClick={() => removeItem(product.product.id)}
                    className="btn btn-outline-danger btn-sm"
                  >
                    <i className="fas fa-trash-can"></i> remove
                  </button>
                </div>
                <div>
                  <button
                    onClick={() =>
                      updateCount(product.product.id, product.count + 1)
                    }
                    className="btn btn-outline-info btn-sm"
                  >
                    +
                  </button>
                  <span className="mx-3 fw-bolder text-main">
                    {product.count}
                  </span>
                  <button
                    onClick={() =>
                      product.count <= 1
                        ? removeItem(product.product.id)
                        : updateCount(product.product.id, product.count - 1)
                    }
                    className="btn btn-outline-danger btn-sm"
                  >
                    -
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="d-flex">
            <button
              onClick={() => deleteCart()}
              className="ms-auto btn btn-danger mt-3"
            >
              Clear Cart
            </button>
          </div>
          <Link className="ms-auto btn w-100 btn-success mt-3" to="/address">
            Check Out
          </Link>
        </div>
      ) : (
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
      )}
    </>
  );
}
