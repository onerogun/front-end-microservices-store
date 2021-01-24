import React, { useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { ServerContext } from "../Contexts/ServerContext";
import { Col, Container, Row } from "react-bootstrap";

export const CustomerSignUp = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setusername] = useState("");
  const [passw, setPassw] = useState("");
  const server = useContext(ServerContext);

  const [confirmpassw, setConfirmpassw] = useState("");
  const [match, setMatch] = useState(true);
  const [firstCompare, setFirstCompare] = useState(true);
  const [validated, setValidated] = useState(false);

  const compare = () => {
    if (passw !== confirmpassw) {
      setMatch((prev) => false);
    } else {
      setMatch((prev) => true);
    }
  };

  const custInfo = {
    customerName: name,
    customerEMail: email,
    userName: username,
    password: passw,
    roles: "PRIME_USER",
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;

    event.preventDefault();
    if (form.checkValidity() === false) {
      //    event.stopPropagation();
    } else {
      sendDatatoServer(custInfo);
    }
    setValidated((prev) => true);
  };

  const sendDatatoServer = (dataSend) => {
    axios({
      method: "post",
      url: `${server}/auth/saveCustomer`,
      data: dataSend,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log("info sent!");
        console.log(response.data);
        alert("Sign up successful!");
        props.history.push("/login");
      })
      .catch((err) => {
        console.log("error occured!");
        alert("Sign up unsuccessful!");
      });
  };

  const validateForm = () => {
    return (
      match === true &&
      name.length > 0 &&
      passw.length >= 6 &&
      email.length > 0 &&
      username.length > 0
    );
  };

  const PrintWarning = () => {
    return (
      <Form.Label className="text-danger">Passwords do not match!</Form.Label>
    );
  };

  const PrintWarning1 = () => {
    return (
      <Form.Label className="text-danger">
        Password needs to be 6 characters or longer!
      </Form.Label>
    );
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Col className="col-6 mx-auto">
            <Form.Group size="lg" controlId="customerName">
              <Form.Label>Name </Form.Label>
              <Form.Control
                autoFocus
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>EMail </Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col className="col-6 mx-auto">
            <Form.Group>
              <Form.Label>User Name </Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setusername(e.target.value)}
              />
            </Form.Group>

            <Row>
              <Col className="col-6 mx-auto">
                <Form.Group>
                  <Form.Label>Password </Form.Label>
                  <Form.Control
                    type="password"
                    value={passw}
                    onChange={(e) => setPassw(e.target.value)}
                    onBlur={(e) => {
                      if (!firstCompare) {
                        compare();
                      }
                    }}
                  />
                  {!firstCompare && match && passw.length < 6 ? (
                    <PrintWarning1 />
                  ) : null}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Confirm </Form.Label>
                  <Form.Control
                    type="password"
                    value={confirmpassw}
                    onChange={(e) => setConfirmpassw(e.target.value)}
                    onBlur={(e) => {
                      setFirstCompare((prev) => false);
                      compare();
                    }}
                  />
                  {match ? null : <PrintWarning />}
                </Form.Group>
              </Col>
            </Row>

            <Button
              block
              size="lg"
              type="submit"
              className="mt-2"
              disabled={!validateForm()}
            >
              Submit
            </Button>
          </Col>
        </Form>
      </Row>
    </Container>
  );
};
