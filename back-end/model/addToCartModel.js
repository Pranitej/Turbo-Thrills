const mongoose = require("mongoose");

const addToCartSchema = mongoose.Schema(
  {
    carId: {
      type: String,
      required: true,
    },
    customerId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("addToCart", addToCartSchema);
