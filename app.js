/* import express from "express" */
const express = require('express')
const gloves = require("./data")
const cors = require("cors"); 

const app = express();

/* Middleware */
app.use(cors());

/* Routes */
app.get("/gloves", (req, res) => {
    // JSON = JavaScript Object Notation
    res.json(gloves);
  });

/* Fine to add 9000 instead of 8000 */
  app.listen(8000, () => {
    console.log("The application is running on localhost:8000");
  });