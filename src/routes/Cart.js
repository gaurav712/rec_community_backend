const router = require("express").Router();
const db = require("../models");
const auth = require("../middleware/auth");

/* To get Cart for a user */
router.get("/", auth, async (req, res) => {
  try {
    const cart = await db.Cart.findOne({ user: req.user.id });
    res.json(cart);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
});

/* To add a product to cart */
router.post("/add", auth, async (req, res) => {
  /* Initialize the schema using the data from POST request */
  const newCart = new db.Cart(req.body);

  /* Validate data */
  if (!newCart.user || !newCart.products.length) {
    res.status(400).json("Fields can't be blank");
  } else {
    /* Check if there's already an instance */
    const cart = await db.Cart.findOne({ user: newCart.user });

    if (!cart) {
      /* Save the values to the DB */
      try {
        await newCart.save();
        msg = "Product added to cart!";
        res.json("Product added to cart!");
      } catch (err) {
        console.log(err);
        res.status(400).json(err);
      }
    } else {
      try {
        await db.Cart.updateOne(
          { _id: cart._id },
          {
            $push: {
              products: newCart.products[0],
            },
          }
        );
      } catch (err) {
        res.status(400).json(err);
      }
    }
  }
});

module.exports = router;
