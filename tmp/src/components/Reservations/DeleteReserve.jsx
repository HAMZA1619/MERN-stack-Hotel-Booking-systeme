import React from "react";
import {Modal,Button  } from "react-bootstrap";
import API from "../../Api";

function DeleteReserve({showDelete,CloseDeletePopup,id}) {
    const deleteReserve = () => {
        API.delete(`reserves/${id}`).then((res) => {
          if (res.status === 200) {
            CloseDeletePopup();
          }
        });
    }
    return (
        <Modal show={showDelete} onHide={CloseDeletePopup} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>Delete A Reserve</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are You Sure You Want To Delete This Reserve ?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={CloseDeletePopup}>
              Close
            </Button>
            <Button variant="danger" onClick={deleteReserve}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
      )
}

export default DeleteReserve