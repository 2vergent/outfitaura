const express = require("express");
const router = express.Router();

const userRoutes = require("../routes/userRoutes");
const homepageRoutes = require("./homepageRoutes");
const menRoutes = require("./menRoutes");
const womenRoutes = require("./womenRoutes");
const cartRoutes = require("./cartRoutes");

router.use("/user", userRoutes);
router.use("/homepage", homepageRoutes);
router.use("/men", menRoutes);
router.use("/women", womenRoutes);
router.use("/cart", cartRoutes);

module.exports = router;
