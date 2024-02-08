import React from "react";
import carouselData from "../jsonData/carouselData.json";

export default function Carousel() {
  const carouselImageStyle = {
    aspectRatio: 12 / 5,
  };

  const carouselContentStyle = {
    borderRadius: "10px",
    background: "rgba(0, 0, 0, 0.7)",
  };

  return (
    <div id="carouselExampleCaptions" className="carousel slide">
      <div className="carousel-indicators">
        {carouselData.map((data, index) => {
          let dataBsSlideTo = `${index}`;
          let ariaLabel = `slide ${index + 1}`;
          if (index === 0) {
            return (
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to={dataBsSlideTo}
                className="active"
                aria-current="true"
                aria-label={ariaLabel}
                key={data.id}
              ></button>
            );
          } else {
            return (
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to={dataBsSlideTo}
                aria-label={ariaLabel}
                key={data.id}
              ></button>
            );
          }
        })}
      </div>

      <div className="carousel-inner">
        {carouselData.map((data) => {
          if (data.id === 1) {
            return (
              <div className="carousel-item active" key={data.id}>
                <img
                  src={data.path}
                  className="d-block w-100"
                  alt="..."
                  style={carouselImageStyle}
                />
                <div className="carousel-caption d-none d-md-block">
                  <div style={carouselContentStyle}>
                    <br />
                    <h5>{data.title}</h5>
                    <p>{data.description}</p>
                    <br />
                  </div>
                </div>
              </div>
            );
          } else {
            return (
              <div className="carousel-item" key={data.id}>
                <img
                  src={data.path}
                  className="d-block w-100"
                  alt="..."
                  style={carouselImageStyle}
                />
                <div className="carousel-caption d-none d-md-block">
                  <div style={carouselContentStyle}>
                    <br />
                    <h5>{data.title}</h5>
                    <p>{data.description}</p>
                    <br />
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>

      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>

      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
