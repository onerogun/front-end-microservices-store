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
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={userName}
            onChange={(e) => setUsername((prev) => e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            autoFocus
            type="password"
            value={passWord}
            onChange={(e) => setPassword((prev) => e.target.value)}
          />
        </Form.Group>
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>
        <Link to="/signUp" className="m-5">
          <Button block size="lg">
            Sign Up
          </Button>
        </Link>
      </Form>
    </div>
  );
};
