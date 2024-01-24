import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
function Navbar() {
  const navigate = useNavigate();
  const auth = sessionStorage.getItem("token");
  const userName = sessionStorage.getItem("name");
  const logout = () => {
    sessionStorage.clear();
    navigate("/login");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-info">
        <Link className="navbar-brand" to="#">
          Mern-app
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {auth ? (
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link data" to="/fetch">
                  <strong>Data</strong>
                </Link>
              </li>

              <li className="nav-item userData">
                <strong className="welcome">Welcome {userName}</strong>
                <Link to={"/"}>
                  <button className="btn btn-success" onClick={logout}>
                    Logout
                  </button>
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </>
  );
}
export default Navbar;
