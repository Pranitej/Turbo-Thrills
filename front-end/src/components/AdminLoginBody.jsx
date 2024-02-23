import React, { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { data } from "../App";

export default function AdminLoginBody() {
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let admin = useContext(data);

  let navigate = useNavigate();

  const loginValidation = async () => {
    await fetch("http://localhost:5000/admin/adminLogin", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.response) {
          admin.setAdminLoginStatus(true);
          navigate("/adminpage");
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
              type="text"
              className="form-control"
              id="floatingInput"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              placeholder="Username"
            />
            <label htmlFor="floatingInput">Username</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Password"
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
