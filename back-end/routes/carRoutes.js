const express = require("express");
const router = express.Router();
const multer = require("multer");
const CAR_CONTROLLER_PATH = "../controllers/carController.js";

const storage = multer.diskStorage({
  destination: function (request, fileName, callBack) {
    return callBack(null, "./carImages");
  },
  filename: function (request, fileName, callBack) {
    return callBack(
      null,
      `${Date.now()}_${fileName.originalname.replaceAll(" ", "")}`
    );
  },
});

const upload = multer({ storage });

router.post("/addCar", upload.single("carImage"), async (request, response) => {
  try {
    const { addCar } = require(CAR_CONTROLLER_PATH);
    const receivedData = {
      body: request.body,
      file: request.file,
    };
    const result = await addCar(receivedData);
    response.status(result.statusCode).json(result);
  } catch (error) {
    console.error(error);
    if (error instanceof multer.MulterError) {
      const result = {
        response: "error",
        error: "Multer error",
        statusCode: 400,
      };
      response.status(result.statusCode).json(result);
    } else {
      console.error("Error:", error);
      const result = {
        response: "error",
        error: "Internal Server Error",
        statusCode: 500,
      };
      response.status(result.statusCode).json(result);
    }
  }
});

router.get("/getAllCars", async (_, response) => {
  const { getAllCars } = require(CAR_CONTROLLER_PATH);
  const result = await getAllCars();
  response.status(result.statusCode).json(result);
});

router.get("/getCarsByType/:carType", async (request, response) => {
  const receivedData = { carType: request.params.carType };
  const { getCarsByType } = require(CAR_CONTROLLER_PATH);
  const result = await getCarsByType(receivedData);
  response.status(result.statusCode).json(result);
});

router.get("/getCarsByCustomerId/:customerId", async (request, response) => {
  const { getCarsByCustomerId } = require(CAR_CONTROLLER_PATH);
  const receivedData = { customerId: request.params.customerId };
  const result = await getCarsByCustomerId(receivedData);
  response.status(result.statusCode).json(result);
});

router.get("/getCar/:carId", async (request, response) => {
  const { getCar } = require(CAR_CONTROLLER_PATH);
  const receivedData = { carId: request.params.carId };
  const result = await getCar(receivedData);
  response.status(result.statusCode).json(result);
});

router.delete("/deleteCar/:carId", async (request, response) => {
  const receivedData = { carId: request.params.carId };
  const { deleteCar } = require(CAR_CONTROLLER_PATH);
  const result = await deleteCar(receivedData);
  response.status(result.statusCode).json(result);
});

router.put("/updateCar/:carId", async (request, response) => {
  const receivedData = {
    carId: request.params.carId,
    newData: request.body,
  };
  const { updateCar } = require(CAR_CONTROLLER_PATH);
  const result = await updateCar(receivedData);
  response.status(result.statusCode).json(result);
});

module.exports = router;
