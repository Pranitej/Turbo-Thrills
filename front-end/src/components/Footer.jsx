import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <div className="container-fluid bg-dark">
        <div className="row">
          <div className="col-md-12 text-light mt-3 mb-3 text-center">
            <p>© 2008-2023 TurboThrills</p>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 mb-3 text-center">
            <ul className="list-group list-group-flush">
              <h5 className="text-light">Cars we offer</h5>
              <li className="list-group-item bg-dark text-secondary">Audi</li>
              <li className="list-group-item bg-dark text-secondary">BMW</li>
              <li className="list-group-item bg-dark text-secondary">Ford</li>
              <li className="list-group-item bg-dark text-secondary">Tesla</li>
              <li className="list-group-item bg-dark text-secondary">
                Volkswagen
              </li>
              <li className="list-group-item bg-dark text-secondary">
                Mercedes
              </li>
              <li className="list-group-item bg-dark text-secondary">
                Porsche
              </li>
              <li className="list-group-item bg-dark text-secondary">Jeep</li>
              <li className="list-group-item bg-dark text-secondary">
                And many more...
              </li>
            </ul>
          </div>
          <div className="col-md-1 mb-3 text-center"></div>
          <div className="col-md-4 mb-3 text-center text-secondary">
            <h5 className="text-light">Welcome to TurboThrills</h5>
            <p className="text-secondary">
              TurboThrills is dedicated to those who are trying to find a used
              or brand new car to purchase. This is the platform where you can
              also sell your used cars for a good price. Here you can also buy
              an used car for a good price without any worries.
            </p>
            <hr />
            <h5 className="text-light">Visit Us</h5>
            <p>
              Monday - Friday
              <br />
              9am - 10pm
            </p>
            <p>
              Saturday - Sunday
              <br />
              10am - 9pm
            </p>
            <p>Road no.: 20, Warangal, Telangana</p>
            <p>Contact : +91 98765 43210</p>
          </div>
          <div className="col-md-1 mb-3 text-center"></div>
          <div className="col-md-3">
            <h5 className="text-light">Follow Us</h5>
            <br />
            <Link target="_blank" className="nav-link" to="https://x.com/vangalapranitej?t=oBNR1-0_b6UFxP4FwZK1KA&s=08 ">
              <p className="text-secondary">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/3670/3670211.png"
                  alt="Twitter"
                  width="30"
                  height="30"
                />
                {"       "}Twitter
              </p>
            </Link>
            <Link target="_blank" className="nav-link" to="https://www.instagram.com/pranitej0905?igsh=NGUwOWZxajd5bnlv ">
              <p className="text-secondary">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/3955/3955024.png"
                  alt="Instagram"
                  width="30"
                  height="30"
                />
                {"       "}Instagram
              </p>
            </Link>
            <Link className="nav-link" target="_blank" to="https://www.facebook.com/pranitej.radhika?mibextid=ZbWKwL">
              <p className="text-secondary">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/3670/3670124.png"
                  alt="Facebook"
                  width="30"
                  height="30"
                />
                {"        "}FaceBook
              </p>
            </Link>
            <br />
            <h5 className="text-light">Find Us</h5>
            <br />
            <Link className="nav-link" target="_blank" to="https://maps.app.goo.gl/BdK8FXGbvxuT3wGx9">
              <p className="text-secondary mb-5">
                <img
                  src="https://img.freepik.com/premium-vector/red-geolocation-icon_74669-526.jpg?w=826"
                  alt="Facebook"
                  width="30"
                  style={{ borderRadius: "50%" }}
                  height="30"
                />
                {"        "}View on Map
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
