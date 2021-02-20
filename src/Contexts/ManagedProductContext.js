import React, { useState, useContext, useEffect } from "react";
import { ServerContext } from "../Contexts/ServerContext";
import { CustomerProfileContext } from "./CustomerProfileContext";
import axios from "axios";

export const ManagedProductContext = React.createContext();

export const ManagedProductProvider = (props) => {
  const [myProducts, setMyProducts] = useState([]);
  const server = useContext(ServerContext);
  const [itemUpdate, setItemUpdate] = useState([]);

  const {
    customerProfile,
    userProfile,
    setCustomerProfile,
    setUserProfile,
  } = useContext(CustomerProfileContext);

  useEffect(() => {
    axios
      .get(`${server}/items/getUserItems/${customerProfile.customerId}`, {
        headers: {
          Authorization: localStorage.getItem("TokenJWT"),
        },
      })
      .then((res) => {
        console.log(res.data);
        setMyProducts(res.data);
      })
      .catch((err) => console.log(err));
  }, [customerProfile, itemUpdate]);

  return (
    <ManagedProductContext.Provider
      value={{ myProducts, itemUpdate, setItemUpdate }}
    >
      {props.children}
    </ManagedProductContext.Provider>
  );
};
