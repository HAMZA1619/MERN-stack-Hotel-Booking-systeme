import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import API from "../../Api";
function UpdateRoom({ CloseUpdatePopup, showUpdate, updatedRoom, hotels }) {
  // const [images, setImages] = useState([]);
  const [newroom, setnewRoom] = useState({});
  const handelChange = (e) => {
    setnewRoom({ ...newroom, [e.target.name]: e.target.value });
  };

  // const handelImagesChange = (e) => {
  //   const fileListAsArray = Array.from(e.target.files);
  //   setImages((prev) => fileListAsArray);
  // };

  const handelSubmit = async (e) => {
    // e.preventDefault();
    // console.log('newroom',newroom);
    // const data = new FormData();
    // data.append("number", newroom.number);
    // data.append("price", newroom.price);
    // data.append("type", newroom.type);
    // images.map((image) => data.append("image", image));
    // data.append("hotel", newroom.hotel);

    try {
      const res = await API.patch(`rooms/${updatedRoom._id}`,newroom);
      CloseUpdatePopup();
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
      show={showUpdate}
      onHide={CloseUpdatePopup}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Update A Room</Modal.Title>
      </Modal.Header>
      <form className="text-start" method="post" >
        <Modal.Body>
          <div className="form-group">
            <label>Type :</label>
            <select
              name="type"
              className="form-control mt-2"
              onChange={(e)=>handelChange(e)}
            >
              <option value={updatedRoom.type}>{updatedRoom.type}</option>
              <option value="Single">Single</option>
              <option value="Double">Double</option>
              <option value="Triple">Triple</option>
              <option value="Suite">Suite</option>
            </select>
          </div>
          <div className="form-group">
            <label>Number :</label>
            <input
              onChange={(e)=>handelChange(e)}
              className="form-control mt-2"
              name="number"
              value={updatedRoom.number}
              required
            />
          </div>
          <div className="form-group">
            <label>Price :</label>
            <input
              onChange={(e)=>handelChange(e)}
              className="form-control mt-2"
              name="price"
              value={updatedRoom.price}
              required
            />
          </div>
          {/* <div className="form-group mt-2">
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
          </div> */}
          <div className="form-group mt-2">
            <label>Hotel :</label>
            <select
              name="hotel"
              className="form-control mt-2"
              onChange={(e)=>handelChange(e)}
            >
              <option value={updatedRoom.hotel?._id}>{updatedRoom.hotel?.name}</option>
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
          <Button variant="secondary" onClick={CloseUpdatePopup}>
            Close
          </Button>
          <Button onClick={()=>handelSubmit()} variant="success">
            Update
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}

export default UpdateRoom;
