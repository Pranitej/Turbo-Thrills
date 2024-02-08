const express = require("express");
const router = express.Router();
const CAR_SALE_CONTROLLER_PATH = "../controllers/carSaleController";

router.post("/addCarSale/", async (request, response) => {
  const receivedData = { ...request.body };
  const { addCarSale } = require(CAR_SALE_CONTROLLER_PATH);
  const result = await addCarSale(receivedData);
  response.status(result.statusCode).json(result);
});

router.get("/getAllCarSales", async (_, response) => {
  const { getAllCarSales } = require(CAR_SALE_CONTROLLER_PATH);
  const result = await getAllCarSales();
  response.status(result.statusCode).json(result);
});

router.get("/getCarSale/:saleId", async (request, response) => {
  const receivedData = { saleId: request.params.saleId };
  const { getCarSale } = require(CAR_SALE_CONTROLLER_PATH);
  const result = await getCarSale(receivedData);
  response.status(result.statusCode).json(result);
});

router.delete("/deleteSaleCar/:saleId", async (request, response) => {
  const receivedData = { saleId: request.params.saleId };
  const { deleteSaleCar } = require(CAR_SALE_CONTROLLER_PATH);
  const result = await deleteSaleCar(receivedData);
  response.status(result.statusCode).json(result);
});

module.exports = router;
