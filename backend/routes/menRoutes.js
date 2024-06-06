const express = require("express");
const router = express.Router();
const menController = require("../controlllers/menController");

router.get("/all", menController.getAllMenProducts);

module.exports = router;
