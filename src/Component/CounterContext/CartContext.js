import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext();

let userToken = localStorage.getItem("userToken");
let headers = {
  token: userToken,
};

function addToCart(productId) {
  return axios
    .post(
      "https://ecommerce.routemisr.com/api/v1/cart",
      {
        productId,
      },
      {
        headers,
      }
    )
    .then((response) => response)
    .catch((error) => error);
}

function addToFav(productId) {
  return axios
    .post(
      "https://route-ecommerce.onrender.com/api/v1/wishlist",
      {
        productId,
      },
      {
        headers,
      }
    )
    .then((response) => response)
    .catch((error) => error);
}

function getLoggedUserCart() {
  return axios
    .get("https://ecommerce.routemisr.com/api/v1/cart", {
      headers,
    })
    .then((response) => response)
    .catch((error) => error);
}

function getLoggedUserFav() {
  return axios
    .get("https://route-ecommerce.onrender.com/api/v1/wishlist", {
      headers,
    })
    .then((response) => response)
    .catch((error) => error);
}

function removeCartItem(productId) {
  return axios
    .delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,

      {
        headers,
      }
    )
    .then((response) => response)
    .catch((error) => error);
}

function removeFavItem(productId) {
  return axios
    .delete(
      `https://route-ecommerce.onrender.com/api/v1/wishlist/${productId}`,

      {
        headers,
      }
    )
    .then((response) => response)
    .catch((error) => error);
}

function updateProductQuantity(productId, count) {
  return axios
    .put(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      {
        count,
      },
      {
        headers,
      }
    )
    .then((response) => response)
    .catch((error) => error);
}



function clearCart() {
  return axios
    .delete(`https://ecommerce.routemisr.com/api/v1/cart/`, {
      headers,
    })
    .then((response) => response)
    .catch((error) => error);
}

export default function CartContextProvider(props) {
  const [ownerId, setOwnerId] = useState(null);
  const [id, setId] = useState(null);

  async function getCart() {
    let { data } = await getLoggedUserCart();
    setId(data?.data._id);
  }

  useEffect(() => {
    getCart();
  }, []);

  const [favDetails, setFavtDetails] = useState(null);
  const [cartCount, setCartCount] = useState();
  const [favCount, setfavCount] = useState();

  return (
    <CartContext.Provider
      value={{
        addToCart,
        getLoggedUserCart,
        removeCartItem,
        removeFavItem,
        updateProductQuantity,
        clearCart,
        cartCount,
        getLoggedUserFav,
        setCartCount,
        setfavCount,
        favCount,

        id,
        setOwnerId,
        ownerId,
        addToFav,
        favDetails,
        setFavtDetails,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
