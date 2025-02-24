import { Router } from "express";
import query from "../db/query.js";
import { upload } from "../tools/upload.js";
import { newProductController } from "../controllers/newProductController.js";
export const productRouters = Router();
productRouters.get("/", async (req, res) => {
  const products = await query.getAllProducts();
  res.render("products", { products: products });
});
productRouters.get("/new-product", async (req, res) => {
  const categories = await query.getAllCategories();
  res.render("newProductForm", { categories: categories });
});

productRouters.post(
  "/new-product",
  upload.single("image"),
  newProductController
);
