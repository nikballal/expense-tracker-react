const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  text: {
    type: String,
    trim: true, //i.e. trim - white spaces will be removed from both sides of the string
    required: [true, "Please add some text"],
  },

  amount: {
    type: Number,
    required: [true, "Please add a positive or a negative number"],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Transaction", TransactionSchema);
