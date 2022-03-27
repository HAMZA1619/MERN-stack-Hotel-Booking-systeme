import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import API from "../../Api";
import DeleteRoom from "./DeleteRoom";
import {
  BsFillTrashFill,
  BsArrowRepeat,
  BsPlusSquareFill,
} from "react-icons/bs";
import UpdateRoom from "./UpdateRoom";
import AddRoom from "./AddRoom";

function Room({ role, userId }) {
  const [DeleteId, setDeleteId] = useState('');
  const [updatedRoom, setupdatedRoom] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const ShowAddPopup = () => setShowAdd(true);
  const CloseAddPopup = () => setShowAdd(false);
  const [showDelete, setShowDelete] = useState(false);
  const ShowDeletePopup = (id) => {
    setDeleteId(id);
    setShowDelete(true);
  };
  const CloseDeletePopup = () => {
    setDeleteId('');
    setShowDelete(false);
  };
  const [showUpdate, setShowUpdate] = useState(false);
  const ShowUpdatePopup = (room) => {
    setupdatedRoom(room);
    setShowUpdate(true);
  };
  const CloseUpdatePopup = () => {
    setupdatedRoom('');
    setShowUpdate(false);
  };
  const [rooms, setRooms] = useState([]);
  const [hotels, sethotels] = useState([]);

  useEffect(() => {
    API.get(`hotels`).then((response) => {
      if (role === "owner") {
        sethotels([]);
        response.data.forEach((item) => {
          if (item.user === userId) {
            sethotels(() => {
              return [...hotels, item];
            });
          }
        });
      } else {
        sethotels(response.data);
      }
    });
  }, [role, userId,hotels]);
  useEffect(() => {
    API.get(`rooms`).then((res) => {
      if (role === "admin") {
        setRooms(res.data);
      } else if (role === "owner") {
        setRooms([]);
        res.data.forEach((element) => {
          if (userId === element.user) {
            setRooms((rooms) => {
              return [...rooms, element];
            });
          }
        });
      }
    });
  }, [showAdd, showDelete, showUpdate, role, userId]);
  return (
    <div className="w-100">
      <h3 className="m-3">
        Rooms
        <Button className="float-end" onClick={ShowAddPopup}>
          Add <BsPlusSquareFill className="m-1" />
        </Button>
      </h3>
      <Table striped bordered hover size="sm" className="m-auto text-center">
        <thead>
          <tr>
            <th>Number</th>
            <th>Room type</th>
            <th>Price</th>
            <th>Created Date</th>
            <th>Hotel</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room ,key) => {
            return (
                <tr key={key}>
                  <td>{room.number}</td>
                  <td>{room.type}</td>
                  <td>{room.price} Dh</td>
                  <td>{new Date(room.updatedAt).toLocaleDateString()}</td>
                  <td>{room.hotel?.name}</td>
                  <td>
                    <BsFillTrashFill
                      className="m-2"
                      onClick={() => ShowDeletePopup(room._id)}
                    />
                    <BsArrowRepeat
                      className="m-2"
                      onClick={() => ShowUpdatePopup(room)}
                    />
                  </td>
                </tr>
            );
          })}
        </tbody>
      </Table>
      <UpdateRoom
        showUpdate={showUpdate}
        CloseUpdatePopup={CloseUpdatePopup}
        hotels={hotels}
        updatedRoom={updatedRoom}
      />
      <DeleteRoom
        showDelete={showDelete}
        CloseDeletePopup={CloseDeletePopup}
        id={DeleteId}
      />
      <AddRoom
        showAdd={showAdd}
        CloseAddPopup={CloseAddPopup}
        hotels={hotels}
      />
    </div>
  );
}

export default Room;
