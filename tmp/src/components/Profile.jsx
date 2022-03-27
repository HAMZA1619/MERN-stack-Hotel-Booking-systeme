import React, { useEffect, useState } from "react";
import API from "../Api";
import { Modal, Button, Card } from "react-bootstrap";

function Profile({ log }) {
  const [Profile, setProfile] = useState([]);
  const [showUpdate, setShowUpdate] = useState(false);
  const ShowUpdatePopup = () => setShowUpdate(true);
  const CloseUpdatePopup = () => setShowUpdate(false);
  const handleInput = (e) => {
    e.preventDefault();
    setProfile({ ...Profile, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    API.get(`users/${log.id}`).then((res) => {
      setProfile(res.data);
    });
  }, []);
  const ProfileUpdate = () => {
    API.patch(`users/${log.id}`,Profile).then((res) => {
      CloseUpdatePopup();
    });
  };
  
  return (
    <>
      <Card className="w-100 m-2 bg-light">
        <Card.Body>
          <Button
            variant="primary"
            onClick={ShowUpdatePopup}
            className="float-end"
          >
            Update Profile
          </Button>
          <Card.Text className="row mt-5">
            <div className="col align-self-center ">
              <img
                className="rounded-circle w-75 "
                src="https://www.e-xpertsolutions.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png"
                alt=""
              />{" "}
            </div>
            <div className="col align-self-center">
              {" "}
              <h2>Name :</h2> <h2>{Profile.name}</h2>
            </div>
            <div className="col align-self-center">
              <h2>Email :</h2> <h2>{Profile.email}</h2>{" "}
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
      <Modal
        show={showUpdate}
        onHide={CloseUpdatePopup}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Profile</Modal.Title>
        </Modal.Header>
        <form className="text-start">
          <Modal.Body>
            <div className="form-group">
              <label>Name :</label>
              <input
                type="text"
                onChange={handleInput}
                className="form-control mt-2"
                name="name"
                value={Profile.name}
                placeholder="Enter name address"
                required
              />
            </div>
            <div className="form-group mt-2">
              <label>Email :</label>
              <input
                type="text"
                onChange={handleInput}
                className="form-control mt-2"
                name="email"
                value={Profile.email}
                placeholder="Enter email address"
                required
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={CloseUpdatePopup}>
              Close
            </Button>
            <Button variant="info" onClick={ProfileUpdate}>
              Update
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default Profile;
