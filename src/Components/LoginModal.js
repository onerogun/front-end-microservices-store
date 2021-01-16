import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { withRouter } from "react-router-dom";

function LoginModal({ history, isModalOpen }) {
  const [isOpen, setIsOpen] = useState(false);
  const [timer, setTimer] = useState(3);
  const [title, setTitle] = useState("Login successful...");

  useEffect(() => {
    setIsOpen(isModalOpen);
  }, [isModalOpen]);

  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  const modalLoaded = () => {
    setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    setTimeout(() => {
      history.push("/");
    }, 3000);
  };

  return (
    <>
      <Modal show={isOpen} onHide={hideModal} onEntered={modalLoaded}>
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Redirecting... {timer}</Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}

export default withRouter(LoginModal);
