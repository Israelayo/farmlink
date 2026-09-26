import express from "express";
const router = express.Router();
import products from "../data/products.js";

router.get("/", (req, res) => {
  res.json(products);
});

router.get("/:id", (req, res) => {
  const product = products.find(
    (product) => product.id === Number(req.params.id),
  );
  if (!product) {
    return res.status(404).send("Product not found");
  }
  res.json(product);
});

router.post("/", (req, res) => {
  const newProduct = req.body;
  newProduct.id = products.length + 1;
  products.push(newProduct);
  return res.status(201).json(newProduct);
});

export default router;
