import React from "react";
import { useEffect } from "react";
import { useState } from "react";

export default function AdminHomeBody() {
  let [allCars, setAllCars] = useState(null);

  const [carData, setCarData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/car/getAllCars");
      if (response.ok) {
        const result = await response.json();
        setAllCars(result.response);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleViewCar = async (carId) => {
    try {
      const response = await fetch(`http://localhost:5000/car/getCar/${carId}`);
      if (response.ok) {
        const result = await response.json();
        setCarData(result.response);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteCar = async (carId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/car/deleteCar/${carId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        fetchData();
      } else {
        console.error("Failed to delete car");
      }
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  return (
    <div className="container mt-5 mb-5 text-light">
      <h2>All Cars...</h2>
      <table className="table table-hover table-bordered border-secondary mt-4">
        <thead>
          <tr>
            <th>CID</th>
            <th>Company</th>
            <th>Model</th>
            <th>Year</th>
            <th>Fuel</th>
            <th>Type</th>
            <th>Stock</th>
            <th>Cost</th>
            <th className="text-center">View Car</th>
            <th className="text-center">Delete Car</th>
          </tr>
        </thead>
        <tbody>
          {allCars &&
            allCars.map((car, index) => (
              <tr key={index}>
                <th scope="row">{car._id}</th>
                <td>{car.companyName}</td>
                <td>{car.modelName}</td>
                <td>{car.modelYear}</td>
                <td>{car.fuelType}</td>
                <td>{car.carType}</td>
                <td>{car.availability ? "Yes" : "No"}</td>
                <td>₹ {car.cost.toLocaleString("en-IN")}</td>
                <td className="text-center">
                  <button
                    className="btn btn-sm btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target={`#exampleModal${car._id}`}
                    onClick={() => {
                      handleViewCar(car._id);
                    }}
                  >
                    View Car
                  </button>
                  <div
                    className="modal fade"
                    id={`exampleModal${car._id}`}
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1
                            className="modal-title fs-5"
                            id="exampleModalLabel"
                          >
                            Car Details
                          </h1>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body text-start">
                          <div className="card mt-3">
                            {carData && (
                              <img
                                src={`http://localhost:5000/${carData.carImage}`}
                                className="card-img-top mx-auto"
                                style={{ aspectRatio: 3 / 2 }}
                                alt="..."
                              />
                            )}
                            <div className="card-body">
                              {carData && (
                                <>
                                  <h5 className="card-title">
                                    {carData.companyName} - {carData.modelName}
                                  </h5>
                                  <p className="card-text">
                                    Year Model: {carData.modelYear}
                                    <br />
                                    Fuel type: {carData.fuelType}
                                    <br />
                                    Description: {carData.carDescription}
                                    <br />
                                    Cost: ₹{" "}
                                    {carData.cost.toLocaleString("en-IN")}
                                    <br />
                                  </p>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="text-center">
                  <button
                    className="btn btn-sm btn-danger"
                    data-bs-toggle="modal"
                    data-bs-target={`#exampleModal1${car._id}`}
                  >
                    Delete
                  </button>
                  <div
                    className="modal fade"
                    id={`exampleModal1${car._id}`}
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1
                            className="modal-title fs-5"
                            id="exampleModalLabel"
                          >
                            Delete
                          </h1>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body text-start ">
                          Do yo want to delete the car with the ID{" - "}
                          <span className="text-danger">{car._id}</span>
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
                              deleteCar(car._id);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
