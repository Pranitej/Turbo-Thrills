import React, { useState } from "react";
//import "bootstrap/dist/css/bootstrap.min.css";
import carSellers from "../jsonData/carSellers.json";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function CarSellerBody() {
  const quizData = carSellers;
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);

  const handleOptionChange = (selectedOption) => {
    setUserAnswers({ ...userAnswers, [currentQuestion]: selectedOption });
  };

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    let userScore = 0;
    quizData.forEach((question, index) => {
      if (userAnswers[index] === question.ans) {
        userScore += 1;
      }
    });
    setScore(userScore);
  };

  return (
    <div className="container mt-5 mb-5 text-light">
      <div className="mb-3">
        <h5>{quizData[currentQuestion].q}</h5>
        <div className="form-check">
          <input
            type="radio"
            className="form-check-input"
            name="options"
            value="a"
            checked={userAnswers[currentQuestion] === "a"}
            onChange={() => handleOptionChange("a")}
          />
          <label className="form-check-label">
            {quizData[currentQuestion].a}
          </label>
        </div>
        <div className="form-check">
          <input
            type="radio"
            className="form-check-input"
            name="options"
            value="b"
            checked={userAnswers[currentQuestion] === "b"}
            onChange={() => handleOptionChange("b")}
          />
          <label className="form-check-label">
            {quizData[currentQuestion].b}
          </label>
        </div>
        <div className="form-check">
          <input
            type="radio"
            className="form-check-input"
            name="options"
            value="c"
            checked={userAnswers[currentQuestion] === "c"}
            onChange={() => handleOptionChange("c")}
          />
          <label className="form-check-label">
            {quizData[currentQuestion].c}
          </label>
        </div>
        <div className="form-check">
          <input
            type="radio"
            className="form-check-input"
            name="options"
            value="d"
            checked={userAnswers[currentQuestion] === "d"}
            onChange={() => handleOptionChange("d")}
          />
          <label className="form-check-label">
            {quizData[currentQuestion].d}
          </label>
        </div>
      </div>
      <div className="mb-3">
        {currentQuestion === 0 && (
          <button
            className="btn btn-danger mr-2 bg-danger"
            onClick={handleBack}
            disabled
          >
            Back
          </button>
        )}
        {currentQuestion > 0 && (
          <button
            className="btn btn-danger mr-2 bg-danger"
            onClick={handleBack}
          >
            Back
          </button>
        )}
        {currentQuestion < quizData.length - 1 ? (
          <button
            className="btn btn-primary"
            style={{ marginLeft: "20px" }}
            onClick={handleNext}
          >
            Next
          </button>
        ) : (
          <>
            <button
              className="btn btn-primary"
              onClick={handleSubmit}
              data-bs-toggle="modal"
              data-bs-target="#exampleModal5"
              style={{ marginLeft: "20px" }}
            >
              Submit
            </button>
            <div
              className="modal fade text-dark"
              id="exampleModal5"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-scrollable modal-lg">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">
                      Results
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <h4>
                      Your score:{"    "}
                      <span className="badge bg-primary">
                        {score + "  Marks"}
                      </span>
                    </h4>
                    <hr />
                    {score !== null && (
                      <div className="mt-3">
                        {quizData.map((question, index) => (
                          <div key={index} className="mb-3">
                            <h5>{question.q}</h5>
                            {userAnswers[index] !== question.ans ? (
                              <p className="mb-1" style={{ color: "red" }}>
                                Your Answer:{" "}
                                {question[userAnswers[index]] || "Not Answered"}
                                {"       "}
                                <span className="badge bg-danger">+ 0</span>
                              </p>
                            ) : (
                              <p className="mb-1" style={{ color: "green" }}>
                                Your Answer:{" "}
                                {question[userAnswers[index]] || "Not answered"}
                                {"       "}
                                <span className="badge bg-success">+ 1</span>
                              </p>
                            )}
                            <p>Correct Answer: {question[question.ans]}</p>
                            <hr />
                          </div>
                        ))}
                      </div>
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
                    <Link
                      className="btn btn-primary"
                      onClick={() => {
                        navigate("/customer/home");
                      }}
                      data-bs-dismiss="modal"
                    >
                      Goto Home
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
