import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link, useLocation } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import { Helmet } from "react-helmet";
import { CartContext } from "../CounterContext/CartContext";
import toast from "react-hot-toast";

export default function DisplayProduct() {
  const [toggleStates, setToggleStates] = useState([]);
  const location = useLocation();

  const {
    addToCart,
    addToFav,
    setCartCount,
    setfavCount,
    getLoggedUserFav,
    favCount,
    removeFavItem,
    favDetails,
    setFavtDetails,
  } = useContext(CartContext);

  useEffect(() => {
    // Load toggle states from sessionStorage when the component mounts
    const savedToggleStates =
      JSON.parse(sessionStorage.getItem("toggleStates")) || [];
    setToggleStates(savedToggleStates);
  }, []);

  async function removeFaveItem(id, index) {
    let { data } = await removeFavItem(id);
    setFavtDetails(data);
    setfavCount(data.data.length);

    // Update the toggle state for the specific product
    const newToggleStates = [...toggleStates];
    newToggleStates[index] = true;
    setToggleStates(newToggleStates);

    // Save updated toggle states to sessionStorage
    sessionStorage.setItem("toggleStates", JSON.stringify(newToggleStates));
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
    console.log('====================================');
    console.log(window.location.href);
    console.log('====================================');
  }

  async function addProductToFav(productId, index) {
    let response = await addToFav(productId);
    console.log("====================================");
    console.log(response?.data.data.length);

    // Update the toggle state for the specific product
    const newToggleStates = [...toggleStates];
    newToggleStates[index] = false;
    setToggleStates(newToggleStates);

    // Save updated toggle states to sessionStorage
    sessionStorage.setItem("toggleStates", JSON.stringify(newToggleStates));

    setfavCount(response?.data.data.length);
    console.log("====================================");
    console.log(favCount);
    console.log("====================================");
    if (response.data.status === "success") {
      toast.success("Successfully Added");
    } else {
      toast.error("This didn't work.");
    }
    console.log(response);
  }

  const [search, setSearch] = useState("");

  function getProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  let { data, isLoading } = useQuery("displayProducts", getProducts);

  // Initialize toggle states for all products
  useEffect(() => {
    if (data && data.data.data) {
      if (toggleStates.length !== data.data.data.length) {
        setToggleStates(Array(data.data.data.length).fill(true));
      }
    }
  }, [data, toggleStates]);

  // Restore toggle states when navigating back to the page
  useEffect(() => {
    const savedToggleStates =
      JSON.parse(sessionStorage.getItem("toggleStates")) || [];
    setToggleStates(savedToggleStates);
  }, [location]);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>FreshCart products</title>
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
            <div className="d-flex">
              {" "}
              <input
                type="text"
                onInput={(e) => setSearch(e.target.value.toLowerCase())}
                className="form-control mx-3 w-50 mx-auto"
                placeholder="product name..."
              />
            </div>

            <div className="row">
              {data?.data.data
                .filter((ex) => {
                  return search === ""
                    ? ex
                    : ex.title.toLowerCase().includes(search);
                })
                .map((product, index) => (
                  <div key={product.id} className="col-md-2">
                    <div className="product p-2">
                      {toggleStates[index] ? (
                        <button
                          onClick={() => addProductToFav(product.id, index)}
                          className="btn bg-main text-white my-2"
                        >
                          <i className="fas fa-heart"></i>
                        </button>
                      ) : (
                        <button
                          onClick={() => removeFaveItem(product.id, index)}
                          className="btn bg-danger text-white my-2"
                        >
                          <i className="fas fa-heart-broken"></i>
                        </button>
                      )}

                      <Link
                        to={`/ProductsDetails/${product.id}`}
                        onClick={() => {
                          window.scrollTo(0, 0);
                        }}
                      >
                        <img
                          className="w-100"
                          src={product.imageCover}
                          alt=""
                        />
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
          </div>
        </>
      )}
    </>
  );
}
