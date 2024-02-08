const express = require("express");
const router = express.Router();
const ADDTOCART_CONTROLLER_PATH = "../controllers/addToCartController.js";

router.post("/addToCart", async (request, response) => {
  const receivedData = {
    customerId: request.body.customerId,
    carId: request.body.carId,
  };
  const { addToCart } = require(ADDTOCART_CONTROLLER_PATH);
  const result = await addToCart(receivedData);
  response.status(result.statusCode).json(result);
});

router.get("/getAllCarts", async (_, response) => {
  const { getAllCarts } = require(ADDTOCART_CONTROLLER_PATH);
  const result = await getAllCarts();
  response.status(result.statusCode).json(result);
});

router.get("/getCart/:cartId", async (request, response) => {
  const receivedData = { cartId: request.params.cartId };
  const { getCart } = require(ADDTOCART_CONTROLLER_PATH);
  const result = await getCart(receivedData);
  response.status(result.statusCode).json(result);
});

router.get("/getCustomerCarts/:customerId", async (request, response) => {
  const receivedData = { customerId: request.params.customerId };
  const { getCustomerCarts } = require(ADDTOCART_CONTROLLER_PATH);
  const result = await getCustomerCarts(receivedData);
  response.status(result.statusCode).json(result);
});

router.delete("/deleteCart/:cartId", async (request, response) => {
  const receivedData = { cartId: request.params.cartId };
  const { deleteCart } = require(ADDTOCART_CONTROLLER_PATH);
  const result = await deleteCart(receivedData);
  response.status(result.statusCode).json(result);
});

router.delete(
  "/deleteCartByCustomerIdAndCarId/:customerId/:carId",
  async (request, response) => {
    const receivedData = {
      customerId: request.params.customerId,
      carId: request.params.carId,
    };
    const {
      deleteCartByCustomerIdAndCarId,
    } = require(ADDTOCART_CONTROLLER_PATH);
    const result = await deleteCartByCustomerIdAndCarId(receivedData);
    response.status(result.statusCode).json(result);
  }
);

module.exports = router;
