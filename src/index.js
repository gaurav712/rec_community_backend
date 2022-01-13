require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();

const port = process.env.PORT || 5000;

/* Use JSON */
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

/* Enable CORS while testing */
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

/* Routes */
app.use("/post", require("./routes/Post"));
app.use("/users", require("./routes/User"));
app.use("/cart", require("./routes/Cart"));

app.listen(port, "0.0.0.0", () => {
  console.log(`Example app listening at ${port}`);
});
