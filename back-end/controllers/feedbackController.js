const feedbackModel = require("../model/feedbackModel");

async function addFeedback(data) {
  try {
    const receivedData = new feedbackModel({
      customerId: data.body.customerId,
      carId: data.body.carId,
      rating: data.body.rating,
      review: data.body.review,
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

async function getAllFeedbacks() {
  try {
    const result = await feedbackModel.find({});
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

async function getFeedback(data) {
  try {
    const result = await feedbackModel.findById(data.feedbackId);
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

async function deleteFeedback(data) {
  try {
    const result = await feedbackModel.deleteOne({ _id: data.feedbackId });
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

async function updateFeedback(data) {
  try {
    const result = await feedbackModel.findOneAndUpdate(
      { _id: data.feedbackId },
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

async function getFeedbacksByCustomerId(data) {
  try {
    const result = await feedbackModel.find({ customerId: data.customerId });
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
  addFeedback,
  getAllFeedbacks,
  getFeedback,
  deleteFeedback,
  updateFeedback,
  getFeedbacksByCustomerId,
};
