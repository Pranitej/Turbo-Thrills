const express = require("express");
const router = express.Router();
const BANK_CONTROLLER_PATH = "../controllers/bankController.js";

router.post("/addBank", async (request, response) => {
  const receivedData = request.body;
  const { addBank } = require(BANK_CONTROLLER_PATH);
  const result = await addBank(receivedData);
  response.status(result.statusCode).json(result);
});

router.get("/getAllBanks", async (_, response) => {
  const { getAllBanks } = require(BANK_CONTROLLER_PATH);
  const result = await getAllBanks();
  response.status(result.statusCode).json(result);
});

router.get("/getBank/:accountNumber", async (request, response) => {
  const receivedData = { accountNumber: request.params.accountNumber };
  const { getBank } = require(BANK_CONTROLLER_PATH);
  const result = await getBank(receivedData);
  response.status(result.statusCode).json(result);
});

router.delete("/deleteBank/:accountNumber", async (request, response) => {
  const receivedData = { accountNumber: request.params.accountNumber };
  const { deleteBank } = require(BANK_CONTROLLER_PATH);
  const result = await deleteBank(receivedData);
  response.status(result.statusCode).json(result);
});

router.put("/updateBank/:accountNumber", async (request, response) => {
  const receivedData = {
    accountNumber: request.params.accountNumber,
    newData: request.body,
  };
  const { updateBank } = require(BANK_CONTROLLER_PATH);
  const result = await updateBank(receivedData);
  response.status(result.statusCode).json(result);
});

router.get(
  "/checkAccountExist/:cardNumber/:cvvNumber/:expiryDate",
  async (request, response) => {
    const receivedData = {
      cardNumber: request.params.cardNumber,
      cvvNumber: request.params.cvvNumber,
      expiryDate: request.params.expiryDate,
    };
    const { checkAccountExist } = require(BANK_CONTROLLER_PATH);
    const result = await checkAccountExist(receivedData);
    response.status(result.statusCode).json(result);
  }
);

module.exports = router;
