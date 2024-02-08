const mongoose = require("mongoose");

const carSaleSchema = mongoose.Schema(
  {
    carId: {
      type: String,
      required: true,
    },
    customerId: {
      type: String,
      required: true,
    },
    cardNumber: {
      type: String,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    shippingAddress: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("carSale", carSaleSchema);
