import React, { useState, useEffect, useContext, useRef } from "react";
import { ServerContext } from "../Contexts/ServerContext";
import axios from "axios";
import { CustomerProfileContext } from "./CustomerProfileContext";

export const CartContext = React.createContext();

const CartProvider = (props) => {
  const cartInLocalStorage = localStorage.getItem("cartcontent");
  const savedCart = useRef(
    cartInLocalStorage ? JSON.parse(cartInLocalStorage) : []
  );
  const [cart, setCart] = useState(savedCart.current);
  const server = useContext(ServerContext);
  const [cartOrderItems, setCartOrderItems] = useState([]);
  const [customerProfile] = useContext(CustomerProfileContext);

  useEffect(() => {
    var custId;
    if (!customerProfile) {
      custId = null;
    }
    if (cart) {
      console.log(cart);
      axios
        .post(
          `${server}/order/getCartDetails`,
          { orderContentList: cart },
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => setCartOrderItems(res.data))
        .catch((err) => console.log(err));
    }
  }, [cart]);

  
  return (
    <CartContext.Provider value={[cart, setCart, savedCart, cartOrderItems]}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
