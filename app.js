/* import express from "express" */
const express = require('express')
const cors = require("cors");
const gloveRoutes = require('./API/glove/routes')
const shopRoutes = require('./API/shop/routes')
const userRoutes = require('./API/user/routes')
const db = require("./db/models/index");
const app = express();

/* Middleware */
app.use(cors());
app.use(express.json());

/* Routes Path */
app.use("/gloves", gloveRoutes)
app.use("/shops", shopRoutes)
app.use(userRoutes)

app.use("/media", express.static("media"))

/* Handling Middleware */
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message || "Internal Server Error" })
})

app.use((req, res, next) => {
  res.status(404).json({ message: "Path Not Found" })
})

const run = async () => {
  try {
    await db.sequelize.sync({ alter: true });
    console.log("Connection to the database successful!");
    app.listen(8000, () => {
      console.log("The application is running on localhost:8000");
    });
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
};

run();