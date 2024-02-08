const mongoose = require("mongoose");

const carSchema = mongoose.Schema(
  {
    availability: {
      type: Boolean,
      required: true,
    },
    carDescription: {
      type: String,
      required: true,
    },
    carImage: {
      type: String,
      required: true,
    },
    carType: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    modelName: {
      type: String,
      required: true,
    },
    modelYear: {
      type: String,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    customerId: {
      type: String,
      required: true,
    },
    fuelType: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("car", carSchema);
