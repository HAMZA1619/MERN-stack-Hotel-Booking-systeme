import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../Api";
export default function Signup({ access }) {
  const [users, setUsers] = useState({});
  const navigate = useNavigate();
  const handleInput=(e)=> {
    e.preventDefault();
    setUsers({ ...users, [e.target.name]: e.target.value });
  }
 const handleSubmit=(e)=> {
    e.preventDefault();
    API.post(`auth/signup`, users).then((res) => {
      if (res.status === 200) {
        access();
        navigate("/"); 
      }
    });
  }
  return (
    <div className="container ">
      <div className="col-lg-8 mx-auto ">
        <div className="card-body bg-light card-header mt-5 pb-4">
          <h1 className="text-center">Sign Up</h1>
          <hr />
          <form onSubmit={handleSubmit} method="post" className="text-start">
            <div className="form-group">
              <label>Name :</label>
              <input
                type="text"
                onChange={handleInput}
                className="form-control mt-2"
                name="name"
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
                placeholder="Enter email address"
                required
              />
            </div>
            <div className="form-group mt-2">
              <label>Password :</label>
              <input
                type="password"
                onChange={handleInput}
                className="form-control mt-2"
                name="password"
                placeholder="Enter password"
                required
              />
            </div>
            <div className="row mt-2">
              <div className="col-3">
                <input
                  className="form-check-input "
                  type="radio"
                  name="role"
                  value="client"
                  onChange={handleInput}
                  defaultChecked
                />
                <label className="form-check-label">I'm Client</label>
              </div>
              <div className=" col">
                <input
                  className="form-check-input ml-5"
                  type="radio"
                  name="role"
                  value="owner"
                  onChange={handleInput}
                />
                <label className="form-check-label">I'm Owner</label>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-block btn-info form-control mt-3"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
