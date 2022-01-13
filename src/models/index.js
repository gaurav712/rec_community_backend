const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    keepAlive: true
  })
  .then(() => {
    console.log("connection established to DB");
  })
  .catch((error) => {
    console.log("connection failed", error);
  });

module.exports.Post = require("./Post");
module.exports.User = require("./User");
module.exports.Cart = require("./Cart");
