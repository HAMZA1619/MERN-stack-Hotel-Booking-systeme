import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <Link className="navbar-brand" to="/">
              Booking
            </Link>
            <div className="float-right" id="navbarSupportedContent">
              <Link to="/login">
                <button className="btn btn-outline-primary m-3">Login</button>
              </Link>
              <Link to="/signup">
                <button className="btn btn-outline-primary">Signup</button>
              </Link>
            </div>
          </div>
        </nav>

        <Routes>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/signup" element={<Signup />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
