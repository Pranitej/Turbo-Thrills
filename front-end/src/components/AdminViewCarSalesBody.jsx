import React from "react";
import { useState } from "react";
import { useEffect } from "react";

export default function AdminViewCarSalesBody() {
  const [data, setData] = useState(null);
  const [carData, setCarData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/carSale/getAllCarSales"
        );
        if (response.ok) {
          const result = await response.json();
          setData(result.response);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
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

  return (
    <div className="container mt-3 mb-5 text-light">
      <h2>Car Sales...</h2>
      <table className="table table-hover table-bordered border-secondary mt-4">
        <thead>
          <tr>
            <th scope="col">Sale ID</th>
            <th scope="col">CustomerID</th>
            <th scope="col">CarID</th>
            <th scope="col">Date</th>
            <th scope="col">Address</th>
            <th scope="col">Card Number</th>
            <th scope="col">Car Cost</th>
            <th scope="col" className="text-center">
              View Car
            </th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((car, index) => (
              <tr key={index}>
                <th scope="row">{car._id}</th>
                <td>{car.customerId}</td>
                <td>{car.carId}</td>
                <td>
                  {new Date(car.updatedAt).toLocaleString("en-US", {
                    timeZone: "Asia/Kolkata",
                  })}
                </td>
                <td>{car.shippingAddress}</td>
                <td>{car.cardNumber}</td>
                <td>₹ {car.cost.toLocaleString("en-IN")}</td>
                <td className=" text-center">
                  <button
                    className="btn btn-sm btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target={`#exampleModal${car.carId}`}
                    onClick={() => {
                      handleViewCar(car.carId);
                    }}
                  >
                    ViewCar
                  </button>
                  <div
                    className="modal fade"
                    id={`exampleModal${car.carId}`}
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog text-start">
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
                        <div className="modal-body">
                          {carData ? (
                            <></>
                          ) : (
                            <h4 className="text-center text-danger mx-auto">
                              Car Has Been Deleted By Admin
                            </h4>
                          )}
                          {carData ? (
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
                                      {carData.companyName} -{" "}
                                      {carData.modelName}
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
                          ) : (
                            <></>
                          )}
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
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
