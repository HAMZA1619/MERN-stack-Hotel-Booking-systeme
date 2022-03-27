import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
// import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import API from "../../Api";
function AddRoom({ showAdd, CloseAddPopup, hotels }) {
  // const axiosPrivate = useAxiosPrivate();
  const [images, setImages] = useState([]);
  const [room, setRoom] = useState({});
  const handelChange = (e) => {
    e.preventDefault();
    setRoom({ ...room, [e.target.name]: e.target.value });
  };

  const handelImagesChange = (e) => {
    const fileListAsArray = Array.from(e.target.files);
    setImages((prev) => fileListAsArray);
  };

  const handelSubmit = async () => {
    const data = new FormData();
    data.append("number", room.number);
    data.append("price", room.price);
    data.append("type", room.type);
    images.map((image) => data.append("image", image));
    data.append("hotel", room.hotel);

    try {
      const res = await API.post(`rooms`, data);
      CloseAddPopup();
      console.log(res.data);
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
        <Modal.Title>Add A Room</Modal.Title>
      </Modal.Header>
      <form className="text-start">
        <Modal.Body>
          <div className="form-group">
            <label>Type :</label>
            <select
              name="type"
              className="form-control mt-2"
              onChange={handelChange}
            >
              <option value="Single">Single</option>
              <option value="Double">Double</option>
              <option value="Triple">Triple</option>
              <option value="Suite">Suite</option>
            </select>
          </div>
          <div className="form-group">
            <label>Number :</label>
            <input
              type="number"
              onChange={handelChange}
              className="form-control mt-2"
              name="number"
              placeholder="Enter Room Number"
              required
            />
          </div>
          <div className="form-group">
            <label>Price :</label>
            <input
              type="number"
              onChange={handelChange}
              className="form-control mt-2"
              name="price"
              placeholder="Enter Room price"
              required
            />
          </div>
          <div className="form-group mt-2">
            <label>Images :</label>
            <input
              className="form-control"
              type="file"
              multiple
              name="images"
              id="images"
              required
              placeholder="Images"
              onChange={handelImagesChange}
            />
          </div>
          <div className="form-group mt-2">
            <label>Hotel :</label>
            <select
              name="hotel"
              className="form-control mt-2"
              onChange={handelChange}
              required
            >
              {hotels.map((hotel) => {
                return (
                  <option key={hotel._id} value={hotel._id}>
                    {hotel.name}
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

export default AddRoom;
