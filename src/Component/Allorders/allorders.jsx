import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Orders() {
  const [orders, setOrders] = useState(null);


  const fetchOrders = async (id) => {
    try {
      const response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`
        );
        setOrders(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    useEffect(() => {

    fetchOrders(localStorage.getItem('owner'));
  }, []);

  return (
    <div>
      <h1>All Orders</h1>
      {orders?.map((order) => (
        <div key={order._id} className="order-item mb-5">
          <div>
            {order.cartItems.map((cartItem, index) => (
              <div
                key={index}
                className="row justify-content-between align-items-center bg-main-light p-4 border-bottom border"
              >
                <div className="col-md-4 d-flex ">
                  <img
                    src={cartItem.product.imageCover}
                    className="w-25 me-3"
                    alt={`Product ${index}`}
                  />
                  <div className="text-main fw-bolder row align-items-center ">
                    <p>Name : {cartItem.product.title}</p>
                    <p>Count : {cartItem.count}</p>
                    <p>Price : {cartItem.price} LE</p>
                  </div>
                </div>

                <div className="col-md-4 rounded-2 border border-black p-3">
                  <h5 className="">
                    is Delivered:{" "}
                    <span className="bg-danger pb-1 px-2 text-white rounded">
                      {order.isDelivered ? "yes" : "no"}
                    </span>
                  </h5>
                  <h5 className="">
                    is Paid:{" "}
                    <span className="bg-success pb-1 px-2 text-white rounded">
                      {order.isPaid ? "yes" : "no"}
                    </span>
                  </h5>
                  <h5>Payment Method : {order.paymentMethodType}</h5>
                </div>
              </div>
            ))}
          </div>
          <h5 className=" bg-success p-2 text-center text-white fw-bold ">
            TotalPrice : {order.totalOrderPrice} LE
          </h5>
        </div>
      ))}
    </div>
  );
}
