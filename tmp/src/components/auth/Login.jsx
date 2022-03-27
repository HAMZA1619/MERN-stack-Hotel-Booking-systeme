import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../Api";
// import Cookies from "js-cookie";
export default function Login({ access }) {
  const [users, setUsers] = useState({});
  const navigate = useNavigate();
  const handleInput =(e)=> {
    e.preventDefault();
    setUsers({ ...users, [e.target.name]: e.target.value });
  }
  const handleSubmit =(e)=> {
    e.preventDefault();
    API.post(`auth/signin`, users ).then((res) => {
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
          <h1 className="text-center">login</h1>
          <hr />
          <form method="post" className="text-start" onSubmit={handleSubmit}>
            <div className="form-group">
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
              <span className="text-danger"></span>
            </div>
            <button
              type="submit"
              className="btn btn-block btn-info form-control mt-3"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
