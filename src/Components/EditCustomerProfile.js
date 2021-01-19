import React, { useState, useContext, useEffect, useRef } from "react";
import { ServerContext } from "../Contexts/ServerContext";
import { LoginSuccessContext } from "../Contexts/LoginSuccessContext";
import { CustomerProfileContext } from "../Contexts/CustomerProfileContext";
import axios from "axios";
import EditSuccessModal from "./EditSuccessModal";

export const EditCustomerProfile = (props) => {
  const server = useContext(ServerContext);
  const [loggedIn, setLoggedIn] = useContext(LoginSuccessContext);
  const [
    customerProfile,
    userProfile,
    setCustomerProfile,
    setUserProfile,
  ] = useContext(CustomerProfileContext);

  const [name, setName] = useState();
  const [email, setEMail] = useState();
  const [username, setUserName] = useState();

  const [editProfileSuccess, setEditProfileSuccess] = useState(false);
  const [editUserSuccess, setEditUserSuccess] = useState(false);

  const userNameRef = useRef();

  useEffect(() => {
    setName(customerProfile.customerName);
    setEMail(customerProfile.customerEMail);
    setUserName(userProfile.userName);
  }, [customerProfile, userProfile]);

  function handleSubmit(e) {
    e.preventDefault();

    var currentUserName = userProfile.userName;
    const uProfile = {
      userId: userProfile.userId,
      password: userProfile.password,
      userName: username,
      customerFK: userProfile.customerFK,
    };

    var cProfile = customerProfile;
    cProfile.customerEMail = email;
    cProfile.customerName = name;

    //var cProfile = [...customerProfile];
    console.log(uProfile);
    console.log(cProfile);

    if (uProfile.userName !== currentUserName) {
      axios
        .post(`${server}/auth/updateUserReact`, uProfile, {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("TokenJWT"),
          },
        })
        .then((res) => {
          console.log("User updated: " + res);
          localStorage.removeItem("TokenJWT");
          setLoggedIn(false);

          setEditUserSuccess(true);
        })
        .catch((err) => {
          console.log("User update failed : " + err);
          userNameRef.current.className =
            "col-6 alert alert-danger mx-auto fw-normal fs-3 my-2 text-dark text-center";
          setEditUserSuccess(false);
        });
    } else {
      console.log("values equal");
      setEditUserSuccess(true);
    }

    axios
      .post(`${server}/customer/save`, cProfile, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("TokenJWT"),
        },
      })
      .then((res) => {
        console.log("Customer updated: " + res);
        setEditProfileSuccess(true);
      })
      .catch((err) => {
        console.log("Customer update failed : " + err);
      });
  }

  if (editUserSuccess && editProfileSuccess && loggedIn) {
    props.history.push("/profile");
  }

  //Customer name changed and logged out, new login required
  if (editUserSuccess && editProfileSuccess && !loggedIn) {
    // setCustomerProfile();
    return <EditSuccessModal isModalOpen={true} history={props.history} />;
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
        <div ref={userNameRef} className="visually-hidden" role="alert">
          User Name already exists! Select another one!
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
