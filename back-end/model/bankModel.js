const mongoose = require("mongoose");

const bankSchema = mongoose.Schema(
  {
    accountNumber: {
      type: String,
      required: true,
      unique: true,
    },
    balance: {
      type: Number,
      required: true,
    },
    cardNumber: {
      type: String,
      required: true,
      unique: true,
    },
    cardType: {
      type: String,
      required: true,
    },
    contactAddress: {
      type: String,
      required: true,
    },
    cvvNumber: {
      type: Number,
      required: true,
    },
    expiryDate: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    zipCode: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("bank", bankSchema);
