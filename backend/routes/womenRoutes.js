const express = require("express");
const router = express.Router();
const womenController = require("../controlllers/womenController");

router.get("/all", womenController.getAllWomenProducts);

module.exports = router;
