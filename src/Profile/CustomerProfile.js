import React, { useState, useContext, useEffect } from "react";
import { ServerContext } from "../Contexts/ServerContext";
import { LoginSuccessContext } from "../Contexts/LoginSuccessContext";
import { CustomerProfileContext } from "../Contexts/CustomerProfileContext";
import { CartContext } from "../Contexts/CartContext";
import { ChatContext } from "../Contexts/ChatContext";
import { Client } from "@stomp/stompjs";

export const CustomerProfile = (props) => {
  const server = useContext(ServerContext);
  const {
    loggedIn,
    setLoggedIn,
    customerFK,
    setCustomerFK,
    loginWithJWTSuccess,
    setLoginWithJWTSuccess,
  } = useContext(LoginSuccessContext);
  const {
    customerProfile,
    userProfile,
    setCustomerProfile,
    setUserProfile,
  } = useContext(CustomerProfileContext);

  const {
    cart,
    setCart,
    savedCart,
    cartOrderItems,
    setCartOrderItems,
    firstFetchDone,
    setFirstFetchDone,
  } = useContext(CartContext);

  const {
    connected,
    subscribedTopics,
    chat,
    setChat,
    client,
    arr,
    setConnected,
    chatIndex,
    setChatIndex,
    setSubscribedTopics,
  } = useContext(ChatContext);

  function handleLogout() {
    localStorage.removeItem("TokenJWT");
    localStorage.removeItem("cartcontent");
    savedCart.current = [];
    setCustomerProfile([]);
    setUserProfile([]);
    setCart([]);
    setCartOrderItems([]);
    client.current = new Client();
    setConnected(false);
    setChatIndex(-1);
    arr.current = [];
    setChat([]);
    setSubscribedTopics([]);
    setCustomerFK(null);
    setFirstFetchDone(false);
    setLoggedIn(false);
    setLoginWithJWTSuccess(false);

    props.history.push("/");
  }
  console.log("render profile");
  return (
    <div className="container mt-5">
      <div className="row row-cols-1 ">
        <div className="col ">
          <p id="customerName">Name: {customerProfile.customerName}</p>
        </div>
        <div className="col">
          <p id="eMail">E-Mail: {customerProfile.customerEMail}</p>
        </div>
        <div className="col">
          <p id="username">User Name: {userProfile.userName}</p>
        </div>
        <div className="col">
          <p id="role">User Type: {userProfile.userRoles}</p>
        </div>
        <div className="col">
          <a className="btn btn-primary" href="/edit-profile" role="button">
            Edit
          </a>
          <button
            className="btn btn-primary ms-2"
            onClick={(e) => handleLogout()}
            type="button"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
