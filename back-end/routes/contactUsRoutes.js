const express = require("express");
const router = express.Router();
const CONTACTUS_CONTROLLER_PATH = "../controllers/contactUsController";

router.post("/addMessage", async (request, response) => {
  const receivedData = request.body;
  const { addMessage } = require(CONTACTUS_CONTROLLER_PATH);
  const result = await addMessage(receivedData);
  response.status(result.statusCode).json(result);
});

router.get("/getAllMessages", async (_, response) => {
  const { getAllMessages } = require(CONTACTUS_CONTROLLER_PATH);
  const result = await getAllMessages();
  response.status(result.statusCode).json(result);
});

router.delete("/deleteMessage/:id", async (request, response) => {
  const receivedData = { id: request.params.id };
  const { deleteMessage } = require(CONTACTUS_CONTROLLER_PATH);
  const result = await deleteMessage(receivedData);
  response.status(result.statusCode).json(result);
});

module.exports = router;
