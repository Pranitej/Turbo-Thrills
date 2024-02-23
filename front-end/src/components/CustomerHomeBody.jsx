import React, { useEffect, useState, useContext } from "react";
import { data } from "../App";
import { Link } from "react-router-dom";

const BASE_API_URL = "https://turbo-thrills.onrender.com";

const CustomerHomeBody = () => {
  const { customerId } = useContext(data);

  const getMaxCarCost = (totalData) =>
    totalData
      ? totalData.reduce(
          (maxCost, car) => (car.cost > maxCost ? car.cost : maxCost),
          0
        )
      : 0;

  const [totalData, setTotalData] = useState(null);
  const [maxCarCost, setMaxCarCost] = useState(getMaxCarCost());
  const [carType, setCarType] = useState("new");
  const [carFilterCost, setCarFilterCost] = useState(0);
  const [mainData, setMainData] = useState(null);
  const [allReviews, setAllReviews] = useState(null);
  const [totalCustomerData, setTotalCustomerData] = useState(null);

  const [filterText, setFilterText] = useState("abc");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${BASE_API_URL}/car/getCarsByType/${carType}`
        );
        if (response.ok) {
          const result = await response.json();
          const maxCostForType = getMaxCarCost(result.response);
          setCarFilterCost(maxCostForType);
          setMaxCarCost(0);
          setMainData(result.response);
          setTotalData(result.response);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [carType]);

  useEffect(() => {
    const getAllReviews = async () => {
      try {
        const response = await fetch(
          `${BASE_API_URL}/feedback/getAllFeedbacks`
        );
        if (response.response !== "error") {
          let result = await response.json();
          setAllReviews(result.response);
          result = result.response;
          const customerPromises = result.map((review) =>
            getCustomerData(review.customerId)
          );
          const customerDataArray = await Promise.all(customerPromises);

          const mergedArray =
            allReviews &&
            allReviews.map((item1) => {
              const matchingItem = customerDataArray.find(
                (item2) => item1.customerId === item2._id
              );
              return { ...item1, ...matchingItem };
            });
          setTotalCustomerData(mergedArray);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getAllReviews();
  }, [carType, totalData]);

  useEffect(() => {
    setMaxCarCost(getMaxCarCost(totalData));
  }, [totalData]);

  useEffect(() => {
    mainData &&
      setMainData(totalData.filter((car) => car.cost <= carFilterCost));
  }, [carFilterCost, totalData]);

  function isWordPresent(mainString, searchString) {
    mainString = (mainString || "").toLowerCase();
    searchString = (searchString || "").toLowerCase();
    const searchWords = searchString.split(" ");
    return searchWords.some((word) => mainString.includes(word));
  }

  useEffect(() => {
    mainData &&
      setMainData((prevMainData) =>
        totalData.filter((car) => {
          if (
            isWordPresent(car.carDescription, filterText) ||
            isWordPresent(car.carType, filterText) ||
            isWordPresent(car.companyName, filterText) ||
            isWordPresent(car.fuelType, filterText) ||
            isWordPresent(car.modelName, filterText) ||
            isWordPresent("" + car.modelYear, filterText)
          ) {
            return true;
          }
          return false;
        })
      );
  }, [filterText]);

  const getCustomerData = async (customerId) => {
    try {
      const response = await fetch(
        `${BASE_API_URL}/customer/getCustomer/${customerId}`
      );
      if (response.ok) {
        const result = await response.json();
        return result.response;
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const addToCart = async (carId) => {
    try {
      const response = await fetch(`${BASE_API_URL}/cart/addToCart`, {
        method: "POST",
        body: JSON.stringify({
          customerId: customerId,
          carId: carId,
        }),
        headers: {
          "content-type": "application/json; charset=UTF-8",
        },
      });

      if (response.response !== "error") {
        alert("Added to cart");
      } else {
        console.error("Failed to add to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const buyButtonClick = (carId) => {
    addToCart(carId);
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        <div className="col-lg-4 mt-3 mb-3">
          <div className="form-floating">
            <select
              className="form-select"
              id="floatingFuel"
              aria-label="Floating label select example"
              onChange={(e) => {
                setCarType(e.target.value);
              }}
            >
              <option value="new">New Cars</option>
              <option value="used">Used Cars</option>
              <option value="rare">Rare Cars</option>
            </select>
            <label htmlFor="floatingFuel">Select Car Type</label>
          </div>
        </div>

        <div className="col-lg-4 mt-3 mb-3">
          <label htmlFor="customRange1" className="form-label text-light">
            Price Range ( ₹ 0 - ₹ {carFilterCost.toLocaleString("en-IN")} )
          </label>
          <input
            type="range"
            className="form-range"
            id="customRange1"
            min={0}
            value={carFilterCost}
            step={50000}
            max={maxCarCost}
            onChange={(e) => {
              setCarFilterCost(Number(e.target.value));
            }}
          />
        </div>

        <div className="col-md-4 mt-3 mb-3">
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="filterText"
              placeholder="Search"
              onChange={(e) => {
                setFilterText(e.target.value);
              }}
            />
            <label htmlFor="filterText">Search</label>
          </div>
        </div>
      </div>

      {mainData && mainData.length === 0 ? (
        <div className="row text-light mt-4">
          <h1>{`No ${carType} cars found...`}</h1>
        </div>
      ) : (
        <></>
      )}

      <div className="row">
        {mainData &&
          mainData.map((car, index) => (
            <div className="col-md-3 mb-4" key={index}>
              <div className="card mt-3">
                <img
                  src={`https://turbo-thrills.onrender.com/${car.carImage}`}
                  className="card-img-top"
                  style={{ aspectRatio: 3 / 2 }}
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">
                    <div className="row">
                      <div className="col-12 text-truncate">
                        {car.companyName} - {car.modelName}
                      </div>
                    </div>
                  </h5>
                  <div className="card-text mb-2">
                    Year Model : {car.modelYear}
                    <br />
                    Fuel type: {car.fuelType}
                    <br />
                    <div className="row">
                      <div className="col-12 text-truncate">
                        Description: {car.carDescription}
                      </div>
                    </div>
                    Cost:
                    <b className="cost">
                      {" "}
                      ₹ {car.cost.toLocaleString("en-IN")}
                    </b>
                  </div>
                  <Link
                    className="link-offset-2 link-underline link-underline-opacity-0"
                    data-bs-toggle="modal"
                    data-bs-target={`#exampleModal2${car._id}`}
                  >
                    Checkout Reviews
                  </Link>
                  <br />
                  <div
                    className="modal fade"
                    id={`exampleModal2${car._id}`}
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-dialog-scrollable">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1
                            className="modal-title fs-5"
                            id="exampleModalLabel"
                          >
                            Reviews
                          </h1>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body">
                          <div className="container mt-3 mb-3">
                            {totalCustomerData &&
                              totalCustomerData
                                .filter((info) => info.carId === car._id)
                                .map((info, index) => (
                                  <div className="card mb-3" key={index}>
                                    <div
                                      className="card-body"
                                      // style={{
                                      //   display: "flex",
                                      // }}
                                    >
                                      <h5>
                                        {info.firstName + " " + info.lastName}
                                      </h5>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="gold"
                                        className="bi bi-star-fill"
                                        viewBox="0 0 16 16"
                                        transform="translate(0, -2)"
                                      >
                                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                      </svg>

                                      <span className="star-label">
                                        {"  " + info.rating}
                                      </span>

                                      <p>{info.review}</p>
                                    </div>
                                  </div>
                                ))}
                            {!totalCustomerData ||
                              (totalCustomerData.filter(
                                (info) => info.carId === car._id
                              ).length === 0 && (
                                <div className="card mb-3">
                                  <div className="card-body">
                                    <p>No reviews available for this car.</p>
                                  </div>
                                </div>
                              ))}
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
                  <button
                    className="btn btn-primary mt-3"
                    onClick={() => {
                      buyButtonClick(car._id);
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CustomerHomeBody;
