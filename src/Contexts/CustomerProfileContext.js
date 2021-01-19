import React, { useState, useContext, useEffect } from "react";
import { ServerContext } from "../Contexts/ServerContext";
import axios from "axios";
import { LoginSuccessContext } from "../Contexts/LoginSuccessContext";

export const CustomerProfileContext = React.createContext();

export const CustomerProfileProvider = (props) => {
  const server = useContext(ServerContext);
  const [customerProfile, setCustomerProfile] = useState([]);
  const [userProfile, setUserProfile] = useState([]);
  const [loggedIn, setLoggedIn] = useContext(LoginSuccessContext);

  useEffect(() => {
    fetchUserProfile();
  }, [loggedIn]);

  /**
   * First get customer profile from customer-service , then get user profile using foreign key in
   *  returned customer object
   */
  const fetchUserProfile = (props) => {
    if (sessionStorage.getItem("custFK")) {
      axios
        .get(`${server}/customer/${sessionStorage.getItem("custFK")}`)
        .then((res) => {

          axios
            .get(`${server}/auth/getUser/${res.data.userFK}`, {
              headers: {
                Authorization: localStorage.getItem("TokenJWT"),
              },
            })
            .then((response) => {
              setUserProfile(response.data);
            });

          setCustomerProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <CustomerProfileContext.Provider
      value={[customerProfile, userProfile, setCustomerProfile, setUserProfile]}
    >
      {props.children}
    </CustomerProfileContext.Provider>
  );
};