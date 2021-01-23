import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ServerContext } from "../Contexts/ServerContext";
import { CustomerProfileContext } from "../Contexts/CustomerProfileContext";
import { LoginSuccessContext } from "../Contexts/LoginSuccessContext";

export const Orders = () => {
  const server = useContext(ServerContext);
  const [customerProfile] = useContext(CustomerProfileContext);
  const [orders, setOrders] = useState([]);
  const [loggedIn, setLoggedIn] = useContext(LoginSuccessContext);

  useEffect(() => {
    if (loggedIn && customerProfile.customerId) {
      FetchOrders();
    } else {
      setOrders([]);
    }
  }, [customerProfile]);

  console.log(customerProfile);
  const FetchOrders = () => {
    if (customerProfile) {
      console.log("fetching");
      axios
        .get(`${server}/order/${customerProfile.customerId}/getOrderList`)
        .then((res) => {
          console.log(res.data);
          setOrders(res.data);
        })
        .catch((err) => console.log(err));
    }
  };

  if (!loggedIn) {
    return (
      <div className="container">
        <p>Loing to see your orders!</p>
      </div>
    );
  }

  if (orders.length < 1) {
    return (
      <div className="container">
        <p>You don't have any orders!</p>
      </div>
    );
  }

  function dateObj(time) {
    const secs = Date.parse(time);
    const date = new Date(secs);
    return date.toLocaleString();
  }

  return (
    <div className="container mt-3">
      {orders.map((order) => {
        return (
          <div className="row border border-danger my-3" key={order.orderId}>
            <div className="col-6">
              <p>Order Placed: {dateObj(order.orderTime)}</p>
            </div>
            <div className="col-6">
              <p>Total: $ {order.orderTotal}</p>
            </div>
            <hr />
            <div className="col">
              <div className="row">
                <div className="col-2">
                  <p> Item Name</p>
                </div>
                <div className="col-2">
                  <p>Price</p>
                </div>
                <div className="col-2">
                  <p>Quantity</p>
                </div>
                <div className="col-2">
                  <p>Item id</p>
                </div>
              </div>

              <hr />
              {order.orderItems.map((orderItem) => {
                return (
                  <div className="row" key={orderItem.orderItemId}>
                    <div className="col-2">
                      <p> {orderItem.orderItemName}</p>
                    </div>
                    <div className="col-2">
                      <p>{orderItem.orderItemPrice}</p>
                    </div>
                    <div className="col-2">
                      <p> {orderItem.orderItemAmountOrdered} </p>
                    </div>
                    <div className="col-2">
                      <p> {orderItem.orderItemItemId}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
