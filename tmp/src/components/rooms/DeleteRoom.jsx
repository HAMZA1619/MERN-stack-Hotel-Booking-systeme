import React from "react";
import {Modal,Button  } from "react-bootstrap";
import API from "../../Api";

function DeleteRoom({showDelete,CloseDeletePopup,id}) {
    const deleteRoom = () => {
        API.delete(`rooms/${id}`).then((res) => {
          if (res.status === 200) {
            CloseDeletePopup();
          }
        });
    }
    return (
        <Modal show={showDelete} onHide={CloseDeletePopup} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>Delete A Room</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are You Sure You Want To Delete This Room ?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={CloseDeletePopup}>
              Close
            </Button>
            <Button variant="danger" onClick={deleteRoom}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
      )
}

export default DeleteRoom