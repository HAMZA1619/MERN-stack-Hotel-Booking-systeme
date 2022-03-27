import React from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import API from "../Api";
function Logout({ show, ClosePopup, access }) {
  const navigate = useNavigate();
  const logout = () => {
    API.post(`auth/signout`).then((res) => {
      if (res.status === 200) {
        access();
        ClosePopup();
        navigate("/");
      }
    });
  };
  return (
    <Modal show={show} onHide={ClosePopup} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>LOG OUT</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are You Sure You Want To Log Out ?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={ClosePopup}>
          Close
        </Button>
        <Button variant="primary" onClick={logout}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Logout;
