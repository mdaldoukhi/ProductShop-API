/* import express from "express" */
const express = require('express')
const cors = require("cors");
const gloveRoutes = require('./API/glove/routes')
const db = require("./db/models/index");
const app = express();

/* Middleware */
app.use(cors());

/* */
app.use(express.json());

app.use("/gloves", gloveRoutes)

/* Fine to add 9000 instead of 8000 */
app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});

const run = async () => {
  try {
    await db.sequelize.authenticate();
    console.log("Connection to the database successful!");
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
};

run();