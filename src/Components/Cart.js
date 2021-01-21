import React, { useState, useContext } from "react";
import { CartContext } from "../Contexts/CartContext";

export const Cart = () => {
  const [cart, setCart] = useContext(CartContext);

  return (
    <div>
      {cart.map((item) => {
        return (
          <div key={item.itemId}>
            <p>ID:{item.itemId}</p>
            <p>Quantity:{item.quantity}</p>
          </div>
        );
      })}
    </div>
  );
};
