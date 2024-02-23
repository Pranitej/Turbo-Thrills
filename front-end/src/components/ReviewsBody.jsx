import React from "react";
import { data } from "../App";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";

export default function ReviewsBody() {
  let customer = useContext(data);
  let [reviewData, setReviewData] = useState();
  let [carData, setCarData] = useState();
  let [review1, setReview1] = useState();
  let [editedRating, setEditedRating] = useState();
  let [editedReview, setEditedReview] = useState();

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://turbo-thrills.onrender.com/feedback/getFeedbacksByCustomerId/${customer.customerId}`
      );
      if (response.ok) {
        const result = await response.json();
        setReviewData(result.response);
      } else {
        setReviewData("NoReviews");
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
      const response = await fetch(`https://turbo-thrills.onrender.com/car/getCar/${carId}`);
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

  const handleEditReview = async (feedbackId) => {
    try {
      const response = await fetch(
        `https://turbo-thrills.onrender.com/feedback/getFeedback/${feedbackId}`
      );
      if (response.ok) {
        let result = await response.json();
        result = result.response;
        setEditedRating(result.rating);
        setEditedReview(result.review);
        setReview1(result);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (feedbackId) => {
    try {
      const response = await fetch(
        `https://turbo-thrills.onrender.com/feedback/deleteFeedback/${feedbackId}`,
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
        console.error("Failed to delete Review");
      }
    } catch (error) {
      console.error("Error deleting Review:", error);
    }
  };

  const editReview = async (feedbackId) => {
    try {
      const response = await fetch(
        `https://turbo-thrills.onrender.com/feedback/updateFeedback/${feedbackId}`,
        {
          method: "PUT",
          body: JSON.stringify({
            customerId: customer.customerId,
            carId: review1.carId,
            review: editedReview,
            rating: editedRating,
          }),
          headers: {
            "content-type": "application/json; charset=UTF-8",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        if (data.response !== "error") {
          fetchData();
          alert("Review Updated");
        } else {
          alert("Failed to update review !!!");
        }
      } else {
        console.error("Failed to update review");
      }
    } catch (error) {
      console.error("Error in updating review:", error);
    }
  };

  return (
    reviewData &&
    (reviewData === "NoReviews" ? (
      <div className="container mt-5 mb-5">
        <h1 className="text-light">No Data Found...</h1>
      </div>
    ) : (
      <div className="container mt-5 mb-5 text-light">
        <h4 className="mb-4">Car Reviews...</h4>
        <table className="table table-hover table-bordered border-secondary mt-4">
          <thead>
            <tr>
              <th scope="col">FeedbackDate</th>
              <th scope="col">Review</th>
              <th scope="col">Rating</th>
              <th scope="col" className="text-center">
                ViewCar
              </th>
              <th scope="col" className="text-center">
                EditReview
              </th>
              <th scope="col" className="text-center">
                DeleteReview
              </th>
            </tr>
          </thead>
          <tbody>
            {reviewData.map((review, index) => (
              <tr key={index}>
                <td>
                  {new Date(review.updatedAt).toLocaleString("en-US", {
                    timeZone: "Asia/Kolkata",
                  })}
                </td>
                <td>{review.review}</td>
                <td>{review.rating}</td>
                <td className="text-center">
                  <button
                    className="btn btn-sm btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target={`#exampleModal${review.carId}`}
                    onClick={() => {
                      handleViewCar(review.carId);
                    }}
                  >
                    View Car
                  </button>
                  <div
                    className="modal fade"
                    id={`exampleModal${review.carId}`}
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
                            <div className="card shadow-lg border-dark mt-3">
                              {carData && (
                                <img
                                  src={`https://turbo-thrills.onrender.com/${carData.carImage}`}
                                  className="card-img-top mx-auto"
                                  style={{ aspectRatio: 3 / 2 }}
                                  alt="Network Error"
                                />
                              )}
                              <div className="card-body">
                                {carData && (
                                  <div>
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
                                  </div>
                                )}
                              </div>
                            </div>
                          ) : (
                            <>
                              <h5 className="text-danger text-center">
                                Car Has Been Deleted by Admin
                              </h5>
                            </>
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
                <td className="text-center">
                  <button
                    className="btn btn-sm btn-warning"
                    data-bs-toggle="modal"
                    data-bs-target={`#exampleModal2${review._id}`}
                    onClick={() => {
                      handleEditReview(review._id);
                    }}
                  >
                    Edit Review
                  </button>
                  <div
                    className="modal fade"
                    id={`exampleModal2${review._id}`}
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
                            Edit Review
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
                            {review1 && (
                              <div className="form-floating">
                                <select
                                  className="form-select"
                                  id="floatingSelect"
                                  aria-label="Floating label select example"
                                  value={editedRating}
                                  onChange={(e) => {
                                    setEditedRating(e.target.value);
                                  }}
                                >
                                  {/* <option selected>Give rating</option> */}
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                  <option value="4">4</option>
                                  <option value="5">5</option>
                                </select>
                                <label htmlFor="floatingSelect">
                                  Car Rating
                                </label>
                              </div>
                            )}
                            {review1 && (
                              <div className="form-floating mt-3">
                                <textarea
                                  className="form-control"
                                  placeholder="Review"
                                  id="floatingTextarea2"
                                  style={{ height: "100px" }}
                                  value={editedReview}
                                  onChange={(e) => {
                                    setEditedReview(e.target.value);
                                  }}
                                ></textarea>
                                <label htmlFor="floatingTextarea2">
                                  Review
                                </label>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-primary"
                            data-bs-dismiss="modal"
                            onClick={() => {
                              editReview(review1._id);
                            }}
                          >
                            Edit Review
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
                    data-bs-target={`#exampleModal1${review.carId}`}
                    onClick={() => {
                      handleViewCar(review.carId);
                    }}
                  >
                    Delete Review
                  </button>
                  <div
                    className="modal fade"
                    id={`exampleModal1${review.carId}`}
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
                            Delete Review
                          </h1>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body">
                          <p>
                            Do you want to <b className="text-danger">DELETE</b>{" "}
                            the review ?
                          </p>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-danger"
                            data-bs-dismiss="modal"
                            onClick={() => {
                              handleDelete(review._id);
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
    ))
  );
}
