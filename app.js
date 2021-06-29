/* import express from "express" */
const express = require('express')
let gloves = require("./data")
const cors = require("cors"); 

const app = express();

/* Middleware */
app.use(cors());

/* Routes */
app.get("/gloves", (req, res) => {
    // JSON = JavaScript Object Notation
    res.json(gloves);
  });

  /* Delete  */
app.delete("/gloves/:productId", (req, res) => {
    const { productId } = req.params;
    const foundProduct = gloves.find(glove => glove.id === +productId)
    if (foundProduct){
     gloves = gloves.filter(glove => glove.id !== +productId)
     res.status(204).end()
    }else {
     res.status(404).json({message: "Not Found"})
    }
})

/* Fine to add 9000 instead of 8000 */
  app.listen(8000, () => {
    console.log("The application is running on localhost:8000");
  });