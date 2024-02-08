const bankTransactionModel = require("../model/bankTransactionModel");

async function getAllBankTransactions() {
  try {
    const result = await bankTransactionModel.find({});
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

async function getBankTransaction(data) {
  try {
    const result = await bankTransactionModel.findOne({
      _id: data.transactionId,
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

async function deleteBankTransaction(data) {
  try {
    const result = await bankTransactionModel.deleteOne({
      _id: data.transactionId,
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
  getAllBankTransactions,
  getBankTransaction,
  deleteBankTransaction,
};
