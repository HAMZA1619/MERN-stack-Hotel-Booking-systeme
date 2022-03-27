import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import API from "../../Api";
import DeleteReserve from "./DeleteReserve";
import {
  BsFillTrashFill,
  BsArrowRepeat,
  BsPlusSquareFill,
} from "react-icons/bs";
import UpdateReserve from "./UpdateReserve";
import AddReserve from "./AddReserve";

function Reserve({ role, userId }) {
  const [DeleteId, setDeleteId] = useState("");
  const [updatedReserve, setupdatedReserve] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const ShowAddPopup = () => setShowAdd(true);
  const CloseAddPopup = () => setShowAdd(false);
  const [showDelete, setShowDelete] = useState(false);
  const ShowDeletePopup = (id) => {
    setDeleteId(id);
    setShowDelete(true);
  };
  const CloseDeletePopup = () => {
    setDeleteId("");
    setShowDelete(false);
  };
  const [showUpdate, setShowUpdate] = useState(false);
  const ShowUpdatePopup = (Reserve) => {
    setupdatedReserve(Reserve);
    setShowUpdate(true);
  };
  const CloseUpdatePopup = () => {
    setupdatedReserve("");
    setShowUpdate(false);
  };
  const [Reserves, setReserves] = useState([]);
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
  }, []);
  useEffect(() => {
    API.get(`reserves`).then((res) => {
      if (role === "admin") {
        setReserves(res.data);
      } else if (role === "owner") {
        setReserves([]);
        res.data.forEach((element) => {
          if (userId === element.room.hotel.user) {
            setReserves((Reserves) => {
              return [...Reserves, element];
            });
          }
        });
      } else if (role === "client") {
        setReserves([]);
        res.data.forEach((element) => {
          if (userId === element.client?._id) {
            setReserves((Reserves) => {
              return [...Reserves, element];
            });
          }
        });
      }
    });
  }, [showAdd, showDelete, showUpdate, role, userId]);
  return (
    <div className="w-100">
      <h3 className="m-3">
        Reservations
        <Button className="float-end" onClick={ShowAddPopup}>
          Add <BsPlusSquareFill className="m-1" />
        </Button>
      </h3>
      <Table striped bordered hover size="sm" className="m-auto text-center">
        <thead>
          <tr>
            {role !== "client" && <th>Client</th>}
            <th>Payment </th>
            <th>Price</th>
            <th>Date From</th>
            <th>Date To</th>
            <th>Room N°</th>
            <th>Hotel</th>
            {role !== "client" && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {Reserves.map((Reserve, key) => {
            return (
              <tr key={key}>
                {role !== "client" && <td>{Reserve.client?.name}</td>}
                <td>{Reserve.payment}</td>
                <td>{Reserve.room?.price} Dh</td>
                <td>{new Date(Reserve.date_from).toLocaleDateString()}</td>
                <td>{new Date(Reserve.date_to).toLocaleDateString()}</td>
                <td>{Reserve.room?.number}</td>
                <td>{Reserve.room?.hotel?.name}</td>
                {role !== "client" && (
                  <td>
                    <BsFillTrashFill
                      className="m-2"
                      onClick={() => ShowDeletePopup(Reserve._id)}
                    />
                    <BsArrowRepeat
                      className="m-2"
                      onClick={() => ShowUpdatePopup(Reserve)}
                    />
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </Table>
      {role !== "client" && (
        <>
          <UpdateReserve
            showUpdate={showUpdate}
            CloseUpdatePopup={CloseUpdatePopup}
            updatedReserve={updatedReserve}
          />
          <DeleteReserve
            showDelete={showDelete}
            CloseDeletePopup={CloseDeletePopup}
            id={DeleteId}
          />{" "}
        </>
      )}
      <AddReserve
        showAdd={showAdd}
        CloseAddPopup={CloseAddPopup}
        hotels={hotels}
        Client={userId}
        role={role}
      />
    </div>
  );
}

export default Reserve;
