const mongoose = require("mongoose");

const bankTransactionSchema = mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    fromCardNumber: {
      type: String,
      required: true,
    },
    toCardNumber: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("bankTransaction", bankTransactionSchema);
