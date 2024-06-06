const express = require("express");
const router = express.Router();

const userRoutes = require("../routes/userRoutes");
const homepageRoutes = require("./homepageRoutes");
const menRoutes = require("./menRoutes");
const womenRoutes = require("./womenRoutes");

router.use("/user", userRoutes);
router.use("/homepage", homepageRoutes);
router.use("/men", menRoutes);
router.use("/women", womenRoutes);

module.exports = router;
