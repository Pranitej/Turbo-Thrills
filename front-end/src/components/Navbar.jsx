import React from "react";
import { Link } from "react-router-dom";

export default function Header({ page }) {
  return (
    <nav
      className="navbar navbar-expand-sm bg-body-tertiary"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          TurboThrills
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              {page === "home" ? (
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/home"
                >
                  Home
                </Link>
              ) : (
                <Link className="nav-link" aria-current="page" to="/home">
                  Home
                </Link>
              )}
            </li>
            <li className="nav-item">
              {page === "about" ? (
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/about"
                >
                  About
                </Link>
              ) : (
                <Link className="nav-link" aria-current="page" to="/about">
                  About
                </Link>
              )}
            </li>
            <li className="nav-item">
              {page === "contact" ? (
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/contact"
                >
                  Contact
                </Link>
              ) : (
                <Link className="nav-link" aria-current="page" to="/contact">
                  Contact
                </Link>
              )}
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Login
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/adminlogin">
                    Admin Login
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/customerlogin">
                    Customer Login
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              {page === "signup" ? (
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/signup"
                >
                  Signup
                </Link>
              ) : (
                <Link className="nav-link" aria-current="page" to="/signup">
                  Signup
                </Link>
              )}
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" target="_blank" to="">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/3670/3670124.png"
                  alt="Facebook"
                  width="30"
                  height="30"
                />
              </Link>
            </li>
            <li className="nav-item">
              <Link target="_blank" className="nav-link" to="">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/3955/3955024.png"
                  alt="Instagram"
                  width="30"
                  height="30"
                />
              </Link>
            </li>
            <li className="nav-item">
              <Link target="_blank" className="nav-link" to="">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/3670/3670211.png"
                  alt="Twitter"
                  width="30"
                  height="30"
                />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
