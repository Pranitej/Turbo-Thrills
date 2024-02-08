const express = require("express");
const router = express.Router();
const FEEDBACK_CONTROLLER_PATH = "../controllers/feedbackController";

router.post("/addFeedback", async (request, response) => {
  const { addFeedback } = require(FEEDBACK_CONTROLLER_PATH);
  const receivedData = { body: request.body };
  const result = await addFeedback(receivedData);
  response.status(result.statusCode).json(result);
});

router.get("/getAllFeedbacks", async (_, response) => {
  const { getAllFeedbacks } = require(FEEDBACK_CONTROLLER_PATH);
  const result = await getAllFeedbacks();
  response.status(result.statusCode).json(result);
});

router.get("/getFeedback/:feedbackId", async (request, response) => {
  const receivedData = { feedbackId: request.params.feedbackId };
  const { getFeedback } = require(FEEDBACK_CONTROLLER_PATH);
  const result = await getFeedback(receivedData);
  response.status(result.statusCode).json(result);
});

router.delete("/deleteFeedback/:feedbackId", async (request, response) => {
  const { deleteFeedback } = require(FEEDBACK_CONTROLLER_PATH);
  const receivedData = { feedbackId: request.params.feedbackId };
  const result = await deleteFeedback(receivedData);
  response.status(result.statusCode).json(result);
});

router.put("/updateFeedback/:feedbackId", async (request, response) => {
  const { updateFeedback } = require(FEEDBACK_CONTROLLER_PATH);
  const receivedData = {
    feedbackId: request.params.feedbackId,
    newData: request.body,
  };
  const result = await updateFeedback(receivedData);
  response.status(result.statusCode).json(result);
});

router.get(
  "/getFeedbacksByCustomerId/:customerId",
  async (request, response) => {
    const { getFeedbacksByCustomerId } = require(FEEDBACK_CONTROLLER_PATH);
    const receivedData = { customerId: request.params.customerId };
    const result = await getFeedbacksByCustomerId(receivedData);
    response.status(result.statusCode).json(result);
  }
);

module.exports = router;
