const addToCartModel = require("../model/addToCartModel");
const carModel = require("../model/carModel");

async function addToCart(data) {
  try {
    const receivedData = new addToCartModel({
      customerId: data.customerId,
      carId: data.carId,
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

async function getAllCarts() {
  try {
    const result = await addToCartModel.find({});
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

async function getCart(data) {
  try {
    const result = await addToCartModel.findOne({ _id: data.cartId });
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

async function getCustomerCarts(data) {
  try {
    let cars = [];
    const result1 = await addToCartModel.find({ customerId: data.customerId });

    if (!result1 || result1.length === 0) {
      return {
        response: [],
        error: "No carts found for the customer",
        statusCode: 404,
      };
    }

    await Promise.all(
      result1.map(async (cart) => {
        const car = await carModel.findOne({ _id: cart.carId });
        cars.push(car);
      })
    );

    let result = [];

    async function duplicateNotExist(carId) {
      for (let j = 0; j < result.length; j++) {
        if (result[j].carId.toString() === carId.toString()) {
          return false;
        }
      }
      return true;
    }

    for (let i = 0; i < result1.length; i++) {
      if (cars[i]) {
        let temp = {
          carId: cars[i]._id,
          companyName: cars[i].companyName,
          modelName: cars[i].modelName,
          modelYear: cars[i].modelYear,
          carDescription: cars[i].carDescription,
          cost: cars[i].cost,
          fuelType: cars[i].fuelType,
          availability: cars[i].availability,
          carImage: cars[i].carImage,
          cartId: result1[i]._id,
          customerId: result1[i].customerId,
          cartUpdatedAt: result1[i].updatedAt,
          carUpdatedAt: cars[i].updatedAt,
        };
        if (await duplicateNotExist(temp.carId)) {
          result.push(temp);
        }
      }
    }

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

async function deleteCart(data) {
  try {
    const result = await addToCartModel.deleteOne({ _id: data.cartId });
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

async function deleteCartByCustomerIdAndCarId(data) {
  try {
    const result = await addToCartModel.deleteMany({
      customerId: data.customerId,
      carId: data.carId,
    });
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

module.exports = {
  addToCart,
  getAllCarts,
  getCart,
  getCustomerCarts,
  deleteCart,
  deleteCartByCustomerIdAndCarId,
};
