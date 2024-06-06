require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express().json());

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("Connected to database");
});

app.listen("4000", () => {
  console.log("Backend listening to PORT 4000");
});
