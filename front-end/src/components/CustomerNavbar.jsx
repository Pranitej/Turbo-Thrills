import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { data } from "../App";

export default function CustomerNavbar({ page }) {
  let customer = useContext(data);
  let navigate = useNavigate();

  return (
    <>
      <nav
        className="navbar bg-dark navbar-expand-sm bg-body-tertiary"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/customermain">
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
                    to="/customer/home"
                  >
                    Home
                  </Link>
                ) : (
                  <Link
                    className="nav-link "
                    aria-current="page"
                    to="/customer/home"
                  >
                    Home
                  </Link>
                )}
              </li>
              <li className="nav-item">
                {page === "profile" ? (
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/customer/profile"
                  >
                    Profile
                  </Link>
                ) : (
                  <Link
                    className="nav-link "
                    aria-current="page"
                    to="/customer/profile"
                  >
                    Profile
                  </Link>
                )}
              </li>
              <li className="nav-item">
                {page === "sellcar" ? (
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/customer/sellcar"
                  >
                    Sell Car
                  </Link>
                ) : (
                  <Link
                    className="nav-link "
                    aria-current="page"
                    to="/customer/sellcar"
                  >
                    Sell Car
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
                  History
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/customer/purchasedcars"
                    >
                      Purchased Cars
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/customer/selledcars">
                      Selled Cars
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/customer/reviews">
                      Car Reviews
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                {page === "cart" ? (
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/customer/cart"
                  >
                    Cart
                  </Link>
                ) : (
                  <Link
                    className="nav-link "
                    aria-current="page"
                    to="/customer/cart"
                  >
                    Cart
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
                  <div className="modal-dialog modal-dialog-centered">
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
                            navigate("/customerlogin");
                            customer.setCustomerLoginStatus(false);
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
