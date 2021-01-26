import React, { useState, useContext, useEffect } from "react";
import { ServerContext } from "../Contexts/ServerContext";
import axios from "axios";
import { LoginSuccessContext } from "../Contexts/LoginSuccessContext";

export const CustomerProfileContext = React.createContext();

export const CustomerProfileProvider = (props) => {
  const server = useContext(ServerContext);
  const [customerProfile, setCustomerProfile] = useState([]);
  const [userProfile, setUserProfile] = useState([]);

 // user: {"userId":50,"userName":"zz","userEMail":"zz@z.c","customerFK":36,"userRoles":"ADMIN"}

  const [
    loggedIn,
    setLoggedIn,
    customerFK,
    setCustomerFK,
    loginWithJWTSuccess,
  ] = useContext(LoginSuccessContext);

  useEffect(() => {
    fetchUserProfile();
  }, [loginWithJWTSuccess]);

  /**
   * First get customer profile from customer-service , then get user profile using foreign key in
   *  returned customer object
   */
  const fetchUserProfile = () => {
    console.log("fetching profile");
    if (customerFK) {
      axios
        .get(`${server}/customer/getCustomer/${customerFK}`, {
          headers: {
            Authorization: localStorage.getItem("TokenJWT"),
          },
        })
        .then((res) => {
          axios
            .get(`${server}/auth/getUser/${res.data.userFK}`, {
              headers: {
                Authorization: localStorage.getItem("TokenJWT"),
              },
            })
            .then((response) => {
              console.log("user: " + JSON.stringify(response.data));
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
