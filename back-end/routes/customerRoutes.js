const express = require("express");
const router = express.Router();
const CUSTOMER_CONTROLLER_PATH = "../controllers/customerController";

router.post("/getCustomerId", async (request, response) => {
  const {
    getCustomerIdByEmailIdAndPassword,
  } = require(CUSTOMER_CONTROLLER_PATH);

  const data = {
    emailId: request.body.emailId,
    password: request.body.password,
  };

  const result = await getCustomerIdByEmailIdAndPassword(data);
  response.status(result.statusCode).json(result);
});

router.post("/addCustomer", async (request, response) => {
  const { addCustomer } = require(CUSTOMER_CONTROLLER_PATH);
  const receivedData = {
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    emailId: request.body.emailId,
    mobile: request.body.mobile,
    password: request.body.password,
    address: request.body.address,
    city: request.body.city,
    state: request.body.state,
    zipCode: request.body.zipCode,
  };
  const result = await addCustomer(receivedData);
  response.status(result.statusCode).json(result);
});

router.post("/customerLogin", async (request, response) => {
  const { customerLogin } = require(CUSTOMER_CONTROLLER_PATH);
  const receivedData = {
    emailId: request.body.emailId,
    password: request.body.password,
  };
  const result = await customerLogin(receivedData);
  response.status(result.statusCode).json(result);
});

router.get("/getAllCustomers", async (_, response) => {
  const { getAllCustomers } = require(CUSTOMER_CONTROLLER_PATH);
  const result = await getAllCustomers();
  response.status(result.statusCode).json(result);
});

router.get("/getCustomer/:id", async (request, response) => {
  const customerId = request.params.id;
  const { getCustomerDetails } = require(CUSTOMER_CONTROLLER_PATH);
  const result = await getCustomerDetails(customerId);
  response.status(result.statusCode).json(result);
});

router.delete("/deleteCustomer/:id", async (request, response) => {
  const customerId = request.params.id;
  const { deleteCustomerByCustomerId } = require(CUSTOMER_CONTROLLER_PATH);
  const result = await deleteCustomerByCustomerId(customerId);
  response.status(result.statusCode).json(result);
});

router.put("/updateCustomer/:id", async (request, response) => {
  const { updateCustomer } = require(CUSTOMER_CONTROLLER_PATH);
  const receivedData = {
    customerId: request.params.id,
    newData: request.body,
  };
  const result = await updateCustomer(receivedData);
  response.status(result.statusCode).json(result);
});

module.exports = router;
