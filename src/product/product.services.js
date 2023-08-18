// for business logic handling,  reusable functions, and isolated responsibility
const prisma = require("../db");
const {
  findProducts,
  findProductById,
  insertProduct,
  deleteProduct,
  updateProduct,
} = require("./product.repository");

const getAllProducts = async () => {
  products = await findProducts();
  return products;
};

const getProductById = async (id) => {
  product = await findProductById(id);

  if (!product) {
    throw Error("product not found");
  }

  return product;
};

const createProduct = async (newProductData) => {
  const product = await insertProduct(newProductData);
  return product;
};

const deleteProductById = async (id) => {
  await getProductById(id);

  await deleteProduct(id);
};

const editProductById = async (id, productData) => {
  await getProductById(id);

  const product = await updateProduct(id, productData);
  return product;
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProductById,
  editProductById,
};
