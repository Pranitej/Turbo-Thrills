const express = require("express");
const router = express.Router();
const ADMIN_CONTROLLER_PATH = "../controllers/adminController.js";

router.post("/addAdmin", async (request, response) => {
  const { addAdmin } = require(ADMIN_CONTROLLER_PATH);
  const receivedData = {
    username: request.body.username,
    password: request.body.password,
  };
  const result = await addAdmin(receivedData);
  response.status(result.statusCode).json(result);
});

router.post("/adminLogin", async (request, response) => {
  const { adminLogin } = require(ADMIN_CONTROLLER_PATH);
  const receivedData = {
    username: request.body.username,
    password: request.body.password,
  };
  const result = await adminLogin(receivedData);
  response.status(result.statusCode).json(result);
});

module.exports = router;
