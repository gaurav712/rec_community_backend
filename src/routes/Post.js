const router = require("express").Router();
const db = require("../models");
const auth = require("../middleware/auth");
const filterList = require("../utils/Filter");

/* Return a list of n Posts*/
router.get("/:num", async (req, res) => {
  try {
    let numberOfItems = parseInt(req.params.num, 10);
    if (!isNaN(numberOfItems) && numberOfItems <= 100) {
      /* Maximum limit is 100 */
      let Post = await db.Post.find().limit(numberOfItems);
      // .select({ title: 1, content: 1, favourite: 1 });
      res.json(Post);
    } else {
      throw new Error("Invalid limit specifed!");
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

/* To get details of a Post */
// router.get("/details/:PostId", async (req, res) => {
//   try {
//     db.Post.findById(req.params.PostId, (err, data) => {
//       if (err) {
//         res.status(400).json(err);
//       } else {
//         res.json(data);
//       }
//     });
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

/* To add a Post */
router.post("/add", async (req, res) => {
  const { content } = req.body;
  for (let word in filterList) {
    if (content.toString().includes(filterList[word])) {
      res.status(400).json("The post contains offensive content!");
      return -1;
    }
  }

  /* Initialize the schema using the data from POST request */
  const newPost = new db.Post(req.body);

  /* Save the values to the DB */
  try {
    await newPost.save();
    res.json("Post Added!");
  } catch (err) {
    res.status(400).json(err);
  }
});

/* To search for Posts */
router.get("/search/:query", async (req, res) => {
  try {
    db.Post.find(
      { title: { $regex: req.params.query, $options: "ims" } },
      "title",
      (err, data) => {
        if (err) {
          res.status(400).json(err);
        } else {
          res.json(data);
          console.log(data);
        }
      }
    );
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
