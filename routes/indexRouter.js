import { Router } from "express";
export const indexRouter = Router();
import query from "../db/query.js";
indexRouter.get("/", async (req, res) => {
  const categories = await query.getAllCategories();
  res.render("index", { categories: categories });
});
indexRouter.get("/new-category", (req, res) => res.render("newCategoryForm"));
indexRouter.post("/new-category", async (req, res) => {
  const { cat_name } = req.body;
  await query.addNewCategory(cat_name);
  res.redirect("/");
});
