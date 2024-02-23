const carModel = require("../model/carModel");
const GET_IMAGE_URL = `https://turbo-thrills.onrender.com/`;

async function addCar(data) {
  try {
    const receivedData = new carModel({
      availability: data.body.availability,
      carDescription: data.body.carDescription,
      carImage: data.file.filename,
      carType: data.body.carType,
      companyName: data.body.companyName,
      modelName: data.body.modelName,
      modelYear: data.body.modelYear,
      cost: data.body.cost,
      customerId: data.body.customerId,
      fuelType: data.body.fuelType,
    });
    const result = await receivedData.save();
    return {
      response: result,
      error: null,
      statusCode: 201,
    };
  } catch (error) {
    console.error(error);
    return {
      response: "error",
      error: "Internal Server Error",
      statusCode: 500,
    };
  }
}

async function getAllCars() {
  try {
    const cars = await carModel.find({});
    return {
      response: cars,
      error: null,
      statusCode: 200,
    };
  } catch (error) {
    console.error(error);
    return {
      response: "error",
      error: "Internal Server Error",
      statusCode: 500,
    };
  }
}

async function getCarsByType(data) {
  try {
    const result = await carModel.find({ carType: data.carType });
    return {
      response: result,
      error: null,
      statusCode: 200,
    };
  } catch (error) {
    console.error(error);
    return {
      response: "error",
      error: "Internal Server Error",
      statusCode: 500,
    };
  }
}

async function getCarsByCustomerId(data) {
  try {
    const result = await carModel.find({ customerId: data.customerId });
    return {
      response: result,
      error: null,
      statusCode: 200,
    };
  } catch (error) {
    console.error(error);
    return {
      response: "error",
      error: "Internal Server Error",
      statusCode: 500,
    };
  }
}

async function getCar(data) {
  try {
    const result = await carModel.findById(data.carId);
    return {
      response: result,
      error: null,
      statusCode: 200,
    };
  } catch (error) {
    console.error(error);
    return {
      response: "error",
      error: "Internal Server Error",
      statusCode: 500,
    };
  }
}

async function deleteCar(data) {
  try {
    const result = await carModel.deleteOne({ _id: data.carId });
    return {
      response: result,
      error: null,
      statusCode: 201,
    };
  } catch (error) {
    console.error(error);
    return {
      response: "error",
      error: "Internal Server Error",
      statusCode: 500,
    };
  }
}

async function updateCar(data) {
  try {
    const result = await carModel.findOneAndUpdate(
      { _id: data.carId },
      data.newData,
      { new: true }
    );
    if (result) {
      return {
        response: result,
        error: null,
        statusCode: 201,
      };
    } else {
      return {
        response: "error",
        error: "Invalid CarID",
        statusCode: 400,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      response: "error",
      error: "Internal Server Error",
      statusCode: 500,
    };
  }
}

module.exports = {
  addCar,
  getAllCars,
  getCarsByType,
  getCarsByCustomerId,
  getCar,
  deleteCar,
  updateCar,
};
