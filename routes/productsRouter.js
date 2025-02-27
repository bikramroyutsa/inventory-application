import { Router } from "express";
import query from "../db/query.js";
import { upload } from "../tools/upload.js";
import {
  newProductController,
  editProductController,
} from "../controllers/productController.js";
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
productRouters.post("/:id/delete", async (req, res) => {
  const id = req.params.id;
  await query.deleteProduct(id);
  res.redirect("/products");
});
productRouters.get("/:id/edit", async (req, res) => {
  const product = await query.getProductByID(req.params.id);
  const categories = await query.getAllCategories();
  res.render("editProduct", { product: product[0], categories: categories });
});
productRouters.post("/:id/edit", upload.single("image"), editProductController);
