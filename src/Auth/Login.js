import React, { useState, useContext } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
import { ServerContext } from "../Contexts/ServerContext";
import { Link } from "react-router-dom";
//import { useCookies } from "react-cookie";
/*setCookie("token", response.headers.authorization, {
    path: "/",
    expires: new Date(2030, 1, 1)
})*/
// const [cookies, setCookie, removeCookie] = useCookies(["token"]);

export const Login = (props) => {
  const [userName, setUsername] = useState("");
  const [passWord, setPassword] = useState("");
  const server = useContext(ServerContext);

  function validateForm() {
    return userName.length > 0 && passWord.length > 0;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    axios({
      method: "post",
      url: `${server}/login`,
      data: {
        username: userName,
        password: passWord,
      },
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => {
        console.log("Login sent!");
        console.log(response.headers.authorization);
        localStorage.setItem("TokenJWT", response.headers.authorization);
        props.history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container mt-5 ">
      <form className="g-3 needs-validation " onSubmit={handleSubmit}>
        <div className="row ">
          <div className="col-md-4 mx-auto">
            <label className="form-label" for="username">
              Username
            </label>
            <input
              autoFocus
              id="username"
              className="form-control"
              type="text"
              value={userName}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 mx-auto">
            <label className="form-label" for="password">
              Password
            </label>
            <input
              id="password"
              className="form-control"
              type="password"
              value={passWord}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="row clearfix">
          <div className="col-md-4 mx-auto mt-2 float-star">
            <button
              className="btn btn-primary px-5"
              type="submit"
              disabled={!validateForm()}
            >
              Login
            </button>

            <a className="btn btn-primary mr-2 float-end px-5" href={`/signUp`} role="button">
              Sign Up
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};
