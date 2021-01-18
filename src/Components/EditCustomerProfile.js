import React, { useState, useContext, useEffect } from "react";
import { ServerContext } from "../Contexts/ServerContext";
import { LoginSuccessContext } from "../Contexts/LoginSuccessContext";
import { CustomerProfileContext } from "../Contexts/CustomerProfileContext";
import axios from "axios";

export const EditCustomerProfile = () => {
  const server = useContext(ServerContext);
  const [loggedIn, setLoggedIn] = useContext(LoginSuccessContext);
  const [customerProfile, userProfile] = useContext(CustomerProfileContext);

  const [name, setName] = useState();
  const [email, setEMail] = useState();
  const [username, setUserName] = useState();

  useEffect(() => {
    setName(customerProfile.customerName);
    setEMail(customerProfile.customerEMail);
    setUserName(userProfile.userName);
  }, [customerProfile, userProfile]);

  function handleSubmit(e) {
    e.preventDefault();
    console.log(name);
    console.log(email);
    console.log(username);
    console.log(loggedIn);

    var uProfile = userProfile;
    uProfile.userName = username;

    var cProfile = customerProfile;
    cProfile.customerEMail = email;
    cProfile.customerName = name;

    //var cProfile = [...customerProfile];
    console.log(uProfile);
    console.log(cProfile);
  }

  return (
    <div className="container mt-5">
      <form noValidate onSubmit={handleSubmit}>
        <div className="row">
          <div className="col col-lg-6 col-md-8 col-sm-10 mx-auto">
            <label className="form-label">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="form-control"
            ></input>
          </div>
        </div>
        <div className="row">
          <div className="col col-lg-6 col-md-8 col-sm-10 mx-auto">
            <label className="form-label">E-Mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEMail(e.target.value)}
              className="form-control"
            ></input>
          </div>
        </div>
        <div className="row">
          <div className="col col-lg-6 col-md-8 col-sm-10 mx-auto">
            <label className="form-label">User Name</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              className="form-control"
            ></input>
          </div>
        </div>
        <div className="row">
          <div className="col col-lg-6 col-md-8 col-sm-10 mx-auto mt-3">
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
