import React, { useState, useContext, useEffect } from "react";
import { ServerContext } from "../Contexts/ServerContext";
import { CustomerProfileContext } from "./CustomerProfileContext";
import axios from "axios";

export const ManagedProductContext = React.createContext();

export const ManagedProductProvider = (props) => {
  const [myProducts, setMyProducts] = useState([]);
  const server = useContext(ServerContext);
  const [itemDeleted, setItemDeleted] = useState([]);

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
  }, [customerProfile, itemDeleted]);

  return (
    <ManagedProductContext.Provider
      value={{ myProducts, setMyProducts, setItemDeleted }}
    >
      {props.children}
    </ManagedProductContext.Provider>
  );
};
