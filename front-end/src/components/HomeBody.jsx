import React from "react";
import { useNavigate } from "react-router-dom";

export default function HomeBody() {
  let navigate = useNavigate();

  const handleClick = () => {
    navigate("/customerlogin");
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row mb-5">
          <div className="col-md-4 mb-4">
            <div className="card card-hover">
              <img
                src="https://wallpapercave.com/wp/wp2089634.jpg"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">Purchase Used Cars</h5>
                <p className="card-text">
                  Buy the used cars at cheap rates with 1 year free service.
                </p>
                <button className="btn btn-primary" onClick={handleClick}>
                  Checkout
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card card-hover">
              <img
                src="https://wallpapercave.com/wp/wp4254372.jpg"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">Purchase Show Room Cars</h5>
                <p className="card-text">
                  Buy the brand new cars from the authorised seller at a good
                  price.
                </p>
                <button className="btn btn-primary" onClick={handleClick}>
                  Checkout
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card card-hover">
              <img
                src="https://wallpapercave.com/wp/wp2397325.jpg"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">Sell Used Cars</h5>
                <p className="card-text">
                  Here you can sell your used cars for a good prices without any
                  worries.
                </p>
                <button className="btn btn-primary" onClick={handleClick}>
                  Sell Car
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
