const express = require("express");
const router = express.Router();
const BANK_TRANSACTION_CONTROLLER_PATH =
  "../controllers/bankTransactionController";

router.get("/getAllBankTransactions", async (_, response) => {
  const { getAllBankTransactions } = require(BANK_TRANSACTION_CONTROLLER_PATH);
  const result = await getAllBankTransactions();
  response.status(result.statusCode).json(result);
});

router.get("/getBankTransaction/:transactionId", async (request, response) => {
  const receivedData = { transactionId: request.params.transactionId };
  const { getBankTransaction } = require(BANK_TRANSACTION_CONTROLLER_PATH);
  const result = await getBankTransaction(receivedData);
  response.status(result.statusCode).json(result);
});

router.delete(
  "/deleteBankTransaction/:transactionId",
  async (request, response) => {
    const receivedData = { transactionId: request.params.transactionId };
    const { deleteBankTransaction } = require(BANK_TRANSACTION_CONTROLLER_PATH);
    const result = await deleteBankTransaction(receivedData);
    response.status(result.statusCode).json(result);
  }
);

module.exports = router;
