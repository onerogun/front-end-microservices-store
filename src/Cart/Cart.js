import React, { useState, useContext, useEffect } from "react";
import { CartContext } from "../Contexts/CartContext";
import { ProductCoverImage } from "../Images/ProductCoverImage";
import { CustomerProfileContext } from "../Contexts/CustomerProfileContext";
import { ServerContext } from "../Contexts/ServerContext";
import axios from "axios";
import { LoginSuccessContext } from "../Contexts/LoginSuccessContext";

export const Cart = (props) => {
  const { cart, setCart, savedCart, cartOrderItems } = useContext(CartContext);
  const [taxRate, setTaxRate] = useState(10);
  const { customerProfile } = useContext(CustomerProfileContext);
  const server = useContext(ServerContext);
  const { loggedIn } = useContext(LoginSuccessContext);

  function calculateSubtotal() {
    if (cartOrderItems) {
      const total = cartOrderItems.reduce((acc, orderitem) => {
        return (
          acc + orderitem.orderItemPrice * orderitem.orderItemAmountOrdered
        );
      }, 0);
      return total;
    }
  }

  function calculateTotal() {
    var subtotal = calculateSubtotal();
    return subtotal + subtotal * (taxRate / 100);
  }

  function handleRemove(itemId) {
    savedCart.current = savedCart.current.filter(
      (order) => order.itemId !== itemId
    );
    localStorage.setItem("cartcontent", JSON.stringify(savedCart.current));
    setCart(savedCart.current);
  }

  function handlePlaceOrder() {
    if (!loggedIn) {
      props.history.push("/login");
    } else {
      if (customerProfile && cart) {
        console.log(cart);
        axios
          .post(
            `${server}/order/${customerProfile.customerId}/placeOrder`,
            { orderContentList: cart },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("TokenJWT"),
              },
            }
          )
          .then((res) => {
            console.log(res);
            savedCart.current = null;
            localStorage.removeItem("cartcontent");
            setCart([]);
            props.history.push("/orders");
          })
          .catch((err) => console.log(err));
      }
    }
  }

  /*
"orderItemAmountOrdered":4,
"orderItemItemId":75,
"orderItemPrice":12.34,
"orderItemName":"PR3",


*/

  return (
    <div className="container">
      <div className="row my-2">
        <div className="col-4"></div>
        <div className="col-3"></div>
        <div className="col-3">
          <span>Price</span>
        </div>
        <hr />
      </div>
      {cartOrderItems.map((orderitem) => {
        return (
          <div className="row" key={orderitem.orderItemItemId}>
            <div className="col-4">
              <ProductCoverImage itemId={orderitem.orderItemItemId} />
            </div>
            <div className="col-3 my-auto">
              Quantity: {orderitem.orderItemAmountOrdered}
            </div>
            <div className="col-3 my-auto">
              <span>{orderitem.orderItemPrice}</span>
            </div>
            <div className="col-1 my-auto">
              <button
                type="button"
                onClick={(e) => handleRemove(orderitem.orderItemItemId)}
              >
                Remove
              </button>
            </div>
            <hr className="my-3" />
          </div>
        );
      })}
      <div className="row">
        <div className="col-4"></div>
        <div className="col-3"></div>
        <div className="col-3">
          <h4>Subtotal: $ {calculateSubtotal().toFixed(2)}</h4>
          <h4>Tax: $ {(calculateSubtotal() * (taxRate / 100)).toFixed(2)}</h4>
          <h4>Total: $ {calculateTotal().toFixed(2)}</h4>
        </div>
        <div className="col-2  my-auto">
          <button
            className="btn btn-primary"
            type="button"
            onClick={handlePlaceOrder}
            disabled={cartOrderItems.length < 1}
          >
            Place Order
          </button>
        </div>
        <hr />
      </div>
    </div>
  );
};
