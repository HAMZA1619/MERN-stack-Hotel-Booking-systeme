import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import API from "../../Api";
function UpdateReserve({ CloseUpdatePopup, showUpdate, updatedReserve }) {
  const [newReserve, setnewReserve] = useState({});
  const handelChange = (e) => {
    setnewReserve({ ...newReserve, [e.target.name]: e.target.value });
  };

  const handelSubmit = () => {
    try {
      API.patch(`Reserves/${updatedReserve._id}`, newReserve).then(() => {
        CloseUpdatePopup();
      });
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      }
      console.log(error.message);
    }
  };
  return (
    <Modal
      show={showUpdate}
      onHide={CloseUpdatePopup}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Update A Reserve</Modal.Title>
      </Modal.Header>
      <form className="text-start">
        <Modal.Body>
          <div className="form-group">
            <label>Payment Type :</label>
            <select
              name="payment"
              className="form-control mt-2"
              onChange={handelChange}
            >
              <option value="Cash">Cash</option>
              <option value="Checks">Checks</option>
              <option value="Credit cards">Credit cards</option>
            </select>
          </div>
          <div className="form-group">
            <label>Date From :</label>
            <input
              type="date"
              onChange={handelChange}
              className="form-control mt-2"
              name="date_from"
              placeholder="Enter Reserve Number"
              required
            />
          </div>
          <div className="form-group">
            <label>Date To :</label>
            <input
              type="date"
              onChange={handelChange}
              className="form-control mt-2"
              name="date_to"
              placeholder="Enter Reserve price"
              required
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={CloseUpdatePopup}>
            Close
          </Button>
          <Button onClick={() => handelSubmit()} variant="success">
            Update
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}

export default UpdateReserve;
