// for handling request, response, and validating body response.
const express = require("express");
const {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProductById,
  editProductById,
} = require("./product.services");
const router = express.Router();

router.get("/", async (req, res) => {
  const products = await getAllProducts();
  res.send(products);
});

router.get("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await getProductById(productId);

    res.send(product);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const newProductData = req.body;
    const product = await createProduct(newProductData);

    res.send({
      data: product,
      message: "successfully added product",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const productId = req.params.id;

    await deleteProductById(productId);

    res.send("product deleted");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
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

    const product = await editProductById(productId, productData);

    res.status(200).send({
      data: product,
      message: "edit product success",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const productData = req.body;

    const product = await editProductById(productId, productData);

    res.status(200).send({
      data: product,
      message: "edit product success",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
