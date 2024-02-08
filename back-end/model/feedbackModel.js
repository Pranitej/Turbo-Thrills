const mongoose = require("mongoose");

const feedbackSchema = mongoose.Schema(
  {
    carId: {
      type: String,
      required: true,
    },
    customerId: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("feedback", feedbackSchema);
