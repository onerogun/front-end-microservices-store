import React, { useState, useContext, useEffect } from "react";
import { ServerContext } from "../Contexts/ServerContext";
import axios from "axios";

export const LoginSuccessContext = React.createContext();

export const LoginSuccessProvider = (props) => {
  const server = useContext(ServerContext);
  const [loggedIn, setLoggedIn] = useState(false);
  const [customerFK, setCustomerFK] = useState(-1);

  useEffect(() => {
    checkAuthorization();
  }, []);

  const checkAuthorization = () => {
    axios
      .get(`${server}/auth/checkJWT`, {
        headers: {
          Authorization: localStorage.getItem("TokenJWT"),
        },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log("logged in");

          var FK = res.headers.cookie.replace("custFK=", "");
          console.log("FK: " + FK);
          sessionStorage.setItem("custFK", FK);
          setCustomerFK(FK);
          setLoggedIn(true);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <LoginSuccessContext.Provider value={[loggedIn, setLoggedIn]}>
      {props.children}
    </LoginSuccessContext.Provider>
  );
};
