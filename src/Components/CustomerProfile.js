import React, { useState, useContext, useEffect } from "react";
import { ServerContext } from "../Contexts/ServerContext";
import { LoginSuccessContext } from "../Contexts/LoginSuccessContext";
import { CustomerProfileContext } from "../Contexts/CustomerProfileContext";
import axios from "axios";

export const CustomerProfile = (props) => {
  const server = useContext(ServerContext);
  const [loggedIn, setLoggedIn] = useContext(LoginSuccessContext);
  const [customerProfile, userProfile] = useContext(CustomerProfileContext);

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
          <a className="btn btn-primary" href="/edit-profile" role="button">
            Edit
          </a>
          <button
            className="btn btn-primary ms-2"
            onClick={(e) => {
              localStorage.removeItem("TokenJWT");
              sessionStorage.removeItem("custFK");
              setLoggedIn(false);
              props.history.push("/");
            }}
            type="button"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
