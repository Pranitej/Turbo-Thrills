import React, { useState } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { data } from "../App";

export default function LoginBody() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let navigate = useNavigate();
  let customer = useContext(data);

  let GetCustomerId = () => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/customer/getCustomerId`,
          {
            method: "POST",
            body: JSON.stringify({
              emailId: email,
              password: password,
            }),
            headers: {
              "content-type": "application/json; charset=UTF-8",
            },
          }
        );
        if (response) {
          const result = await response.json();
          customer.setCustomerId(result.response._id);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  };

  const loginValidation = async () => {
    await fetch("http://localhost:5000/customer/customerLogin", {
      method: "POST",
      body: JSON.stringify({
        emailId: email,
        password: password,
      }),
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.response) {
          customer.setCustomerLoginStatus(true);
          GetCustomerId();
          navigate("/customermain");
        } else {
          alert("Login failed");
        }
      })
      .catch((err) => {
        console.error("Error : " + err.message);
      });
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    loginValidation();
  };

  return (
    <div>
      <div className="container mt-5 mb-5 mx-auto">
        <div className="container d-flex align-items-center">
          <img
            className="mx-auto"
            src="https://cdn-icons-png.flaticon.com/512/5087/5087579.png"
            alt="Network Error..."
            style={{ width: "12rem" }}
          />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              // value={"vangalapranitej@gmail.com"}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Email Address"
            />
            <label htmlFor="floatingInput">Email</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              // value={'12345'}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Password"
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <p>
            <Link
              className="link-offset-2 link-underline text-primary link-underline-opacity-0"
              to="/signup"
            >
              Don't have account? Signup
            </Link>
          </p>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
