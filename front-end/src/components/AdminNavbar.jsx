import React from "react";
import { Link } from "react-router-dom";
import { data } from "../App";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminNavbar({ page }) {
  let navigate = useNavigate();
  let admin = useContext(data);
  return (
    <>
      <nav
        className="navbar navbar-expand-sm bg-dark bg-body-tertiary"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/admin/home">
            TurboThrills
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                {page === "home" ? (
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/admin"
                  >
                    Home
                  </Link>
                ) : (
                  <Link className="nav-link" aria-current="page" to="/admin">
                    Home
                  </Link>
                )}
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  View Records
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/admin/viewcustomers">
                      Customers
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/admin/viewcarsales">
                      Car Sales
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                {page === "message" ? (
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/admin/viewcontactus"
                  >
                    Messages
                  </Link>
                ) : (
                  <Link
                    className="nav-link"
                    aria-current="page"
                    to="/admin/viewcontactus"
                  >
                    Messages
                  </Link>
                )}
              </li>
            </ul>
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Logout
                </button>
                <div
                  className="modal fade"
                  id="exampleModal"
                  tabIndex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h2
                          className="modal-title fs-5 text-light"
                          id="exampleModalLabel"
                        >
                          Logout
                        </h2>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body text-light">
                        <p className="text-light">
                          Do you want to<strong> Logout ??</strong>
                        </p>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger"
                          data-bs-dismiss="modal"
                          onClick={() => {
                            navigate("/");
                            admin.setAdminLoginStatus(false);
                          }}
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
