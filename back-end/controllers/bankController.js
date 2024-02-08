const bankModel = require("../model/bankModel");

async function addBank(data) {
  try {
    const receivedData = new bankModel(data);
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

async function getAllBanks() {
  try {
    const result = await bankModel.find({});
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

async function getBank(data) {
  try {
    const result = await bankModel.findOne({
      accountNumber: data.accountNumber,
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

async function deleteBank(data) {
  try {
    const result = await bankModel.deleteOne({
      accountNumber: data.accountNumber,
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

async function updateBank(data) {
  try {
    const result = await bankModel.findOneAndUpdate(
      { accountNumber: data.accountNumber },
      data.newData,
      { new: true }
    );
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

async function checkAccountExist(data) {
  try {
    const result = await bankModel.findOne({
      cardNumber: data.cardNumber,
      cvvNumber: data.cvvNumber,
      expiryDate: data.expiryDate,
    });
    if (result) {
      return {
        response: true,
        error: null,
        statusCode: 200,
      };
    } else {
      return {
        response: false,
        error: "Invalid Account Details",
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
  addBank,
  getAllBanks,
  getBank,
  deleteBank,
  updateBank,
  checkAccountExist,
};
