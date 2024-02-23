import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { data } from "../App";

export default function PurchasedCarsBody() {
  let [data1, setData1] = useState();
  let [carData, setCarData] = useState();
  let [rating, setRating] = useState(0);
  let [review, setReview] = useState("");
  let customer = useContext(data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/carSale/getallCarSales`
        );
        if (response.ok) {
          let result = await response.json();
          result = result.response;
          result &&
            setData1(
              result.filter((car) => car.customerId === customer.customerId)
            );
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const fetchCarData = async (carId) => {
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

  const addReview = async (carId, customerId, date, review, rating) => {
    try {
      const response = await fetch(
        "http://localhost:5000/feedback/addFeedback",
        {
          method: "POST",
          body: JSON.stringify({
            customerId: customerId,
            carId: carId,
            feedbackDate: date,
            review: review,
            rating: rating,
          }),
          headers: {
            "content-type": "application/json; charset=UTF-8",
          },
        }
      );
      if (response.ok) {
        const data = response.json();
        if (data) {
          alert("Review Added");
          setRating(0);
          setReview("");
        } else {
          alert("Failed to add review !!!");
        }
      } else {
        console.error("Failed to add review");
      }
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  const handleAddReview = (carId, customerId) => {
    if (rating !== 0 && review !== "") {
      let date = new Date();
      addReview(carId, customerId, date, review, rating);
    } else {
      alert("Invalid Entry...");
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row mb-4 text-light">
        <h2>Purchased Cars</h2>
      </div>
      <div className="row">
        {data1 &&
          data1.map((car, index) => (
            <div className="col-lg-4 mb-4" key={index}>
              <div className="card hover_remove border-dark">
                <div className="card-body">
                  <h6 className="card-title">Sale ID : {car._id}</h6>
                  <p className="card-text">
                    Car Cost : ₹ {car.cost.toLocaleString("en-IN")}
                    <br />
                    <div className="row">
                      <div className="col-12 text-truncate">
                        Purchased on:{" "}
                        {new Date(car.updatedAt).toLocaleString("en-US", {
                          timeZone: "Asia/Kolkata",
                        })}
                      </div>
                    </div>
                    Card Number: {car.cardNumber}
                    <br />
                    <div className="row">
                      <div className="col-12 text-truncate">
                        Address: {car.shippingAddress}
                      </div>
                    </div>
                  </p>

                  <div className="d-grid gap-2 d-sm-block">
                    <button
                      className="btn btn-md btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target={`#exampleModal${car.carId}`}
                      onClick={() => {
                        fetchCarData(car.carId);
                      }}
                    >
                      View Car
                    </button>
                    {"        "}
                    <button
                      className="btn btn-md btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target={`#exampleModal1${car.carId}`}
                    >
                      Add Review
                    </button>
                  </div>

                  <div
                    className="modal fade"
                    id={`exampleModal${car.carId}`}
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
                        {!carData ? (
                          <>
                            <div className="modal-body">
                              <h5 className="text-danger text-center">
                                Car Has Been Deleted by Admin
                              </h5>
                            </div>
                          </>
                        ) : (
                          <></>
                        )}
                        {carData ? (
                          <div className="modal-body">
                            <div className="card shadow-lg border-dark mt-3">
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
                                      <div className="row">
                                        <div className="col-12 text-truncate">
                                          Description: {carData.carDescription}
                                        </div>
                                      </div>
                                      Cost: ₹{" "}
                                      {carData.cost.toLocaleString("en-IN")}
                                      <br />
                                    </p>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <></>
                        )}
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

                  <div
                    className="modal fade"
                    id={`exampleModal1${car.carId}`}
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1
                            className="modal-title fs-5"
                            id="exampleModalLabel1"
                          >
                            Add Review
                          </h1>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body">
                          <div className="container">
                            <div className="form-floating">
                              <select
                                className="form-select"
                                id="floatingSelect"
                                aria-label="Floating label select example"
                                onChange={(e) => {
                                  setRating(e.target.value);
                                }}
                                value={rating}
                              >
                                <option select>Give rating</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                              </select>
                              <label htmlFor="floatingSelect">Car Rating</label>
                            </div>
                            <div className="form-floating mt-3">
                              <textarea
                                className="form-control"
                                placeholder="Review"
                                id="floatingTextarea2"
                                style={{ height: "100px" }}
                                value={review}
                                onChange={(e) => {
                                  setReview(e.target.value);
                                }}
                              ></textarea>
                              <label htmlFor="floatingTextarea2">Review</label>
                            </div>
                          </div>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-primary"
                            data-bs-dismiss="modal"
                            onClick={() => {
                              handleAddReview(car.carId, customer.customerId);
                            }}
                          >
                            Add Review
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
