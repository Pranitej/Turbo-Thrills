import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { data } from "../App";
import { useNavigate } from "react-router-dom";

export default function CartBody() {
  const [data1, setData1] = useState();
  const customer = useContext(data);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://turbo-thrills.onrender.com/cart/getCustomerCarts/${customer.customerId}`
      );
      if (response.ok) {
        const result = await response.json();
        setData1(result.response);
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

  const handlePurchase = (carId, cost) => {
    navigate(`/customer/paymentshipment?carId=${carId}&cost=${cost}`);
  };

  const deleteCartCar = async (customerId, carId) => {
    try {
      const response = await fetch(
        `https://turbo-thrills.onrender.com/cart/deleteCartByCustomerIdAndCarId/${customerId}/${carId}`,
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

  const handleDelete = (carId, customerId) => {
    deleteCartCar(customerId, carId);
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row mb-3 text-light">
        <h2>Cars in Cart</h2>
      </div>
      {
        data1.length === 0 && <h2 className="mt-5 mb-5 text-center">Cart is Empty</h2>
      }
      <div className="row">
        {data1 &&
          data1.map((car, index) => (
            <div className="col-md-3 mb-4" key={index}>
              <div className="card">
                <img
                  src={`https://turbo-thrills.onrender.com/${car.carImage}`}
                  className="card-img-top mx-auto"
                  style={{ aspectRatio: 3 / 2 }}
                  alt="Network Error"
                />
                <div className="card-body">
                  <h5 className="card-title">
                    {car.companyName} - {car.modelName}
                  </h5>
                  <div className="card-text">
                    Year Model : {car.modelYear}
                    <br />
                    Fuel type: {car.fuelType}
                    <br />
                    <div className="row">
                      <div className="col-12 text-truncate">
                        Description: {car.carDescription}
                      </div>
                    </div>
                    Cost: ₹ {car.cost.toLocaleString("en-IN")}
                    <br />
                    {car.availability ? (
                      <p>
                        Availability: <b className="text-success">In stock</b>
                      </p>
                    ) : (
                      <p>
                        Availability:{" "}
                        <b className="text-danger">Out of stock</b>
                      </p>
                    )}
                    <div className="d-grid gap-2 d-md-block mt-3">
                      {car.availability ? (
                        <button
                          type="button"
                          className="btn btn-primary me-md-2"
                          onClick={() => {
                            handlePurchase(car.carId, car.cost);
                          }}
                        >
                          Buy Now
                        </button>
                      ) : (
                        <>
                          <button
                            type="button"
                            className="btn btn-primary me-md-2"
                            disabled
                            onClick={() => {
                              handlePurchase(car.carId, car.cost);
                            }}
                          >
                            Buy Now
                          </button>
                        </>
                      )}
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => {
                          handleDelete(car.carId, customer.customerId);
                        }}
                      >
                        Delete
                      </button>
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
