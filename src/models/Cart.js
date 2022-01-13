const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    user: { type: String, required: true },
    products: { type: [String], required: true },
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
