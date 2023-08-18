const express = require("express");
const dotenv = require("dotenv");
const app = express();

app.use(express.json());
dotenv.config();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Express API Running at " + PORT);
});

const productController = require("./product/product.controller");

app.use("/products", productController);
