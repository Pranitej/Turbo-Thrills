import React from "react";
import axios from "axios";
import { useState } from "react";

export default function ContactBody() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const addMessage = () => {
    axios
      .post("https://turbo-thrills.onrender.com/contactUs/addMessage", {
        name: name,
        emailId: email,
        message: message,
      })
      .then((response) => {
        if (response.data.response !== "error") {
          setEmail("");
          setName("");
          setMessage("");
          alert("Message Sent...");
        }
      });
  };

  const handleSubmit = () => {
    if (name === "") {
      alert("Please enter your name");
    } else if (email === "") {
      alert("Please enter your Email address");
    } else if (message === "") {
      alert("Please enter your message");
    } else {
      addMessage();
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="card">
        <h5 className="card-header">Contact Us</h5>
        <div className="card-body">
          <h5 className="card-title">Fill the below form</h5>
          <div className="form-floating mb-3 mt-4">
            <input
              type="text"
              className="form-control"
              id="floatingInput1"
              placeholder="Enter your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="floatingInput1">Name</label>
          </div>

          <div className="form-floating mb-3 mt-4">
            <input
              type="email"
              className="form-control"
              id="floatingInput2"
              placeholder="name@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="floatingInput2">Email address</label>
          </div>

          <div className="form-floating mb-4 mt-4">
            <textarea
              className="form-control"
              placeholder="Leave a message here"
              id="floatingTextarea2"
              style={{ height: "150px" }}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <label htmlFor="floatingTextarea2">Message</label>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="btn btn-primary"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
