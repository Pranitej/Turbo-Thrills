const contactUsModel = require("../model/contactUsModel");

async function addMessage(data) {
  try {
    const receivedData = new contactUsModel(data);
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

async function getAllMessages() {
  try {
    const result = await contactUsModel.find({});
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

async function deleteMessage(data) {
  try {
    const result = await contactUsModel.deleteOne({ _id: data.id });
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
  addMessage,
  getAllMessages,
  deleteMessage,
};
