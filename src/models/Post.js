const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    content: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

const Post = mongoose.model("Post", productSchema);

module.exports = Post;
