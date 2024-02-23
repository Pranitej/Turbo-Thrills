import React, { useEffect, useState } from "react";
import { data } from "../App";
import { useContext } from "react";

export default function CustomerSelledCars() {
  const [data1, setData1] = useState(null);
  //let [carType, setCarType] = useState("new");
  const customer = useContext(data);
  const customerId1 = customer.customerId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://turbo-thrills.onrender.com/car/getCarsByCustomerId/${customerId1}`
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
    fetchData();
  }, []);

  return (
    <>
      <div className="container mt-5 mb-5">
        <div className="row mb-3 text-light">
          <h2>Selled Cars</h2>
        </div>
        <div className="row">
          {data1 &&
            data1.map((car, index) => (
              <div className="col-md-3 mb-4" key={index}>
                <div className="card">
                  <img
                    src={`https://turbo-thrills.onrender.com/${car.carImage}`}
                    className="card-img-top mx-auto"
                    style={{ aspectRatio: 3 / 2 }}
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">
                      {car.companyName} - {car.modelName}
                    </h5>
                    <p className="card-text">
                      Year Model : {car.modelYear}
                      <br />
                      Fuel type: {car.fuelType}
                      <br />
                      <div className="row">
                        <div className="col-12 text-truncate">
                          Description: {car.carDescription}
                        </div>
                      </div>
                      Car Cost : ₹ {car.cost.toLocaleString("en-IN")}
                      <br />
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
