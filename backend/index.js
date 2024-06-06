require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const appRoutes = require("./routes/index");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", appRoutes);

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("Connected to database");
});

app.listen("4000", () => {
  console.log("Backend listening to PORT 4000");
});

module.exports = app;
