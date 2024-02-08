const carSaleModel = require("../model/carSaleModel");
const bankModel = require("../model/bankModel");
const bankTransactionModel = require("../model/bankTransactionModel");

const ADMIN_CARD_NUMBER = "999999";

async function addCarSale(data) {
  try {
    const result1 = await bankModel.findOne({
      cardNumber: data.cardNumber,
      expiryDate: data.expiryDate,
      cvvNumber: data.cvvNumber,
    });
    if (!result1) {
      return {
        response: "error",
        error: "Invalid Bank Account Details",
        statusCode: 400,
      };
    }

    const result0 = await bankModel.findOne({ cardNumber: ADMIN_CARD_NUMBER });
    if (!result0) {
      return {
        response: "error",
        error: "Invalid Bank Account Details",
        statusCode: 400,
      };
    }

    const customerBankBalance = result1.balance;
    const adminBankBalance = result0.balance;
    if (customerBankBalance < data.cost) {
      return {
        response: "error",
        error: "Insufficient Funds",
        statusCode: 400,
      };
    } else {
      const result2 = await bankModel.findOneAndUpdate(
        { cardNumber: data.cardNumber },
        { balance: customerBankBalance - data.cost },
        { new: true }
      );
      const result3 = await bankModel.findOneAndUpdate(
        { cardNumber: ADMIN_CARD_NUMBER },
        { balance: adminBankBalance + data.cost },
        { new: true }
      );
      if (!result2 || !result3) {
        return {
          response: "error",
          error: "Internal Server Error",
          statusCode: 500,
        };
      }
    }

    const bankTransaction = new bankTransactionModel({
      amount: data.cost,
      fromCardNumber: data.cardNumber,
      toCardNumber: ADMIN_CARD_NUMBER,
    });

    const result4 = await bankTransaction.save();
    if (!result4) {
      return {
        response: "error",
        error: "Internal Server Error",
        statusCode: 500,
      };
    }

    const receivedData = new carSaleModel(data);
    const result = await receivedData.save();
    if (result) {
      return {
        response: result,
        error: null,
        statusCode: 201,
      };
    } else {
      return {
        response: "error",
        error: "Internal Server Error",
        statusCode: 500,
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

async function getAllCarSales() {
  try {
    const result = await carSaleModel.find({});
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

async function getCarSale(data) {
  try {
    const result = await carSaleModel.findById(data.saleId);
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

async function deleteSaleCar(data) {
  try {
    const result = await carSaleModel.deleteOne({ _id: data.saleId });
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
  addCarSale,
  getAllCarSales,
  getCarSale,
  deleteSaleCar,
};
