const router = require("express").Router();

const commentRoute = require("./commentRoutes");
const postRoute = require("./postRoutes");
const userRoute = require("./userRoutes");

router.use("/comments", commentRoute);
router.use("/user", userRoute);
router.use("./posts", postRoute);

module.exports = router;
