const express = require("express");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");
const app = express();
const prisma = new PrismaClient();

app.use(express.json());
dotenv.config();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Express API Running at " + PORT);
});

app.get("/products", async (req, res) => {
  const products = await prisma.product.findMany();

  res.send(products);
});

app.get("/products/:id", async (req, res) => {
  const productId = req.params.id;

  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!product) {
    res.status(200).send("product not found");
  }

  res.send(product);
});

app.post("/product", async (req, res) => {
  const newProductData = req.body;

  const product = await prisma.product.create({
    data: {
      name: newProductData.name,
      price: newProductData.price,
      description: newProductData.description,
      image: newProductData.image,
    },
  });

  res.send({
    data: product,
    message: "successfully added product",
  });
});

app.delete("/products/:id", async (req, res) => {
  const productId = req.params.id;

  await prisma.product.delete({
    where: {
      id: productId,
    },
  });

  res.send("product deleted");
});

app.put("/products/:id", async (req, res) => {
  const productId = req.params.id;
  const productData = req.body;

  if (
    !(
      productData.name &&
      productData.price &&
      productData.description &&
      productData.image
    )
  ) {
    res.status(400).send("some fields are missing");
  }

  const product = await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      name: productData.name,
      price: productData.price,
      description: productData.description,
      image: productData.image,
    },
  });
  res.status(200).send({
    data: product,
    message: "edit product success",
  });
});

app.patch("/products/:id", async (req, res) => {
  const productId = req.params.id;
  const productData = req.body;

  const product = await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      name: productData.name,
      price: productData.price,
      description: productData.description,
      image: productData.image,
    },
  });

  res.status(200).send({
    data: product,
    message: "edit product success",
  });
});
