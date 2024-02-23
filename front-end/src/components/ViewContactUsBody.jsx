import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ViewContactUsBody() {
  const [messages, setMessages] = useState();

  const fetchMessages = () => {
    axios
      .get(`https://turbo-thrills.onrender.com/contactUs/getAllMessages`)
      .then((response) => {
        setMessages(response.data.response);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const deleteMessage = (id) => {
    axios
      .delete(`https://turbo-thrills.onrender.com/contactUs/deleteMessage/${id}`)
      .then((response) => {
        if (response.data.response !== "error") fetchMessages();
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="container mt-5 mb-5">
      <h3 style={{ color: "white" }}>Messages...</h3>
      <table className="table table-hover table-bordered border-secondary mt-4">
        <thead>
          <tr>
            <th scope="col">Message ID</th>
            <th scope="col">Name</th>
            <th scope="col">Email Id</th>
            <th scope="col">Message</th>
            <th scope="col">Date</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        {messages && (
          <tbody>
            {messages.map((message, index) => (
              <tr key={index}>
                <th scope="row">{message._id}</th>
                <td>{message.name}</td>
                <td>{message.emailId}</td>
                <td>{message.message}</td>
                <td>
                  {new Date(message.updatedAt).toLocaleString("en-US", {
                    timeZone: "Asia/Kolkata",
                  })}
                </td>
                <td className=" text-center">
                  <button
                    className="btn btn-sm btn-danger"
                    data-bs-toggle="modal"
                    data-bs-target={`#exampleModal${message._id}`}
                  >
                    Delete
                  </button>
                  <div
                    className="modal fade"
                    id={`exampleModal${message._id}`}
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
                        <div className="modal-body text-start">
                          Do yo want to delete the message with the ID{" - "}
                          <span className="text-danger">{message._id}</span>
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
                              deleteMessage(message._id);
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
        )}
      </table>
    </div>
  );
}
