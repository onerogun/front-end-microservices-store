import React, { useState, useContext, useRef, useEffect } from "react";
import axios from "axios";
import "./Login.css";
import { ServerContext } from "../Contexts/ServerContext";
import LoginModal from "./LoginModal";
import { LoginSuccessContext } from "../Contexts/LoginSuccessContext";
import { Link } from "react-router-dom";

/*setCookie("token", response.headers.authorization, {
    path: "/",
    expires: new Date(2030, 1, 1)
})*/
// const [cookies, setCookie, removeCookie] = useCookies(["token"]);

export const Login = (props) => {
  const [userName, setUsername] = useState("");
  const [passWord, setPassword] = useState("");
  const server = useContext(ServerContext);
  const [loggedIn, setLoggedIn] = useContext(LoginSuccessContext);

  const [modalOpen, setModalOpen] = useState(false);

  const showErr = useRef();
  useEffect(() => {
    if (loggedIn) {
      console.log(loggedIn + " already logged in , redirecting!");
      setModalOpen(true);
      showErr.current.className = "visually-hidden";
    }
  }, [loggedIn]);

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
      },
    })
      .then((response) => {
        console.log("Login sent!");
        console.log(response.headers);
        localStorage.setItem("TokenJWT", response.headers.authorization);
        console.log(localStorage.getItem("TokenJWT"));
        setModalOpen(true);
        showErr.current.className = "visually-hidden";
        setLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
        showErr.current.className =
          "col-5 alert alert-danger mx-auto fw-normal fs-3 text-dark text-center";
      });
  };

  return (
    <div className="container mt-5 ">
      <div ref={showErr} className="visually-hidden" role="alert">
        Wrong username or password!
      </div>
      <form className="g-3 needs-validation " onSubmit={handleSubmit}>
        <div className="row ">
          <div className="col-md-3 mx-auto">
            <label className="form-label" for="username">
              Username or EMail
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
          <div className="col-md-3 mx-auto">
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
        <div className="row">
          <div className="col-md-3 d-grid gap-2 d-md-block mx-auto mt-2">
            <button
              className="btn btn-primary px-4"
              type="submit"
              disabled={!validateForm()}
            >
              Login
            </button>

            <Link
              className="btn btn-primary float-end px-4"
              to={`/signUp`}
              role="button"
            >
              Sign Up
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 mx-auto mt-2">
            <Link className="text-decoration-none" to="/passwordResetRequest">
              Forgot Password?
            </Link>
          </div>
        </div>
        <LoginModal isModalOpen={modalOpen} history={props.history} />
      </form>
    </div>
  );
};
