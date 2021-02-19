import React, { useState, useEffect, useContext, useRef } from "react";
import { ServerContext } from "../Contexts/ServerContext";
import axios from "axios";
import { CustomerProfileContext } from "./CustomerProfileContext";
import { LoginSuccessContext } from "./LoginSuccessContext";

export const CartContext = React.createContext();

const CartProvider = (props) => {
  const cartInLocalStorage = localStorage.getItem("cartcontent");
  const savedCart = useRef(
    cartInLocalStorage ? JSON.parse(cartInLocalStorage) : []
  );
  const [cart, setCart] = useState(savedCart.current);
  const server = useContext(ServerContext);
  const [cartOrderItems, setCartOrderItems] = useState([]);
  const { customerProfile } = useContext(CustomerProfileContext);
  const {
    loggedIn,
    setLoggedIn,
    customerFK,
    setCustomerFK,
    loginWithJWTSuccess,
  } = useContext(LoginSuccessContext);
  const [firstFetchDone, setFirstFetchDone] = useState(false);

  /**
   * When a user  LOGGED IN , get saved cart from server
   */
  useEffect(() => {
    console.log("firstfetch : " + firstFetchDone + customerFK);
    if (loggedIn && !firstFetchDone && customerFK) {
      console.log(
        "<<<<<<<<<<<<<<<<<doin first fetch>>>>>>>>>>>>>>>>>>>>>>><<<<"
      );
      axios
        .get(`${server}/order/getSavedCartWithOrderContentList/${customerFK}`, {
          headers: {
            Authorization: localStorage.getItem("TokenJWT"),
          },
        })
        .then((res) => {
          console.log(res.data);
          localStorage.setItem(
            "cartcontent",
            JSON.stringify(res.data.orderContentList.orderContentList)
          );
          //savedCart.current = JSON.parse(localStorage.getItem("cartcontent"));
          setCart(res.data.orderContentList.orderContentList);
          setCartOrderItems(res.data.savedCart.orderItemList);
        })
        .catch((err) => console.log(err));
      console.log("SETTING FIRST FETCH DONE TRUE");
      setFirstFetchDone(true);
    }
  }, [customerFK]);

  /**
   * If a user logged in, save cart changes to database and get orderitems
   * otherwise, just get orderitems
   */
  console.log("token in cart" + localStorage.getItem("TokenJWT"));
  console.log("firstFetchDone: " + firstFetchDone + " loggedIn: " + loggedIn);

  useEffect(() => {
    if (firstFetchDone && loggedIn) {
      axios
        .post(
          `${server}/order/saveCart/${customerProfile.customerId}`,
          { orderContentList: cart },
          {
            headers: {
              Authorization: localStorage.getItem("TokenJWT"),
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => setCartOrderItems(res.data))
        .catch((err) => console.log(err));
    } else {
      if (cart.length > 0) {
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
      } else {
        setCartOrderItems([]);
      }
    }
  }, [cart, customerProfile]);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        savedCart,
        cartOrderItems,
        setCartOrderItems,
        firstFetchDone,
        setFirstFetchDone,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
