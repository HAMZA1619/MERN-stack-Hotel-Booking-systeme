import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import API from "../../Api";
function AddReserve({ showAdd, CloseAddPopup, hotels, Client, role }) {
  const [reserve, setReserve] = useState({});
  const [rooms, setRooms] = useState([]);
  const [clients, setClients] = useState([]);
  const [selectedRoom, setselectedRoom] = useState([]);

  const handelChange = (e) => {
    e.preventDefault();
    setReserve({ ...reserve, [e.target.name]: e.target.value });
  };
 
  useEffect(() => {
    if(role==='client'){
      setReserve({...reserve,client:Client})
    }
    API.get("rooms").then((res) => {
      setRooms(res.data);
    });
    API.get("users").then((res) => {
      res.data.forEach((client) => {
        if (client?.role === "client") {
          setClients((prev) => {
            return [...prev, client];
          });
        }
      });
    });
  }, []);
  const handelHotel = (e) => {
    e.preventDefault();
    setselectedRoom([]);
    rooms.forEach((Rooms) => {
      if (e.target.value === Rooms.hotel._id) {
        setselectedRoom((prev) => {
          return [...prev, Rooms];
        });
      }
    });
  };
  const handelSubmit = () => {
    try {
      API.post(`reserves`, reserve).then(() => {
        CloseAddPopup();
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
      show={showAdd}
      onHide={CloseAddPopup}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Add A Reserve</Modal.Title>
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
          {role !== "client" && (
            <div className="form-group mt-2">
              <label>Client :</label>
              <select
                name="client"
                className="form-control mt-2"
                onChange={handelChange}
                required
              >
                {clients.map((client, key) => {
                  return (
                    <option key={key} value={client._id}>
                      {client.name}
                    </option>
                  );
                })}
              </select>
            </div>
          )}
          <div className="form-group mt-2">
            <label>Hotel :</label>
            <select
              className="form-control mt-2"
              onChange={handelHotel}
              onClick={handelHotel}
              required
            >
              {hotels.map((hotel, key) => {
                return (
                  <option key={key} value={hotel._id}>
                    {hotel.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group mt-2">
            <label>Room Number :</label>
            <select
              name="room"
              className="form-control mt-2"
              onChange={handelChange}
              required
            >
              {selectedRoom.map((room, key) => {
                return (
                  <option key={key} value={room._id}>
                    {room.number}
                  </option>
                );
              })}
            </select>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={CloseAddPopup}>
            Close
          </Button>
          <Button onClick={() => handelSubmit()} variant="primary">
            Add
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}

export default AddReserve;
