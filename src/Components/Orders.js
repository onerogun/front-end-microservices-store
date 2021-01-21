import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ServerContext } from "../Contexts/ServerContext";
import { CustomerProfileContext } from "../Contexts/CustomerProfileContext";

export const Orders = () => {
  const server = useContext(ServerContext);
  const [customerProfile] = useContext(CustomerProfileContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    FetchOrders();
  }, []);

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

  if (!orders) {
    return null;
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
          <div className="row bg-danger my-3" key={order.orderId}>
            <div className="col-12">
              <p>Order Placed: {dateObj(order.orderTime)}</p>
              <p>Total: $ {order.orderTotal}</p>
              <hr />
            </div>

            <div className="col">
              {order.orderItems.map((orderItem) => {
                return (
                  <div className="row" key={orderItem.orderItemId}>
                    <div className="col-2">
                      <p> {orderItem.orderItemAmountOrdered} </p>
                    </div>
                    <div className="col-2">
                      <p> {orderItem.orderItemCategory}</p>
                    </div>
                    <div className="col-2">
                      <p> {orderItem.orderItemItemId}</p>
                    </div>
                    <div className="col-2">
                      <p> {orderItem.orderItemName}</p>
                    </div>
                    <div className="col-2">
                      <p>{orderItem.orderItemPrice}</p>
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
